package dashboard.shibboleth;

import com.google.common.base.Splitter;
import com.google.common.collect.ImmutableMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;
import org.springframework.util.StringUtils;
import dashboard.domain.CoinAuthority;
import dashboard.domain.CoinUser;
import dashboard.domain.IdentityProvider;
import dashboard.manage.Manage;
import dashboard.sab.Sab;
import dashboard.sab.SabRoleHolder;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkState;
import static java.util.Collections.singletonList;
import static java.util.stream.Collectors.toMap;
import static org.springframework.util.CollectionUtils.isEmpty;
import static org.springframework.util.StringUtils.hasText;
import static dashboard.domain.CoinAuthority.Authority.ROLE_DASHBOARD_ADMIN;
import static dashboard.domain.CoinAuthority.Authority.ROLE_DASHBOARD_SUPER_USER;
import static dashboard.domain.CoinAuthority.Authority.ROLE_DASHBOARD_VIEWER;
import static dashboard.shibboleth.ShibbolethHeader.*;

public class ShibbolethPreAuthenticatedProcessingFilter extends AbstractPreAuthenticatedProcessingFilter {

    public static final Map<String, ShibbolethHeader> shibHeaders;
    private static final Splitter shibHeaderValueSplitter = Splitter.on(';').omitEmptyStrings();
    private final static Logger LOG = LoggerFactory.getLogger(ShibbolethPreAuthenticatedProcessingFilter.class);

    static {
        shibHeaders = ImmutableMap.<String, ShibbolethHeader>builder()
                .put("urn:mace:dir:attribute-def:uid", Shib_Uid)
                .put("urn:mace:dir:attribute-def:sn", Shib_SurName)
                .put("urn:mace:dir:attribute-def:givenName", Shib_GivenName)
                .put("urn:mace:dir:attribute-def:cn", Shib_CommonName)
                .put("urn:mace:dir:attribute-def:displayName", Shib_DisplayName)
                .put("urn:mace:dir:attribute-def:mail", Shib_Email)
                .put("urn:mace:dir:attribute-def:eduPersonAffiliation", Shib_EduPersonAffiliation)
                .put("urn:mace:dir:attribute-def:eduPersonScopedAffiliation", Shib_EduPersonScopedAffiliation)
                .put("urn:mace:dir:attribute-def:eduPersonEntitlement", Shib_EduPersonEntitlement)
                .put("urn:mace:dir:attribute-def:isMemberOf", Shib_MemberOf)
                .put("urn:mace:dir:attribute-def:eduPersonPrincipalName", Shib_EduPersonPN)
                .put("urn:mace:dir:attribute-def:preferredLanguage", Shib_PreferredLanguage)
                .put("urn:mace:terena.org:attribute-def:schacHomeOrganization", Shib_HomeOrg)
                .put("urn:mace:terena.org:attribute-def:schacHomeOrganizationType", Shib_SchacHomeOrganizationType)
                .put("urn:mace:surffederatie.nl:attribute-def:nlEduPersonHomeOrganization",
                        Shib_NlEduPersonHomeOrganization)
                .put("urn:mace:surffederatie.nl:attribute-def:nlEduPersonStudyBranch", Shib_NlEduPersonStudyBranch)
                .put("urn:mace:surffederatie.nl:attribute-def:nlStudielinkNummer", Shib_NlStudielinkNummer)
                .put("urn:mace:surffederatie.nl:attribute-def:nlDigitalAuthorIdentifier", Shib_NlDigitalAuthorIdentifier)
                .put("urn:mace:surffederatie_nl:attribute-def:nlEduPersonOrgUnit", Shib_NlEduPersonOrgUnit)
                .put("urn:schac:attribute-def:schacPersonalUniqueCode", Shib_SchacPersonalUniqueCode)
                .put("urn:oid:1.3.6.1.4.1.1076.20.100.10.10.1", Shib_UserStatus)
                .put("urn:oid:1.3.6.1.4.1.5923.1.1.1.1", Shib_Accountstatus)
                .put("urn:oid:1.3.6.1.4.1.1076.20.100.10.10.2", Shib_VoName)
                .build();
    }

    private String organization;

    private Manage manage;
    private Sab sab;
    private String dashboardAdmin;
    private String dashboardViewer;
    private String dashboardSuperUser;
    private String adminSurfConextIdpRole;
    private String viewerSurfConextIdpRole;
    private boolean isManageConsentEnabled;
    private String hideTabs;
    private String supportedLanguages;

    ShibbolethPreAuthenticatedProcessingFilter() {
    }

