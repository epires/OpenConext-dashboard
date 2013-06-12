<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ include file="../include.jsp" %>
<%--
  ~ Copyright 2012 SURFnet bv, The Netherlands
  ~
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~ you may not use this file except in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~      http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  --%>
<div class="arp-info">

	<c:choose>
	  <c:when test="${service.arp.noArp}">
      <p><spring:message code="jsp.sp_detail.arp.noarp.text" arguments="${service.name}"/></p>
    </c:when>
    <c:when test="${service.arp.noAttrArp}">
      <p><spring:message code="jsp.sp_detail.arp.noattr.text" arguments="${service.name}"/></p>
    </c:when>
    <c:otherwise>
		  <h2><spring:message code="jsp.sp_detail.arp"/></h2>
		  <p><spring:message code="jsp.sp_detail.arp.intro" arguments="${service.name}"/></p>
		    <table>
		      <c:forEach items="${service.arp.attributes}" var="att">
            <tr>
              <c:if test="${not rawArpAttributesVisible}">
                <td>&bull;</td>
              </c:if>
              <c:if test="${rawArpAttributesVisible}">
                <td>${att.key}</td><td>&nbsp;</td>
              </c:if>
              <td><tags:arp-attribute-info attributeKey="${att.key}"/>

		          <%-- In ServiceRegistry the ARP can also contain an array of values to filter.
		     By default it is ['*'] --%>
		          <c:if test="${not(fn:length(att.value) eq 1 and att.value[0] eq '*')}">
		            <br/><spring:message code="jsp.sp_detail.arp.specific_values"/>
		            <ul>
		              <c:forEach items="${att.value}" var="value">
		                <li><c:out value="${value}"/></li>
		              </c:forEach>
		            </ul>
		          </c:if>
		        </tr>
		      </c:forEach>
		    </table>
	  </c:otherwise>
	</c:choose>
</div>