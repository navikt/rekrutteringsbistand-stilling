import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flatknapp } from 'nav-frontend-knapper';
import { Column, Row } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import RichTextEditor from '../richTextEditor/RichTextEditor';
import {
    SET_EMPLOYER_HOMEPAGE,
    SET_EMPLOYER_NAME,
    SET_EMPLOYERDESCRIPTION,
    SET_FACEBOOK_PAGE,
    SET_LINKEDIN_PAGE,
    SET_TWITTER_ADDRESS,
} from '../../adDataReducer';
import { adjustUrl } from '../../../common/urlUtils';
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import { State } from '../../../redux/store';
import { formaterDataFraEnhetsregisteret } from '../../../opprett-ny-stilling/VelgArbeidsgiver';
import { Accordion } from '@navikt/ds-react';

const EndreArbeidsgiver: FunctionComponent = () => {
    const ad = useSelector((state: State) => state.adData);
    const { employerhomepage, facebookpage, linkedinpage, twitteraddress } = ad.properties;

    const dispatch = useDispatch();

    const setEmployerName = (employername: string) =>
        dispatch({ type: SET_EMPLOYER_NAME, employername });
    const setEmployerHomepage = (employerhomepage: string) =>
        dispatch({ type: SET_EMPLOYER_HOMEPAGE, employerhomepage });
    const setEmployerDescription = (employerdescription: string) =>
        dispatch({ type: SET_EMPLOYERDESCRIPTION, employerdescription });
    const setFacebookpage = (facebookpage: string) =>
        dispatch({ type: SET_FACEBOOK_PAGE, facebookpage });
    const setLinkedinpage = (linkedinpage: string) =>
        dispatch({ type: SET_LINKEDIN_PAGE, linkedinpage });
    const setTwitteraddress = (twitteraddress: string) =>
        dispatch({ type: SET_TWITTER_ADDRESS, twitteraddress });

    const completeHomepageLink = () => {
        if (employerhomepage && employerhomepage !== '') {
            setEmployerHomepage(adjustUrl(employerhomepage));
        }
    };

    const completeFacebookLink = () => {
        if (facebookpage && facebookpage !== '') {
            setFacebookpage(adjustUrl(facebookpage));
        }
    };

    const completeLinkedinLink = () => {
        if (linkedinpage && linkedinpage !== '') {
            setLinkedinpage(adjustUrl(linkedinpage));
        }
    };

    const completeTwitterLink = () => {
        if (twitteraddress && twitteraddress !== '') {
            setTwitteraddress(adjustTwitterLink(twitteraddress));
        }
    };

    const hideOnlineAddresses =
        facebookpage === undefined && linkedinpage === undefined && twitteraddress === undefined;

    return (
        <>
            <Accordion.Header title="Om bedriften">Om bedriften</Accordion.Header>
            <Accordion.Content>
                {ad.employer && (
                    <div className="blokk-xs">
                        <Element>Informasjon fra enhetsregisteret</Element>
                        <Normaltekst>{formaterDataFraEnhetsregisteret(ad.employer)}</Normaltekst>
                    </div>
                )}
                <Skjemalabel
                    inputId="endre-stilling-navnet-bedriften-bruker"
                    beskrivelse="Navnet bedriften bruker"
                >
                    Navn på bedrift
                </Skjemalabel>
                <Input
                    className="blokk-s"
                    id="endre-stilling-navnet-bedriften-bruker"
                    aria-describedby="endre-stilling-navnet-bedriften-bruker-beskrivelse"
                    value={ad.properties.employer || ad.businessName || ''}
                    onChange={(e) => setEmployerName(e.target.value)}
                />
                <Skjemalabel
                    inputId="endre-stilling-kort-om-bedriften"
                    beskrivelse="Skriv noen linjer om bedriften"
                >
                    Kort om bedriften
                </Skjemalabel>
                <div className="Edit__Employer__rteEditor-content">
                    <RichTextEditor
                        id="endre-stilling-kort-om-bedriften"
                        aria-describedby="endre-stilling-kort-om-bedriften-beskrivelse"
                        text={ad.properties.employerdescription || ''}
                        onChange={(desc: string) => setEmployerDescription(desc)}
                    />
                </div>
                <Skjemalabel
                    inputId="endre-stilling-nettsted"
                    beskrivelse="For eksempel: www.firmanavn.no"
                >
                    Bedriftens nettsted
                </Skjemalabel>
                <Input
                    className="blokk-xs"
                    id="endre-stilling-nettsted"
                    aria-describedby="endre-stilling-nettsted-beskrivelse"
                    value={employerhomepage || ''}
                    onChange={(e) => setEmployerHomepage(e.target.value)}
                    onBlur={completeHomepageLink}
                />
                {hideOnlineAddresses ? (
                    <Row>
                        <Column xs="12">
                            <Flatknapp mini onClick={() => setFacebookpage('')}>
                                + Legg til adresser for Facebook, LinkedIn og Twitter
                            </Flatknapp>
                        </Column>
                    </Row>
                ) : (
                    <div>
                        <Skjemalabel
                            inputId="endre-stilling-facebook"
                            beskrivelse="For eksempel: facebook.com/firmanavn"
                        >
                            Bedriftens side på Facebook
                        </Skjemalabel>
                        <Input
                            className="blokk-xs"
                            id="endre-stilling-facebook"
                            aria-describedby="endre-stilling-facebook-beskrivelse"
                            value={facebookpage || ''}
                            onChange={(e) => {
                                setFacebookpage(e.target.value);
                            }}
                            onBlur={completeFacebookLink}
                        />
                        <Skjemalabel
                            inputId="endre-stilling-linkedin"
                            beskrivelse="For eksempel: linkedin.com/company/firmanavn"
                        >
                            Bedriftens side på LinkedIn
                        </Skjemalabel>
                        <Input
                            className="blokk-xs"
                            id="endre-stilling-linkedin"
                            aria-describedby="endre-stilling-linkedin-beskrivelse"
                            value={linkedinpage || ''}
                            onChange={(e) => {
                                setLinkedinpage(e.target.value);
                            }}
                            onBlur={completeLinkedinLink}
                        />
                        <Skjemalabel
                            inputId="endre-stilling-twitter"
                            beskrivelse="For eksempel: @firmanavn"
                        >
                            Bedriftens Twitteradresse
                        </Skjemalabel>
                        <Input
                            className="blokk-xs"
                            id="endre-stilling-twitter"
                            aria-describedby="endre-stilling-twitter-beskrivelse"
                            value={twitteraddress || ''}
                            onChange={(e) => {
                                setTwitteraddress(e.target.value);
                            }}
                            onBlur={completeTwitterLink}
                        />
                    </div>
                )}
            </Accordion.Content>
        </>
    );
};

function adjustTwitterLink(url: string) {
    if (url.startsWith('@')) {
        return `https://twitter.com/${url}`;
    } else if (!url.startsWith('http')) {
        return `https://${url}`;
    }
    return url;
}

export default EndreArbeidsgiver;
