import React, { ChangeEvent, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { SET_CONTACT_PERSON } from '../../adDataReducer';
import {
    VALIDATE_CONTACTPERSON_EMAIL,
    VALIDATE_CONTACTPERSON_NAME,
    VALIDATE_CONTACTPERSON_PHONE,
} from '../../adValidationReducer';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './ContactPerson.less';
import State from '../../../State';
import Skjemalabel from '../skjemaetikett/Skjemalabel';

type Props = {
    contactList?: Array<{
        name: string;
        title: string;
        phone: string;
        email: string;
    }>;

    setContactPerson: (kontaktperson: any) => void;
    validateEmail: () => void;
    validatePhone: () => void;
    validateName: () => void;
    validation: {
        contactPersonEmail?: string;
        contactPersonPhone?: string;
        contactPersonName?: string;
    };
};

const ContactPerson: FunctionComponent<Props> = ({
    contactList,
    setContactPerson,
    validateEmail,
    validatePhone,
    validateName,
    validation,
}) => {
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContactPerson({
            name: e.target.value,
        });
    };

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContactPerson({
            title: e.target.value,
        });
    };

    const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContactPerson({
            phone: e.target.value,
        });
    };

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContactPerson({
            email: e.target.value,
        });
    };

    const onEmailBlur = () => {
        validateEmail();
    };

    const onPhoneBlur = () => {
        validatePhone();
    };

    const kontaktperson = contactList && contactList[0];

    return (
        <Ekspanderbartpanel
            className="Edit__panel"
            tittel={
                <>
                    <Undertittel className="blokk-xxxs">Kontaktinformasjon</Undertittel>
                </>
            }
            border
            apen
        >
            <Skjemalabel påkrevd inputId="endre-stilling-navn-kontaktperson">
                Navn på kontaktperson
            </Skjemalabel>
            <Input
                id="endre-stilling-navn-kontaktperson"
                className="blokk-xs"
                value={kontaktperson?.name ?? ''}
                onChange={onNameChange}
                feil={validation.contactPersonName}
                onBlur={validateName}
            />
            <Skjemalabel
                påkrevd
                inputId="endre-stilling-tittel-kontaktperson"
                beskrivelse="For eksempel: leder, NAV-ansatt"
            >
                Tittel på kontaktperson
            </Skjemalabel>
            <Input
                className="blokk-xs"
                id="endre-stilling-tittel-kontaktperson"
                aria-describedby="endre-stilling-tittel-kontaktperson-beskrivelse"
                value={kontaktperson?.title ?? ''}
                onChange={onTitleChange}
            />
            <SkjemaGruppe
                legend={
                    <h3 className="contact-person__epost-og-telefon-overskrift">
                        <Element tag="span">E-postadresse og/eller telefonnummer</Element>
                        <Normaltekst tag="span"> (minst én må fylles ut)</Normaltekst>
                    </h3>
                }
            >
                <Input
                    className="blokk-xs"
                    type="email"
                    label="E-postadresse"
                    value={kontaktperson?.email ?? ''}
                    onChange={onEmailChange}
                    onBlur={onEmailBlur}
                    feil={validation.contactPersonEmail}
                />
                <Input
                    className="blokk-xs"
                    type="tel"
                    label="Telefonnummer"
                    value={kontaktperson?.phone ?? ''}
                    onBlur={onPhoneBlur}
                    feil={validation.contactPersonPhone}
                    onChange={onPhoneChange}
                />
            </SkjemaGruppe>
        </Ekspanderbartpanel>
    );
};

const mapStateToProps = (state: State) => ({
    contactList: state.adData.contactList,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    setContactPerson: (contactPerson: any) => dispatch({ type: SET_CONTACT_PERSON, contactPerson }),
    validateEmail: () => dispatch({ type: VALIDATE_CONTACTPERSON_EMAIL }),
    validatePhone: () => dispatch({ type: VALIDATE_CONTACTPERSON_PHONE }),
    validateName: () => dispatch({ type: VALIDATE_CONTACTPERSON_NAME }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPerson);
