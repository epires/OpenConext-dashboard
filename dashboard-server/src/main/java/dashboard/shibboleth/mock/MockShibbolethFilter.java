package dashboard.shibboleth.mock;

import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.IOException;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static dashboard.control.Constants.HTTP_X_IDP_ENTITY_ID;
import static dashboard.shibboleth.ShibbolethHeader.Name_Id;
import static dashboard.shibboleth.ShibbolethHeader.Shib_Authenticating_Authority;
import static dashboard.shibboleth.ShibbolethHeader.Shib_DisplayName;
import static dashboard.shibboleth.ShibbolethHeader.Shib_EduPersonEntitlement;
import static dashboard.shibboleth.ShibbolethHeader.Shib_EduPersonPN;
import static dashboard.shibboleth.ShibbolethHeader.Shib_EduPersonScopedAffiliation;
import static dashboard.shibboleth.ShibbolethHeader.Shib_Email;
import static dashboard.shibboleth.ShibbolethHeader.Shib_GivenName;
import static dashboard.shibboleth.ShibbolethHeader.Shib_MemberOf;
import static dashboard.shibboleth.ShibbolethHeader.Shib_SchacPersonalUniqueCode;
import static dashboard.shibboleth.ShibbolethHeader.Shib_Uid;

public class MockShibbolethFilter extends GenericFilterBean {

    public static final String idp = "https://idp.surfnet.nl";
    public static final String role = "super";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {
        HttpServletRequest req = (HttpServletRequest) request;


        String userId = Optional.ofNullable(request.getParameter("mockUser"))
                .orElse(Optional.ofNullable((String) req.getSession().getAttribute("mockUser")).orElse(role));

        req.getSession(true).setAttribute("mockUser", userId);
        SetHeader wrapper = new SetHeader(req);
        wrapper.setHeader(Name_Id.getValue(), userId);
        wrapper.setHeader(Shib_Uid.getValue(), userId);
        wrapper.setHeader(Shib_Authenticating_Authority.getValue(), idp);
        wrapper.setHeader(Shib_GivenName.getValue(), "Some given name");
        wrapper.setHeader(Shib_Email.getValue(), "jane.roe@example.org");
        wrapper.setHeader(Shib_EduPersonPN.getValue(), "Some eduPersonPrincipalName");
        wrapper.setHeader(Shib_DisplayName.getValue(), "Jane Roe");
        wrapper.setHeader(Shib_SchacPersonalUniqueCode.getValue(), "schac_personal_unique_code");
        wrapper.setHeader(Shib_EduPersonEntitlement.getValue(),
                "urn:mace:terena.org:tcs:personal-user;some-filtered-value");
        wrapper.setHeader(Shib_EduPersonScopedAffiliation.getValue(),
                "urn:mace:terena.org:tcs:eduPersonScopedAffiliation");
        wrapper.setHeader(HTTP_X_IDP_ENTITY_ID, idp);
        switch (userId) {
            case "super":
                wrapper.setHeader(Shib_MemberOf.getValue(), "dashboard.super.user");
                break;
            case "admin":
                wrapper.setHeader(Shib_MemberOf.getValue(), "dashboard.admin");
                break;
            case "viewer":
                wrapper.setHeader(Shib_MemberOf.getValue(), "dashboard.viewer");
                break;
            default:
                //nothing
        }
        chain.doFilter(wrapper, response);
    }

    private static class SetHeader extends HttpServletRequestWrapper {

        private final HashMap<String, String> headers;

        public SetHeader(HttpServletRequest request) {
            super(request);
            this.headers = new HashMap<>();
        }

        public void setHeader(String name, String value) {
            this.headers.put(name, value);
        }

        @Override
        public Enumeration<String> getHeaderNames() {
            List<String> names = Collections.list(super.getHeaderNames());
            names.addAll(headers.keySet());
            return Collections.enumeration(names);
        }

        @Override
        public String getHeader(String name) {
            if (headers.containsKey(name)) {
                return headers.get(name);
            }
            return super.getHeader(name);
        }

        @Override
        public Enumeration getHeaders(String name) {
            if (headers.containsKey(name)) {
                return Collections.enumeration(Collections.singletonList(headers.get(name)));
            }
            return super.getHeaders(name);
        }
    }

}
