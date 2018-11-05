package dashboard.service.impl;

import com.github.tomakehurst.wiremock.junit.WireMockRule;
import dashboard.domain.Action;
import org.apache.commons.io.IOUtils;
import org.junit.Rule;
import org.junit.Test;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static java.util.stream.Collectors.toList;
import static org.junit.Assert.assertEquals;

public class JiraClientImplTest {

    private JiraClientImpl jiraClient = new JiraClientImpl("http://localhost:8891", "user", "password", "CTX");

    @Rule
    public WireMockRule wireMockRule = new WireMockRule(8891);

    public JiraClientImplTest() throws IOException {
    }

    @Test
    public void getTasks() throws IOException {
        String jiraResponse = IOUtils.toString(new ClassPathResource("jira-json/tasks.json").getInputStream());

        stubFor(post(urlPathEqualTo("/search")).willReturn(aResponse().withStatus(200)
                .withHeader("Content-Type", "application/json").withBody(jiraResponse)));

        Map<String, Object> tasks = jiraClient.getTasks("https://mock-idp", 0, 99);
        assertEquals(2, tasks.size());
    }

    @Test
    public void actionToIssueIdentifier() {
        List<String> identifiers = Arrays.asList(Action.Type.values()).stream().map(type -> jiraClient.actionToIssueIdentifier(type)).collect(toList());

        assertEquals("11104,11105,11103,11106", String.join(",", identifiers));
        assertEquals(4l, identifiers.stream().map(identifier -> jiraClient.findType(identifier)).count());
    }

}