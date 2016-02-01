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
package selfservice.service;

import java.util.List;

import selfservice.domain.Action;

/**
 * Service for Actions
 */
public interface ActionsService {

  /**
   * Get a list of all actions of a certain identity provider
   *
   *
   * @param identityProvider the identity provider
   * @return list of actions
   */
  List<Action> getActions(String identityProvider);

  /**
   * Register the creation of a JIRA issue.
   * @param action the original action
   */
  void registerJiraIssueCreation(Action action);

  /**
   * Register the creation of an Action
   * @param action the original action
   */
  Action registerAction(Action action);
}