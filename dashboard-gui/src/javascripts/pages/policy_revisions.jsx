import React from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import moment from "moment";
import values from "lodash.values";
import groupBy from "lodash.groupby";
import reduce from "lodash.reduce";
import map from "lodash.map";
import difference from "lodash.difference";

import {getPolicyRevisions} from "../api";

import PolicyRevisionsHelpEn from "../help/policy_revisions_help_en";
import PolicyRevisionsHelpNl from "../help/policy_revisions_help_nl";
import stopEvent from "../utils/stop";

class PolicyRevisions extends React.Component {
    constructor() {
        super();

        this.state = {
            data: [],
            revisions: []
        };
    }

    componentWillMount() {
        getPolicyRevisions(this.props.match.params.id).then(data => {
            this.setState({revisions: data.payload});
        });
    }

    renderRevisions() {
        this.state.revisions.sort((rev1, rev2) => {
            return rev2.revisionNbr - rev1.revisionNbr;
        });
        return this.state.revisions.map((revision, index) => {
            return this.renderRevision(revision, index);
        });
    }

    renderRevision(revision, index) {
        const classNameStatus = index === 0 ? "success" : "failure";
        const linkClassName = this.state.curr && this.state.curr.revisionNbr === revision.revisionNbr ? "selected" : "";
        return (
            <div className="form-element" key={index}>
                <fieldset className={classNameStatus}>
                    <div className="l-grid">
                        <div className="l-col-10">
                            {this.renderRevisionMetadata(revision)}
                        </div>
                        <div className="l-col-2 no-gutter text-right">
                            <a className={"c-button white compare " + linkClassName} href="/compare"
                               onClick={this.handleCompare(revision)}>&lt; &gt;</a>
                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }

    renderRevisionMetadata(revision) {
        return (
            <div>
                <p className="label before-em">{revision.name}</p>
                <p className="before-em">{I18n.t("revisions.revision") + " " + revision.revisionNbr}</p>
                <p className="before-em smaller">{I18n.t("policy_detail.sub_title", {
                    displayName: revision.userDisplayName,
                    created: this.createdDate(revision)
                })}</p>
            </div>
        );
    }

    createdDate(revision) {
        if (revision.created) {
            const created = moment.unix(revision.created / 1000);
            created.locale(I18n.locale);
            return created.format("LLLL");
        }
        return "";
    }

    handleCompare(revision) {
        return function (e) {
            stopEvent(e);
            const prev = this.state.revisions.filter(rev => {
                return rev.revisionNbr === (revision.revisionNbr - 1);
            });
            this.setState({curr: revision});
            this.setState({prev: prev[0]});
        }.bind(this);
    }

    renderComparePanel() {
        const prev = this.state.prev;
        const curr = this.state.curr;
        if (prev || curr) {
            return this.renderDiff(prev, curr);
        }

        return this.renderAboutPage();
    }

    renderDiff(passedPrev, curr) {
        let prev = passedPrev;
        const properties = [
            "name", "description", "denyRule", "serviceProviderName", "identityProviderNames",
            "allAttributesMustMatch", "attributes", "denyAdvice", "denyAdviceNl", "active"
        ];
        //means someone if looking at the first initial revision
        if (!prev) {
            prev = {attributes: []};
        }

        const renderPropertyDiff = function (prev, curr, name) {
            const diffElement = name === "attributes" ?
                this.renderAttributesDiff(prev, curr) :
                <div className={"diff-element " + this.classNamePropertyDiff(prev[name], curr[name])}>
                    <p className="label">{I18n.t("revisions." + name)}</p>
                    {this.renderPropertyDiff(prev[name], curr[name])}
                </div>;

            return (
                <div className="diff-container" key={name}>
                    {diffElement}
                </div>
            );
        }.bind(this);

        return (
            <div className="mod-policy-revisions-diff">
                {this.renderTopDiff(prev, curr)}
                <div className="diff-panel">
                    {
                        properties.map(prop => {
                            return renderPropertyDiff(prev, curr, prop);
                        })
                    }
                </div>
            </div>
        );
    }

    renderPropertyDiff(prev, curr) {
        const previous = Array.isArray(prev) ? prev.join(", ") : prev;
        const current = Array.isArray(curr) ? curr.join(", ") : curr;
        if (previous === current) {
            return (<span className="diff no-change">{current.toString()}</span>);
        } else if (previous === undefined) {
            return <span className="diff curr">{current.toString()}</span>;
        }

        return (
            <div>
                <span className="diff prev">{previous.toString()}</span>
                <span className="diff curr">{current.toString()}</span>
            </div>
        );
    }

    classNamePropertyDiff(prev, curr) {
        const previous = Array.isArray(prev) ? prev.join(", ") : prev;
        const current = Array.isArray(curr) ? curr.join(", ") : curr;
        return previous !== current ? "changed" : "no-change";
    }

    renderTopDiff(prev, curr) {
        const translationKey = prev.revisionNbr !== undefined && prev.revisionNbr !== curr.revisionNbr ? "revisions.changes_info_html" : "revisions.changes_first_html";

        const topDiffHtml =
            I18n.t(translationKey, {
                userDisplayName: curr.userDisplayName,
                authenticatingAuthorityName: curr.authenticatingAuthorityName,
                createdDate: this.createdDate(curr),
                currRevisionNbr: curr.revisionNbr,
                prevRevisionNbr: prev.revisionNbr
            });

        return (
            <div className="top-diff" dangerouslySetInnerHTML={{__html: topDiffHtml}}/>
        );
    }

    renderAttributesDiff(prev, curr) {
        const attrPrevGrouped = groupBy(prev.attributes, attr => {
            return attr.name;
        });

        const attrCurrGrouped = groupBy(curr.attributes, attr => {
            return attr.name;
        });

        const attrResult = reduce(attrCurrGrouped, (result, attributes, attrName) => {
            if (attrPrevGrouped.hasOwnProperty(attrName)) {
                //find out the diff in values
                const prevValues = map(attrPrevGrouped[attrName], "value");
                const currValues = map(attributes, "value");

                const deleted = difference(prevValues, currValues).map(deletedValue => {
                    return {value: deletedValue, status: "prev"};
                });
                const added = difference(currValues, prevValues).map(addedValue => {
                    return {value: addedValue, status: "curr"};
                });
                const unchanged = currValues.filter(value => {
                    return prevValues.indexOf(value) !== -1;
                }).map(unchangedValue => {
                    return {value: unchangedValue, status: "no-change"};
                });

                const newValues = deleted.concat(added).concat(unchanged);
                const anyValuesChanged = newValues.filter(val => {
                    return val.status === "prev" || val.status === "curr";
                }).length > 0;

                result[attrName] = {values: newValues, status: "no-change", anyValuesChanged: anyValuesChanged};

                return result;
            }

            // these are the added attributes that are in curr and not in prev
            result[attrName] = {
                values: attributes.map(attribute => {
                    return {value: attribute.value, status: "curr"};
                }), status: "curr"
            };

            return result;
        }, {});

        const prevNames = Object.keys(attrPrevGrouped);

        // add the deleted attributes that are in prev and not in curr
        prevNames.forEach(name => {
            if (!attrResult.hasOwnProperty(name)) {
                attrResult[name] = {
                    values: attrPrevGrouped[name].map(attribute => {
                        return {value: attribute.value, status: "prev"};
                    }), status: "prev"
                };
            }
        });

        const attributesUnchanged = values(attrResult).filter(attribuut => {
            return (attribuut.status === "prev" || attribuut.status === "curr") && attribuut.values.filter(value => {
                return value.value === "prev" || value.value === "curr";
            }).length === 0;
        }).length === 0;

        const attributeNames = Object.keys(attrResult);
        return (
            <div className={"diff-element " + (attributesUnchanged ? "no-change" : "changed")}>
                <p className="label">{I18n.t("revisions.attributes")}</p>
                {
                    attributeNames.map(attributeName => {
                        return (
                            <div key={attributeName}>
                                <div className="attribute-container">
                                    <span className={"diff " + attrResult[attributeName].status}>{attributeName}</span>
                                </div>
                                <div
                                    className={"attribute-values-container " + (attrResult[attributeName].status === "no-change"
                                    && attrResult[attributeName].anyValuesChanged ? "diff-element changed" : "")}>
                                    <p className="label">{I18n.t("policy_attributes.values")}</p>
                                    {
                                        attrResult[attributeName].values.map(value => {
                                            return (
                                                <div className="value-container"
                                                     key={attributeName + "-" +
                                                     attrResult[attributeName].status + "-" +
                                                     value.value + "-" +
                                                     value.status}>
                                                    <span className={"diff " + value.status}>{value.value}</span>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>);
    }

    renderAboutPage() {
        return (
            <div className="mod-policy-revisions-about">
                {I18n.locale === "en" ? <PolicyRevisionsHelpEn/> : <PolicyRevisionsHelpNl/>}
            </div>
        );
    }

    render() {
        return (
            <div className="l-grid main">
                <div className="l-col-6">
                    <div className="mod-policy-revisions">
                        <h1>{I18n.t("revisions.title")}</h1>
                        <form>
                            {this.renderRevisions()}
                        </form>
                    </div>
                </div>
                <div className="l-col-6">
                    {this.renderComparePanel()}
                </div>
            </div>
        );
    }


}

PolicyRevisions.propTypes = {
    params: PropTypes.shape({
        id: PropTypes.string
    })
};

export default PolicyRevisions;
