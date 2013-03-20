<%@ include file="include.jsp"%>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags"%>
<%--
  Copyright 2012 SURFnet bv, The Netherlands

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  --%>
<spring:message var="title" code="jsp.home.title" />
<jsp:include page="head.jsp">
  <jsp:param name="title" value="${title}" />
  <jsp:param name="wrapperAdditionalCssClass" value="has-left app-grid-wrapper" />
</jsp:include>
<div class="column-center content-holder app-grid-holder">
  <h1 class="hidden-phone"><spring:message code="jsp.home.title" /></h1>
  <section>
    <ul class="app-grid ${filterAppGridAllowed == true ? 'filters-available' : ''} ${lmngActiveModus == true ? 'lmng-active' : ''}"> 
      <c:forEach items="${compoundSps}" var="compoundSp">
        <c:if test="${not empty compoundSp.id}">
          <c:set var="serviceDescription"><tags:locale-specific nlVariant="${compoundSp.serviceDescriptionNl}" enVariant="${compoundSp.serviceDescriptionEn}" /></c:set>
          <c:set var="showConnectButton" value="${applyAllowed and (not compoundSp.sp.linked)}" />
          <li class="${compoundSp.sp.linked ? "connected" : "not-connected"} ${compoundSp.articleLicenseAvailable ? "licensed" : "not-licensed"}" data-id="${compoundSp.id}">
            <spring:url value="app-detail.shtml" var="detailUrl" htmlEscape="true">
              <spring:param name="compoundSpId" value="${compoundSp.id}" />
            </spring:url>
            <c:set var="spTitleClass">
              <c:choose>
                <c:when test="${empty serviceDescription and not showConnectButton}">longer</c:when>
                <c:when test="${empty serviceDescription or not showConnectButton}">long</c:when>
                <c:otherwise>short</c:otherwise>
              </c:choose>
            </c:set>
            <h2 class="${spTitleClass}">
              <%--TODO: providername for compoundSp instead of SP --%>
              <a href="${detailUrl}"><tags:providername provider="${compoundSp.sp}" /></a>
            </h2> 
            <c:if test="${not empty compoundSp.appStoreLogo}">
              <img src="<c:url value="${compoundSp.appStoreLogo}"/>"/>
            </c:if>
            <p class="desc">
              <c:out value="${fn:substring(serviceDescription, 0, 40)}" />
            </p>
            <c:if test="${showConnectButton}">
              <p class="connect-app">
                <a href="<c:url value="/requests/linkrequest.shtml">
                        <c:param name="spEntityId" value="${compoundSp.sp.id}" />
                        <c:param name="compoundSpId" value="${compoundSp.id}" />
                      </c:url>">
                  <spring:message code="jsp.sp_detail.requestlink"/>
                </a>
              </p>
            </c:if>
            <div class="app-meta-cta">
              <c:if test="${not empty compoundSp.appUrl}">
                <a href="${compoundSp.appUrl}" target="_blank" rel="tooltip" title="<spring:message code="jsp.sp_overview.gotoapp" />">
                  <i class="icon-external-link"></i>
                </a>
              </c:if>
            </div>
          </li>
        </c:if>
      </c:forEach>
    </ul>
  </section>
</div>
<jsp:include page="foot.jsp" />