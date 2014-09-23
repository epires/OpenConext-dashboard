/** @jsx React.DOM */

App.Components.Header = React.createClass({
  getInitialState: function() {
    return {
      dropDownActive: false
    }
  },

  render: function () {
    return (
      <div className="mod-header">
        <h1 className="title"><a href="/">{I18n.t("header.title")}</a></h1>
        <div className="meta">
          <div className="name">
            {this.renderProfileLink()}
            {this.renderDropDown()}
          </div>
          <App.Components.LanguageSelector />
          <ul className="links">
            <li dangerouslySetInnerHTML={{__html: I18n.t("header.links.help_html") }}></li>
            {this.renderExitLogout()}
          </ul>
        </div>
      </div>
    );
  },

  renderProfileLink: function() {
    var title = I18n.t("header.welcome", { name: App.currentUser.displayName });

    if (!App.currentUser.superUser) {
      return (
        <a href="#" onClick={this.handleToggle}>
          {title}
          {this.renderDropDownIndicator()}
        </a>
      );
    } else {
      return title;
    }
  },

  renderDropDownIndicator: function() {
    if (this.state.dropDownActive) {
      return <i className="fa fa-caret-up" />;
    } else {
      return <i className="fa fa-caret-down" />;
    }
  },

  renderDropDown: function() {
    if (!App.currentUser.superUser && this.state.dropDownActive) {
      return (
        <ul>
          <h2>{I18n.t("header.you")}</h2>
          <ul>
            <li><a href="/profile">{I18n.t("header.profile")}</a></li>
          </ul>
          <App.Components.IDPSelector />
        </ul>
      );
    }
  },

  renderExitLogout: function() {
    if (App.currentUser.superUser && App.currentUser.switchedToIdp) {
      return (
        <li><a href="/exit">{I18n.t("header.links.exit")}</a></li>
      );
    } else {
      return (
        <li><a href="/logout">{I18n.t("header.links.logout")}</a></li>
      );
    }
  },

  handleToggle: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({dropDownActive: !this.state.dropDownActive});
  }
});