    public ShibbolethPreAuthenticatedProcessingFilter(AuthenticationManager authenticationManager,
                                                      Manage manage,
                                                      Sab sab,
                                                      String dashboardAdmin,
                                                      String dashboardViewer,
                                                      String dashboardSuperUser,
                                                      String adminSufConextIdpRole,
                                                      String viewerSurfConextIdpRole,
                                                      boolean isManageConsentEnabled,
                                                      String hideTabs,
                                                      String supportedLanguages,
                                                      String organization) {
        setAuthenticationManager(authenticationManager);
        this.manage = manage;
        this.sab = sab;
        this.dashboardAdmin = dashboardAdmin;
        this.dashboardSuperUser = dashboardSuperUser;
        this.dashboardViewer = dashboardViewer;
        this.adminSurfConextIdpRole = adminSufConextIdpRole;
        this.viewerSurfConextIdpRole = viewerSurfConextIdpRole;
        this.isManageConsentEnabled = isManageConsentEnabled;
        this.hideTabs = hideTabs;
        this.supportedLanguages = supportedLanguages;
        this.organization = organization;
    }

    @Override
    protected Object getPreAuthenticatedPrincipal(final HttpServletRequest request) {
        Enumeration<String> headerNames = request.getHeaderNames();
        if (headerNames != null && LOG.isDebugEnabled()) {
            ArrayList<String> list = Collections.list(headerNames);
            LOG.debug("Received headers {}", list.stream().collect(toMap(
                    name -> name,
                    name -> {
                        Enumeration<String> headers = request.getHeaders(name);
                        return headers != null ? Collections.list(headers) : Collections.emptyList();
                    })));
        }

        String uid = getFirstShibHeaderValue(Name_Id, request)
                .orElseThrow(() -> new IllegalArgumentException(String.format("Missing %s Shibboleth header (%s)",
                        Name_Id.getValue(), request.getRequestURL())));

        String idpId = getFirstShibHeaderValue(Shib_Authenticating_Authority, request)
                .orElseThrow(() -> new IllegalArgumentException(String.format("Missing %s Shibboleth header (%s)",
                        Shib_Authenticating_Authority.getValue(), request.getRequestURL())));


        CoinUser coinUser = new CoinUser();
        coinUser.setUid(uid);
        coinUser.setDisplayName(getFirstShibHeaderValue(Shib_DisplayName, request).orElse(null));
        coinUser.setEmail(getFirstShibHeaderValue(Shib_Email, request).orElse(null));
        coinUser.setSchacHomeOrganization(getFirstShibHeaderValue(Shib_HomeOrg, request).orElse(null));
        coinUser.setManageConsentEnabled(this.isManageConsentEnabled);
        coinUser.setHideTabs(this.hideTabs);
        coinUser.setSupportedLanguages(this.supportedLanguages);
        coinUser.setOrganization(this.organization);

        Map<ShibbolethHeader, List<String>> attributes = shibHeaders.values().stream()
                .filter(h -> StringUtils.hasText(request.getHeader(h.getValue())))
                .collect(toMap(h -> h, h -> getShibHeaderValues(h, request)));
        coinUser.setAttributeMap(attributes);

        List<String> groups = getShibHeaderValues(Shib_MemberOf, request);
        this.addDashboardRoleForMemberships(coinUser, groups);

        List<IdentityProvider> institutionIdentityProviders = getInstitutionIdentityProviders(idpId);

        checkState(!isEmpty(institutionIdentityProviders), "no InstitutionIdentityProviders found for '" + idpId + "'");

        if (institutionIdentityProviders.size() == 1) {
            IdentityProvider idp = institutionIdentityProviders.get(0);
            coinUser.setIdp(idp);
            coinUser.addInstitutionIdp(idp);
        } else {
            coinUser.setIdp(getCurrentIdp(idpId, institutionIdentityProviders));
            coinUser.getInstitutionIdps().addAll(institutionIdentityProviders);
            Collections.sort(coinUser.getInstitutionIdps(), (lh, rh) -> lh.getName().compareTo(rh.getName()));
        }

        Optional<SabRoleHolder> roles = sab.getRoles(uid);
        LOG.debug("SAB: received roles {} and organization {}",
                roles.isPresent() ? roles.get().getRoles() : "None",
                roles.isPresent() ? roles.get().getOrganisation() : "None");


        List<String> institutionIds = institutionIdentityProviders.stream()
                .filter(provider -> StringUtils.hasText(provider.getInstitutionId()))
                .map(provider -> provider.getInstitutionId().toUpperCase()).collect(Collectors.toList());

        LOG.debug("Manage: received institution ID's {} ", institutionIds);

        this.addDashboardRoleForEntitlements(coinUser, roles,
                institutionIds);

        institutionIdentityProviders.stream()
                .filter(idp -> hasText(idp.getInstitutionId()))
                .findFirst()
                .ifPresent(idp -> coinUser.setInstitutionId(idp.getInstitutionId()));

        return coinUser;
    }

