package dashboard.manage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.StringUtils;
import dashboard.domain.IdentityProvider;
import dashboard.domain.ServiceProvider;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;
import static dashboard.util.StreamUtils.filterEmpty;

@SuppressWarnings("unchecked")
public class ClassPathResourceManage implements Manage {

    private final static Logger LOG = LoggerFactory.getLogger(ClassPathResourceManage.class);

    private volatile Map<String, IdentityProvider> identityProviderMap = new HashMap<>();
    private volatile Map<String, ServiceProvider> serviceProviderMap = new HashMap<>();
    private volatile Map<String, ServiceProvider> exampleSingleTenants = new HashMap<>();

    public ClassPathResourceManage() {
        initializeMetadata();
    }

    @Override
    public Optional<IdentityProvider> getIdentityProvider(String idpEntityId, boolean searchRevisions) {
        return Optional.ofNullable(identityProviderMap.get(idpEntityId));
    }

    @Override
    public List<IdentityProvider> getInstituteIdentityProviders(String instituteId) {
        return identityProviderMap.values().stream().filter(identityProvider -> instituteId.equals(identityProvider
                .getInstitutionId())).collect(toList());
    }

    @Override
    public List<IdentityProvider> getAllIdentityProviders() {
        return new ArrayList<>(identityProviderMap.values());
    }

    @Override
    public List<IdentityProvider> getLinkedIdentityProviders(String spId) {
        //We can't answer this question for single tenant sp as they are virtual
        if (this.exampleSingleTenants.containsKey(spId)) {
            return new ArrayList<>();
        }
        ServiceProvider serviceProvider = getServiceProvider(spId, EntityType.saml20_sp, false).orElseThrow
                (RuntimeException::new);
        if (serviceProvider.isAllowedAll()) {
            return identityProviderMap.values().stream().filter(identityProvider ->
                    identityProvider.isAllowedAll() || identityProvider.getAllowedEntityIds().contains(spId)).collect
                    (toList());
        } else {
            return serviceProvider.getAllowedEntityIds().stream().map(idpEntityId -> getIdentityProvider(idpEntityId,
                    false)).collect(filterEmpty());
        }
    }

    @Override
    public List<ServiceProvider> getLinkedServiceProviders(String idpId) {
        IdentityProvider identityProvider = getIdentityProvider(idpId, false).orElseThrow
                (RuntimeException::new);
        if (identityProvider.isAllowedAll()) {
            return serviceProviderMap.values().stream().filter(serviceProvider ->
                    serviceProvider.isAllowedAll() || serviceProvider.getAllowedEntityIds().contains(idpId)).collect
                    (toList());
        } else {
            return identityProvider.getAllowedEntityIds().stream().map(spEntityId -> getServiceProvider(spEntityId, EntityType.saml20_sp,
                    false)).collect(filterEmpty());
        }
    }

    @Override
    public List<ServiceProvider> getAllServiceProviders() {
        Collection<ServiceProvider> allSPs = new ArrayList<>(serviceProviderMap.values()).stream()
                .filter(sp -> !sp.isHidden()).collect(Collectors.toList());

        allSPs.addAll(exampleSingleTenants.values());
        return new ArrayList<>(allSPs);
    }

    @Override
    public Optional<ServiceProvider> getServiceProvider(String spEntityId, EntityType type, boolean searchRevisions) {
        return type.equals(EntityType.saml20_sp) ? Optional.ofNullable(serviceProviderMap.get(spEntityId)) :
                Optional.ofNullable(exampleSingleTenants.get(spEntityId));
    }

    @Override
    public Optional<ServiceProvider> getServiceProviderById(Long spId, EntityType type) {
        return type.equals(EntityType.saml20_sp) ? serviceProviderMap.values()
                .stream().filter(sp -> sp.getEid().equals(spId)).findFirst() :
                exampleSingleTenants.values().stream().filter(sp -> sp.getEid().equals(spId)).findFirst();
    }

    @Override
    public List<ServiceProvider> getInstitutionalServicesForIdp(String instituteId) {
        return StringUtils.hasText(instituteId) ? this.serviceProviderMap.values().stream().filter(sp -> instituteId
                .equals(sp.getInstitutionId())).collect(toList()) : Collections.emptyList();
    }

    private void initializeMetadata() {
        try {
            identityProviderMap = parseProviders(getIdpResource(), this::identityProvider);
            serviceProviderMap = parseProviders(getSpResource(), sp -> this.serviceProvider(sp, EntityType.saml20_sp));
            long maxEid = serviceProviderMap.values().stream().max(Comparator.comparing(ServiceProvider::getEid)).get()
                    .getEid()
                    + 1L;
            exampleSingleTenants = parseProviders(getSingleTenantResource(),
                    sp -> this.serviceProvider(sp, EntityType.single_tenant_template));
            exampleSingleTenants.values().forEach(singleTenant -> {
                singleTenant.setExampleSingleTenant(true);
                singleTenant.setEid(singleTenant.getEid() + maxEid);
            });
            LOG.debug("Initialized Manage Resources. Number of IDPs {}. Number of SPs {}", identityProviderMap.size(),
                    serviceProviderMap.size());
        } catch (Throwable e) {
            /*
             * By design we catch the error and not rethrow it as this would cancel future scheduling
             */
            LOG.error("Error in refreshing / initializing metadata", e);
        }
    }

    private Resource getIdpResource() {
        return new ClassPathResource("manage/identity-providers.json");
    }

    private Resource getSpResource() {
        return new ClassPathResource("manage/service-providers.json");
    }

    private Resource getSingleTenantResource() {
        return new ClassPathResource("manage/single-tenants.json");
    }

}
