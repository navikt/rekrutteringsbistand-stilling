import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flatknapp } from 'nav-frontend-knapper';
import { Column, Row } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import RichTextEditor from '../richTextEditor/RichTextEditor';
import {
    SET_EMPLOYER_HOMEPAGE,
    SET_EMPLOYER_NAME,
    SET_EMPLOYERDESCRIPTION,
    SET_FACEBOOK_PAGE, SET_LINKEDIN_PAGE, SET_TWITTER_ADDRESS
} from '../../adDataReducer';
import EmployerName from './EmployerName';

function adjustUrl(url) {
    if (!url.startsWith('http')) {
        return `https://${url}`;
    }
    return url;
}

function adjustTwitterLink(url) {
    if (url.startsWith('@')) {
        return `https://twitter.com/${url}`;
    } else if (!url.startsWith('http')) {
        return `https://${url}`;
    }
    return url;
}

class Employer extends React.Component {
    onEmployerNameChange = (e) => {
        this.props.setEmployerName(e.target.value);
    };

    onEmployerDescriptionChange = (employerDescription) => {
        this.props.setEmployerDescription(employerDescription);
    };

    onEmployerHomepageChange = (e) => {
        this.props.setEmployerHomepage(e.target.value);
    };

    onFacebookpageChange = (e) => {
        this.props.setFacebookpage(e.target.value);
    };

    onLinkedinpageChange = (e) => {
        this.props.setLinkedinpage(e.target.value);
    };

    onTwitteraddressChange = (e) => {
        this.props.setTwitteraddress(e.target.value);
    };

    onAddOnlineAddress = () => {
        this.props.setFacebookpage('');
    };

    completeHomepageLink = () => {
        const { employerhomepage } = this.props.ad.properties;
        if (employerhomepage && employerhomepage !== '') {
            this.props.setEmployerHomepage(adjustUrl(employerhomepage));
        }
    };

    completeFacebookLink = () => {
        const { facebookpage } = this.props.ad.properties;
        if (facebookpage && facebookpage !== '') {
            this.props.setFacebookpage(adjustUrl(facebookpage));
        }
    };

    completeLinkedinLink = () => {
        const { linkedinpage } = this.props.ad.properties;
        if (linkedinpage && linkedinpage !== '') {
            this.props.setLinkedinpage(adjustUrl(linkedinpage));
        }
    };

    completeTwitterLink = () => {
        const { twitteraddress } = this.props.ad.properties;
        if (twitteraddress && twitteraddress !== '') {
            this.props.setTwitteraddress(adjustTwitterLink(twitteraddress));
        }
    };

    render() {
        const { ad } = this.props;
        const hideOnlineAddresses = ad.properties.facebookpage === undefined
            && ad.properties.linkedinpage === undefined
            && ad.properties.twitteraddress === undefined;

        return (
            <Ekspanderbartpanel
                className="blokk-s"
                tittel="Om bedriften"
                tittelProps="undertittel"
                border
                apen
            >
                <EmployerName />
                <Input
                    label="Navn på bedrift"
                    value={ad.properties.employer || ''}
                    onChange={this.onEmployerNameChange}
                    placeholder="Navnet bedriften bruker"
                />
                <Normaltekst className="blokk-xxs">Kort om bedriften</Normaltekst>
                <RichTextEditor
                    text={ad.properties.employerdescription || ''}
                    onChange={this.onEmployerDescriptionChange}
                    placeholderText="Fortell om bedriften til den som skal søke på stillingen"
                />
                <Input
                    label="Bedriftens nettsted"
                    value={ad.properties.employerhomepage || ''}
                    onChange={this.onEmployerHomepageChange}
                    onBlur={this.completeHomepageLink}
                    placeholder="www.firmanavn.no"
                />
                {hideOnlineAddresses
                    ? (
                        <Row className="blokk-l">
                            <Column xs="12">
                                <Flatknapp
                                    id="legg-til-addresser"
                                    onClick={this.onAddOnlineAddress}
                                    mini
                                >
                                + Legg til adresser for Facebook, LinkedIn og Twitter
                                </Flatknapp>
                            </Column>
                        </Row>
                    ) : (
                        <div>
                            <Input
                                id="facebookside"
                                label="Bedriftens side på Facebook"
                                value={ad.properties.facebookpage
                                    ? (ad.properties.facebookpage)
                                    : ''}
                                onChange={this.onFacebookpageChange}
                                onBlur={this.completeFacebookLink}
                                placeholder="For eksempel: facebook.com/firmanavn"
                                inputRef={(i) => { this.focusField = i; }}
                            />
                            <Input
                                id="linkedinside"
                                label="Bedriftens side på LinkedIn"
                                value={ad.properties.linkedinpage
                                    ? (ad.properties.linkedinpage)
                                    : ('')}
                                onChange={this.onLinkedinpageChange}
                                onBlur={this.completeLinkedinLink}
                                placeholder="For eksempel: linkedin.com/company/firmanavn"
                            />
                            <Input
                                id="twitteradresse"
                                label="Bedriftens Twitteradresse"
                                value={ad.properties.twitteraddress
                                    ? (ad.properties.twitteraddress)
                                    : ('')}
                                onChange={this.onTwitteraddressChange}
                                onBlur={this.completeTwitterLink}
                                placeholder="For eksempel: @firmanavn"
                            />
                        </div>
                    )}
            </Ekspanderbartpanel>
        );
    }
}

Employer.defaultProps = {
};

Employer.propTypes = {
    ad: PropTypes.shape({
        title: PropTypes.string,
        properties: PropTypes.shape({
            employerhomepage: PropTypes.string,
            facebookpage: PropTypes.string,
            linkedinpage: PropTypes.string,
            twitteraddress: PropTypes.string
        })
    }),
    setEmployerName: PropTypes.func.isRequired,
    setEmployerHomepage: PropTypes.func.isRequired,
    setEmployerDescription: PropTypes.func.isRequired,
    setFacebookpage: PropTypes.func.isRequired,
    setLinkedinpage: PropTypes.func.isRequired,
    setTwitteraddress: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    ad: state.adData
});

const mapDispatchToProps = (dispatch) => ({
    setEmployerName: (employername) => dispatch({ type: SET_EMPLOYER_NAME, employername }),
    setEmployerHomepage: (employerhomepage) => dispatch({ type: SET_EMPLOYER_HOMEPAGE, employerhomepage }),
    setEmployerDescription: (employerdescription) => dispatch({ type: SET_EMPLOYERDESCRIPTION, employerdescription }),
    setFacebookpage: (facebookpage) => dispatch({ type: SET_FACEBOOK_PAGE, facebookpage }),
    setLinkedinpage: (linkedinpage) => dispatch({ type: SET_LINKEDIN_PAGE, linkedinpage }),
    setTwitteraddress: (twitteraddress) => dispatch({ type: SET_TWITTER_ADDRESS, twitteraddress })
});

export default connect(mapStateToProps, mapDispatchToProps)(Employer);
