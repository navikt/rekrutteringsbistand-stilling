import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Datepicker } from 'nav-datovelger';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import {
    fjernTidspunktFraISOString,
    isValidISOString,
    leggTilTimerPåISOString,
} from '../../../utils/datoUtils';
import { SET_PUBLISHED, SET_EXPIRATION_DATE } from '../../adDataReducer';
import Skjemalabel from '../../edit/skjemaetikett/Skjemalabel';
import { Label } from '@navikt/ds-react';
import './Publishing.less';

export type Validation = {
    expires: string;
    published: string;
};

type Props = {
    published: string;
    expires: string;
    setExpirationDate: (Date) => void;
    setPublished: (Date) => void;
    validation: Validation;
};

const Publishing: FunctionComponent<Props> = ({
    published,
    expires,
    setExpirationDate,
    setPublished,
    validation,
}) => {
    const onPublishedChange = (date) => {
        if (isValidISOString(date)) {
            setPublished(leggTilTimerPåISOString(date, 3));
        } else {
            setPublished(date);
        }
    };
    const onExpiresChange = (date) => {
        if (isValidISOString(date)) {
            setExpirationDate(leggTilTimerPåISOString(date, 3));
        } else {
            setExpirationDate(date);
        }
    };

    return (
        <div className="Publishing">
            <div className="Publishing__datepicker Publishing__datepicker-publishing-date">
                <Skjemalabel påkrevd>Publiseringsdato</Skjemalabel>
                <Normaltekst tag="div">
                    <Datepicker
                        locale="nb"
                        inputId="published__input"
                        inputProps={{
                            name: 'endre-stilling-datovelger-published',
                            placeholder: 'dd.mm.åååå',
                            'aria-label': 'Sett publiseringsdato',
                        }}
                        value={fjernTidspunktFraISOString(published)}
                        onChange={onPublishedChange}
                        limitations={{
                            minDate: fjernTidspunktFraISOString(new Date().toISOString()),
                        }}
                    />
                </Normaltekst>
                {validation.published && <Feilmelding>{validation.published}</Feilmelding>}
            </div>
            <div className="Publishing__datepicker Publishing__datepicker-expires">
                <Skjemalabel påkrevd>Siste visningsdato</Skjemalabel>
                <Normaltekst tag="div">
                    <Datepicker
                        locale="nb"
                        inputId="expires__input"
                        inputProps={{
                            name: 'endre-stilling-datovelger-expires',
                            placeholder: 'dd.mm.åååå',
                            'aria-label': 'Sett siste visningsdato',
                        }}
                        value={fjernTidspunktFraISOString(expires)}
                        onChange={onExpiresChange}
                        limitations={{
                            minDate: fjernTidspunktFraISOString(new Date().toISOString()),
                        }}
                    />
                </Normaltekst>
                {validation.expires && <Feilmelding>{validation.expires}</Feilmelding>}
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    published: state.adData.published,
    expires: state.adData.expires,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch: any) => ({
    setPublished: (published) => dispatch({ type: SET_PUBLISHED, published }),
    setExpirationDate: (expires) => dispatch({ type: SET_EXPIRATION_DATE, expires }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Publishing);