    private void addDashboardRoleForMemberships(CoinUser user, List<String> groups) {
        if (groups.contains(dashboardSuperUser)) {
            user.addAuthority(new CoinAuthority(ROLE_DASHBOARD_SUPER_USER));
        } else if (groups.contains(dashboardAdmin)) {
            user.addAuthority(new CoinAuthority(ROLE_DASHBOARD_ADMIN));
        } else if (groups.contains(dashboardViewer)) {
            user.addAuthority(new CoinAuthority(ROLE_DASHBOARD_VIEWER));
        }
    }

    private void addDashboardRoleForEntitlements(CoinUser user, Optional<SabRoleHolder> roles, List<String> institutionIds) {
        roles.ifPresent(sabRoleHolder -> {
            List<String> entitlements = sabRoleHolder.getRoles();
            String organisation = StringUtils.hasText(sabRoleHolder.getOrganisation()) ? sabRoleHolder.getOrganisation().toUpperCase() : null;
            boolean institutionIdMatch = StringUtils.hasText(sabRoleHolder.getOrganisation()) &&
                    institutionIds.contains(organisation);
            if (institutionIdMatch) {
                if (entitlements.stream().anyMatch(entitlement -> entitlement.indexOf(adminSurfConextIdpRole) > -1)) {
                    user.addAuthority(new CoinAuthority(ROLE_DASHBOARD_ADMIN));
                } else if (entitlements.stream().anyMatch(entitlement -> entitlement.indexOf(viewerSurfConextIdpRole) > -1)) {
                    user.addAuthority(new CoinAuthority(ROLE_DASHBOARD_VIEWER));
                }
            } else {
                LOG.info("SAB: received entitlements, but the institutionIds from Manage {} do not match the organization name from SAB {}",
                        institutionIds, organisation);
            }
        });
    }

    private List<IdentityProvider> getInstitutionIdentityProviders(String idpId) {
        Optional<IdentityProvider> optionalIdentityProvider = manage.getIdentityProvider(idpId, false);
        return optionalIdentityProvider.map(idp -> {
            String institutionId = idp.getInstitutionId();
            return hasText(institutionId) ? manage.getInstituteIdentityProviders(institutionId) : singletonList(idp);
        }).orElse(Collections.emptyList());
    }

    private Optional<String> getFirstShibHeaderValue(ShibbolethHeader headerName, HttpServletRequest request) {
        return getShibHeaderValues(headerName, request).stream().findFirst();
    }

    private List<String> getShibHeaderValues(ShibbolethHeader headerName, HttpServletRequest request) {
        String header = request.getHeader(headerName.getValue());
        try {
            String headerValue = StringUtils.hasText(header) ?
                    new String(header.getBytes("ISO8859-1"), "UTF-8") : null;
            return headerValue == null ? Collections.emptyList() : shibHeaderValueSplitter.splitToList(headerValue);
        } catch (UnsupportedEncodingException e) {
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    protected Object getPreAuthenticatedCredentials(HttpServletRequest request) {
        return "N/A";
    }

    private IdentityProvider getCurrentIdp(String idpId, List<IdentityProvider> institutionIdentityProviders) {
        return institutionIdentityProviders.stream()
                .filter(provider -> provider.getId().equals(idpId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(String.format("The Idp('%s') is not present in the list " +
                        "of Idp's returned by the CsaClient", idpId)));
    }

    public void setDashboardAdmin(String dashboardAdmin) {
        this.dashboardAdmin = dashboardAdmin;
    }

    public void setDashboardViewer(String dashboardViewer) {
        this.dashboardViewer = dashboardViewer;
    }

    public void setDashboardSuperUser(String dashboardSuperUser) {
        this.dashboardSuperUser = dashboardSuperUser;
    }

    public void setAdminSurfConextIdpRole(String adminSurfConextIdpRole) {
        this.adminSurfConextIdpRole = adminSurfConextIdpRole;
    }

    public void setViewerSurfConextIdpRole(String viewerSurfConextIdpRole) {
        this.viewerSurfConextIdpRole = viewerSurfConextIdpRole;
    }

    public void setManageConsentEnabled(boolean manageConsentEnabled) {
        isManageConsentEnabled = manageConsentEnabled;
    }
}
