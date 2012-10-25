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
    <ul class="app-grid ${filterAppGridAllowed == true ? 'filters-available' : ''}" data-search-placeholder="Search in applications">
      <c:forEach items="${compoundSps}" var="compoundSp">
        <c:if test="${not empty compoundSp.id}">
          <li class="${compoundSp.sp.linked ? "connected" : ""} ${compoundSp.articleAvailable ? "licensed" : ""}">
            <spring:url value="app-detail.shtml" var="detailUrl" htmlEscape="true">
              <spring:param name="compoundSpId" value="${compoundSp.id}" />
            </spring:url>
            <h2>
              <a href="${detailUrl}"><tags:providername provider="${compoundSp.sp}" /></a><!--TODO: providername for compoundSp instead of SP -->
            </h2> 
            <c:if test="${not empty compoundSp.appStoreLogo}">
              <img src="<c:url value="${compoundSp.appStoreLogo}"/>" alt="<c:out value=""/>" />
            </c:if>
            <p class="desc">
              <c:out value="${fn:substring(compoundSp.serviceDescriptionEn, 0, 40)}" />
            </p>
            <div class="app-meta-cta">
              <c:if test="${compoundSp.articleAvailable}">
                <i class="icon-shopping-cart" rel="tooltip" title="<spring:message code="jsp.sp_overview.haslicense" />"></i><br>
              </c:if>
              <c:if test="${compoundSp.sp.linked}">
                <i class="icon-check" rel="tooltip" title="<spring:message code="jsp.sp_overview.isconnected" />"></i>
              </c:if>
              <c:if test="${not empty compoundSp.appUrl}">
                <a href="${compoundSp.appUrl}" target="_blank" rel="tooltip" title="<spring:message code="jsp.sp_overview.gotoapp" />">
                  <i class="icon-play"></i>
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