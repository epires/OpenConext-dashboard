/** @jsx React.DOM */

App.Pages.PolicyDetail = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return this.props.policy;
  },

  render: function () {
    var policy = this.state;
    var title = policy.id ? I18n.t("policy_detail.update_policy") : I18n.t("policy_detail.create_policy");
    return (
      <div className="l-grid main">
        <div className="l-col-6">
          <div className="mod-policy-detail">
            <h1>{title}</h1>
            {this.renderName(policy)}
            {this.renderDenyPermitRule(policy)}
            {this.renderServiceProvider(policy)}
            {this.renderIdentityProvider(policy)}
            {this.renderLogicalRule(policy)}
            {this.renderAttributes(policy)}
            {this.renderDenyAdvice(policy)}
            {this.renderDescription(policy)}
            {this.renderActions(policy)}
          </div>
        </div>
        <div className="l-col-6">
          {this.renderHelp()}
        </div>
      </div>
    );
  },

  renderHelp: function () {
    return (
      <div className="mod-policy-detail-help">
        {I18n.locale === "en" ? <App.Help.PolicyDetailHelpEn/> : <App.Help.PolicyDetailHelpNl/>}
      </div>
    );
  },

  renderName: function (policy) {
    var classNameStatus = _.isEmpty(policy.name) ? "failure" : "success";
    return (
      <div className="form-element">
        <fieldset className={classNameStatus}>
          <p className="label">{I18n.t("policy_detail.name")}</p>
          <input type="text" name="name" className="form-input" valueLink={this.linkState("name")}/>
        </fieldset>
      </div>
    );
  },

  renderDenyPermitRule: function (policy) {
    var classNameSelected = policy.denyRule ? "checked" : "";
    var classNamePermit = policy.denyRule ? "not-selected" : "";
    var classNameDeny = !policy.denyRule ? "not-selected" : "";
    var policyPermit = policy.denyRule ? I18n.t("policy_detail.deny") : I18n.t("policy_detail.permit");

    return (
      <div className="form-element">
        <fieldset className="success">
          <div className="l-grid">
            <div className="l-col-4">
              <p className="label">{I18n.t("policy_detail.access")}</p>
              <div id="ios_checkbox" className={classNameSelected + " ios-ui-select"} onClick={this.toggleDenyRule}>
                <div className="inner"></div>
                <p>{policyPermit}</p>
              </div>
            </div>
            <div className="l-col-4">
              <p className={"info " + classNamePermit}>{I18n.t("policy_detail.permit")}</p>
              <em className={classNamePermit}>{I18n.t("policy_detail.permit_info")}</em>
            </div>
            <div className="l-col-4">
              <p className={"info " + classNameDeny}>{I18n.t("policy_detail.deny")}</p>
              <em className={classNameDeny}>{I18n.t("policy_detail.deny_info")}</em>
            </div>
          </div>
        </fieldset>
      </div>
    );
  },

  toggleDenyRule: function (e) {
    var partialState = {denyRule: !this.state.denyRule};
    if (!this.state.denyRule) {
      partialState.allAttributesMustMatch = true;
    }
    partialState.description = this.buildAutoFormattedDescription(partialState);
    this.setState(partialState);
  },

  buildAutoFormattedDescription: function (partialState) {
    if (this.state.autoFormat) {
      this.provideProviderNames(partialState);
      //we don't want to merge the partialState and this.state before the update
      var policy = {
        identityProviderNames: this.state.identityProviderNames,
        serviceProviderName: this.state.serviceProviderName,
        attributes: partialState.attributes || this.state.attributes,
        denyRule: partialState.denyRule !== undefined ? partialState.denyRule : this.state.denyRule,
        allAttributesMustMatch: partialState.allAttributesMustMatch !== undefined ? partialState.allAttributesMustMatch : this.state.allAttributesMustMatch
      }
      return App.Utils.AutoFormat.description(policy);
    } else {
      return this.state.description;
    }
  },

  renderServiceProvider: function (policy) {
    var classNameStatus = _.isEmpty(policy.serviceProviderId) ? "failure" : "success";
    var serviceProviders = this.props.serviceProviders.map(function (sp) { return {value: sp.spEntityId, display: sp.spName};});
    return (
      <div className="form-element">
        <fieldset className={classNameStatus}>
          <p className="label">{I18n.t("policy_detail.service")}</p>
          <App.Components.Select2Selector
            defaultValue={policy.serviceProviderId}
            placeholder={I18n.t("policy_detail.sp_placeholder")}
            select2selectorId="serviceProvider"
            options={serviceProviders}
            dataChanged={policy.spDataChanged}
            multiple={false}
            handleChange={this.handleChangeServiceProvider}/>
          {this.renderScopedWarning([])}
        </fieldset>
      </div>
    );
  },

  handleChangeServiceProvider: function (newValue) {
    var partialState = {serviceProviderId: newValue};
    partialState.description = this.buildAutoFormattedDescription(partialState);
    this.setState(partialState);
  },

  renderScopedWarning: function (scopedSPs) {
  },

  renderIdentityProvider: function (policy) {
    var providers = this.props.identityProviders.map(function (idp) { return { value: idp.id, display: idp.name }});
    return (
      <div className="form-element">
        <fieldset className="success">
          <p className="label">{I18n.t("policy_detail.institutions")}</p>
            <App.Components.Select2Selector
                defaultValue={policy.identityProviderIds}
                placeholder={I18n.t("policy_detail.idps_placeholder")}
                select2selectorId={"identityProvider"}
                options={providers}
                dataChanged={false}
                multiple={true}
                handleChange={this.handleChangeIdentityProvider}/>
        </fieldset>
      </div>
    );
  },

  handleChangeIdentityProvider: function (newValue) {
    var partialState = {identityProviderIds: newValue};
    partialState.description = this.buildAutoFormattedDescription(partialState);
    //var scopeSPs = App.currentUser.policyIdpAccessEnforcementRequired && _.isEmpty(newValue);

    //if (scopeSPs) {
    //var serviceProviders = scopeSPs ? this.parseEntities(App.currentUser.spEntities) : this.parseEntities(this.props.serviceProviders);
    //  if (this.state.serviceProviderId && !_.any(serviceProviders, 'value', this.state.serviceProviderId)) {
    //    //Unfortunately we have to set the current value manually as the integration with select2 is done one-way
    //    var select2ServiceProvider = $('[data-select2selector-id="serviceProvider"]');
    //    select2ServiceProvider.val("").trigger("change");
    //  }
    //  partialState.spDataChanged = true;
    //}
    this.setState(partialState);
  },

  renderLogicalRule: function (policy) {
    var allAttributesMustMatch = policy.allAttributesMustMatch;
    var classNameAnd = !policy.allAttributesMustMatch ? "not-selected" : "";
    var classNameOr = policy.allAttributesMustMatch ? "not-selected" : "";

    return (
      <div className="form-element">
        <fieldset className="success">
          <div className="l-grid">
            <div className="l-col-4">
              <p className="label">{I18n.t("policy_detail.rule")}</p>
              <ul className="logical-rule">
                {[
                  this.renderRule(I18n.t("policy_detail.rule_and"), allAttributesMustMatch),
                  this.renderRule(I18n.t("policy_detail.rule_or"), !allAttributesMustMatch)
                ]}
              </ul>
            </div>
            <div className="l-col-4">
              <p className={"info " + classNameAnd}>{I18n.t("policy_detail.rule_and")}</p>
              <em className={classNameAnd}>{I18n.t("policy_detail.rule_and_info")}</em>
            </div>
            <div className="l-col-4">
              <p className={"info " + classNameOr}>{I18n.t("policy_detail.rule_or")}</p>
              <em className={classNameOr}>{I18n.t("policy_detail.rule_or_info")}</em>
            </div>
          </div>
        </fieldset>
      </div>
    );
  },

  renderRule: function (value, selected) {
    var className = value + " " + (selected ? "selected" : "");
    if (this.state.denyRule) {
      return (
        <li key={value}>
          <span className={className}>{value}</span>
        </li>
      );
    } else {
      return (
        <li key={value}>
          <a href="#" className={className} onClick={this.handleChooseRule(value)}>{value}</a>
        </li>
      );
    }
  },

  handleChooseRule: function (value) {
    return function (e) {
      e.preventDefault();
      e.stopPropagation();
      var allAttributesMustMatch = (value === I18n.t("policy_detail.rule_and"));
      var partialState = {allAttributesMustMatch: allAttributesMustMatch};
      partialState.description = this.buildAutoFormattedDescription(partialState);
      this.setState(partialState);
    }.bind(this);
  },

  renderAttributes: function (policy) {
    return (<App.Components.PolicyAttributes
        policy={this.state}
        allowedAttributes={this.props.allowedAttributes}
        setAttributeState={this.setAttributeState}/>);
  },

  setAttributeState: function (newAttributeState) {
    newAttributeState.description = this.buildAutoFormattedDescription(newAttributeState);
    this.setState(newAttributeState);
  },

  renderDenyAdvice: function (policy)  {
    var classNameStatus = _.isEmpty(policy.denyAdvice) || _.isEmpty(policy.denyAdviceNl) ? "failure" : "success";
    return (
      <div className="form-element">
        <fieldset className={classNameStatus}>
          <p className="label">{I18n.t("policy_detail.deny_message")}</p>
          <em>{I18n.t("policy_detail.deny_message_info")}</em>
          <input type="text" name="denyMessage" className="form-input"
                 valueLink={this.linkState("denyAdvice")}/>
          <p className="label">{I18n.t("policy_detail.deny_message_nl")}</p>
          <input type="text" name="denyMessageNl" className="form-input"
                 valueLink={this.linkState("denyAdviceNl")} />
        </fieldset>
      </div>
    );
  },

  renderDescription: function (policy) {
    var classNameStatus = _.isEmpty(policy.description) ? "failure" : "success";
    var policy = {description: ""};
    return (
      <div className="form-element">
        <fieldset className={classNameStatus}>
          <p className="label">{I18n.t("policy_detail.description")}</p>
          <textarea rows="4" name="description" className="form-input" valueLink={this.linkState("description")} />
          <input type="checkbox" id="autoFormatDescription" name="autoFormatDescription"
            onChange={this.handleOnChangeAutoFormat}/>
          <label className="note" htmlFor="autoFormatDescription">{I18n.t("policy_detail.autoFormat")}</label>
        </fieldset>
      </div>
    );
  },

  handleOnChangeAutoFormat: function () {
    var partialState = {autoFormat: !this.state.autoFormat};
    if (partialState.autoFormat) {
      partialState.savedDescription = this.state.description;
      this.provideProviderNames(partialState);
      partialState.description = App.Utils.AutoFormat.description(this.state);
    } else {
      partialState.description = this.state.savedDescription || "";
    }
    this.setState(partialState);
  },

  provideProviderNames: function (partialState) {
    var identityProvidersIds = partialState.identityProviderIds !== undefined ? partialState.identityProviderIds : this.state.identityProviderIds;
    if (_.isEmpty(identityProvidersIds)) {
      this.state.identityProviderNames = [];
    } else {
      //we can safely do it like this - as nothing should be updated
      this.state.identityProviderNames = identityProvidersIds.map(function (idp) {
        return I18n.entityName(_.find(this.props.identityProviders, "entityId", idp));
      }.bind(this));

    }
    var serviceProviderId = partialState.serviceProviderId !== undefined ? partialState.serviceProviderId : this.state.serviceProviderId;
    if (_.isEmpty(serviceProviderId)) {
      this.state.serviceProviderName = null;
    } else {
      this.state.serviceProviderName = I18n.entityName(_.find(this.props.serviceProviders, "entityId", serviceProviderId));
    }
  },

  renderActions: function(policy) {
    var classNameSubmit = this.isValidPolicy() ? "" : "disabled";
    return (
      <div className="form-element">
        <fieldset>
          <div className="l-grid">
            <div className="l-col-3">
              <a className={"c-button " + classNameSubmit} href="#" onClick={this.submitForm}>{I18n.t("policy_detail.submit")}</a>
            </div>
            <div className="l-col-3">
              <a className="n-button" href="#" onClick={this.cancelForm}>{I18n.t("policy_detail.cancel")}</a>
            </div>
          </div>
        </fieldset>
      </div>
    );
  },

  isValidPolicy: function () {
    var policy = this.state;
    var emptyAttributes = policy.attributes.filter(function (attr) {
      return _.isEmpty(attr.value);
    });
    var inValid = _.isEmpty(policy.name) || _.isEmpty(policy.description) || _.isEmpty(policy.serviceProviderId)
        || _.isEmpty(policy.attributes) || emptyAttributes.length > 0 || _.isEmpty(policy.denyAdvice) || _.isEmpty(policy.denyAdviceNl);
    return !inValid;
  },

  submitForm: function () {
    App.Controllers.Policies.saveOrUpdatePolicy(this.state, function (jqxhr) {
      jqxhr.isConsumed = true;
      this.setState({flash: jqxhr.responseJSON.details.name});
    }.bind(this));
  },

  cancelForm: function () {
    if (confirm(I18n.t("policy_detail.confirmation"))) {
      page("/policies");
    }
  }
})
