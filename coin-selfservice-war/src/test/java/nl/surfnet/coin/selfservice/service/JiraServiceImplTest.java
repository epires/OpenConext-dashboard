/*
 * Copyright 2012 SURFnet bv, The Netherlands
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package nl.surfnet.coin.selfservice.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.hamcrest.core.IsEqual;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.swift.common.soap.jira.JiraSoapService;
import org.swift.common.soap.jira.RemoteIssue;

import nl.surfnet.coin.selfservice.domain.JiraTask;
import nl.surfnet.coin.selfservice.service.impl.JiraServiceImpl;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.anyInt;
import static org.mockito.Matchers.anyObject;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class JiraServiceImplTest {

  @InjectMocks
  private JiraServiceImpl jiraService;

  @Mock
  private JiraSoapService jss;

  @Before
  public void before() {
    jiraService = new JiraServiceImpl();
    MockitoAnnotations.initMocks(this);
  }

  @Test
  public void createRequest() throws IOException {
    ArgumentCaptor<RemoteIssue> captor = ArgumentCaptor.forClass(RemoteIssue.class);

    final JiraTask task = new JiraTask.Builder()
        .body("thebody")
        .identityProvider("idp")
        .serviceProvider("sp")
        .issueType(JiraTask.Type.REQUEST)
        .build();
    jiraService.create(task);
    verify(jss).createIssue(anyString(), captor.capture());

    assertThat("Given body should be set as the issue's Description field",
        captor.getValue().getDescription(), IsEqual.equalTo(task.getBody()));

    assertThat(captor.getValue().getType(), IsEqual.equalTo(JiraServiceImpl.TYPE_SP_CONNECTION));
  }

  @Test
  @Ignore("Creating questions is not implemented yet")
  public void createQuestion() throws IOException {
    ArgumentCaptor<RemoteIssue> captor = ArgumentCaptor.forClass(RemoteIssue.class);

    final JiraTask task = new JiraTask.Builder()
        .body("thebody")
        .identityProvider("idp")
        .serviceProvider("sp")
        .issueType(JiraTask.Type.QUESTION)
        .build();
    jiraService.create(task);
    verify(jss).createIssue(anyString(), captor.capture());

    assertThat(captor.getValue().getType(), IsEqual.equalTo(JiraServiceImpl.TYPE_QUESTION));
  }

  @Test(expected = IOException.class)
  public void createThrowsIO() throws IOException {
    final JiraTask task = new JiraTask.Builder()
        .body("thebody")
        .identityProvider("idp")
        .serviceProvider("sp")
        .issueType(JiraTask.Type.REQUEST)
        .build();

    when(jss.createIssue(anyString(), (RemoteIssue) anyObject()))
        .thenThrow(new org.swift.common.soap.jira.RemoteException());
    jiraService.create(task);
  }

  @Test
  public void getTasks() throws IOException {
    RemoteIssue issue = new RemoteIssue();
    issue.setDescription("bodybody");
    issue.setCustomFieldValues(JiraServiceImpl.EMPTY_REMOTE_CUSTOM_FIELD_VALUES);
    issue.setStatus("6");
    when(jss.getIssuesFromJqlSearch(anyString(), anyString(), anyInt())).thenReturn(
        new RemoteIssue[]{
            issue});
    final List<JiraTask> tasks = jiraService.getTasks(Arrays.asList("Foo", "Bar"));
    assertThat(tasks.size(), is(1));
    assertThat(tasks.get(0).getBody(), IsEqual.equalTo("bodybody"));

  }
}