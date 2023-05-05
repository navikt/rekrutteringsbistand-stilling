import React from 'react';
import { useDispatch } from 'react-redux';
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
import { formaterDataFraEnhetsregisteret } from '../../../opprett-ny-stilling/VelgArbeidsgiver';
import { BodyShort, Button, Label, TextField } from '@navikt/ds-react';
import Stilling from '../../../Stilling';
import css from './EndreArbeidsgiver.module.css';

type Props = {
    stilling: Stilling;
};

const EndreArbeidsgiver = ({ stilling }: Props) => {
    const { employerhomepage, facebookpage, linkedinpage, twitteraddress } = stilling.properties;

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
            {stilling.employer && (
                <div>
                    <Label size="small">Informasjon fra enhetsregisteret</Label>
                    <BodyShort size="small" spacing>
                        {formaterDataFraEnhetsregisteret(stilling.employer)}
                    </BodyShort>
                </div>
            )}

            <TextField
                id="endre-stilling-navnet-bedriften-bruker"
                className={css.blokk}
                label={
                    <Skjemalabel
                        inputId="endre-stilling-navnet-bedriften-bruker"
                        beskrivelse="Navnet bedriften bruker"
                    >
                        Navn på bedrift
                    </Skjemalabel>
                }
                aria-describedby="endre-stilling-navnet-bedriften-bruker-beskrivelse"
                value={stilling.properties.employer || stilling.businessName || ''}
                onChange={(e) => setEmployerName(e.target.value)}
            />
            <Skjemalabel
                inputId="endre-stilling-kort-om-bedriften"
                beskrivelse="Skriv noen linjer om bedriften"
            >
                Kort om bedriften
            </Skjemalabel>
            <div className={css.blokk}>
                <RichTextEditor
                    id="endre-stilling-kort-om-bedriften"
                    aria-describedby="endre-stilling-kort-om-bedriften-beskrivelse"
                    text={stilling.properties.employerdescription || ''}
                    onChange={(desc: string) => setEmployerDescription(desc)}
                />
            </div>

            <TextField
                id="endre-stilling-nettsted"
                className={css.blokk}
                label={
                    <Skjemalabel
                        inputId="endre-stilling-nettsted"
                        beskrivelse="For eksempel: www.firmanavn.no"
                    >
                        Bedriftens nettsted
                    </Skjemalabel>
                }
                aria-describedby="endre-stilling-nettsted-beskrivelse"
                value={employerhomepage || ''}
                onChange={(e) => setEmployerHomepage(e.target.value)}
                onBlur={completeHomepageLink}
            />
            {hideOnlineAddresses ? (
                <Button variant="tertiary" onClick={() => setFacebookpage('')}>
                    + Legg til adresser for Facebook, LinkedIn og Twitter
                </Button>
            ) : (
                <div>
                    <TextField
                        label={
                            <Skjemalabel
                                inputId="endre-stilling-facebook"
                                beskrivelse="For eksempel: facebook.com/firmanavn"
                            >
                                Bedriftens side på Facebook
                            </Skjemalabel>
                        }
                        id="endre-stilling-facebook"
                        className={css.blokk}
                        aria-describedby="endre-stilling-facebook-beskrivelse"
                        value={facebookpage || ''}
                        onChange={(e) => {
                            setFacebookpage(e.target.value);
                        }}
                        onBlur={completeFacebookLink}
                    />

                    <TextField
                        id="endre-stilling-linkedin"
                        className={css.blokk}
                        label={
                            <Skjemalabel
                                inputId="endre-stilling-linkedin"
                                beskrivelse="For eksempel: linkedin.com/company/firmanavn"
                            >
                                Bedriftens side på LinkedIn
                            </Skjemalabel>
                        }
                        aria-describedby="endre-stilling-linkedin-beskrivelse"
                        value={linkedinpage || ''}
                        onChange={(e) => {
                            setLinkedinpage(e.target.value);
                        }}
                        onBlur={completeLinkedinLink}
                    />

                    <TextField
                        id="endre-stilling-twitter"
                        className={css.blokk}
                        label={
                            <Skjemalabel
                                inputId="endre-stilling-twitter"
                                beskrivelse="For eksempel: @firmanavn"
                            >
                                Bedriftens Twitteradresse
                            </Skjemalabel>
                        }
                        aria-describedby="endre-stilling-twitter-beskrivelse"
                        value={twitteraddress || ''}
                        onChange={(e) => {
                            setTwitteraddress(e.target.value);
                        }}
                        onBlur={completeTwitterLink}
                    />
                </div>
            )}
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
