import React, { ChangeEvent, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { SET_CONTACT_PERSON } from '../../adDataReducer';
import {
    VALIDATE_CONTACTPERSON_EMAIL_AND_PHONE,
    VALIDATE_CONTACTPERSON_NAME,
    VALIDATE_CONTACTPERSON_TITLE,
    ValidertFelt,
} from '../../adValidationReducer';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { State } from '../../../redux/store';
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import { Kontaktinfo } from '../../../Stilling';
import './ContactPerson.less';

type Props = {
    contactList?: Kontaktinfo[];
    setContactPerson: (kontaktperson: any) => void;
    validateEmailAndPhone: () => void;
    validateTitle: () => void;
    validateName: () => void;
    validation: Record<ValidertFelt, string | undefined>;
};

const ContactPerson: FunctionComponent<Props> = ({
    contactList,
    setContactPerson,
    validateEmailAndPhone,
    validateTitle,
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

    const kontaktperson = contactList && contactList[0];

    return (
        <>
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
                feil={validation.contactPersonTitle}
                onBlur={validateTitle}
            />
            <SkjemaGruppe
                legend={
                    <h3 className="contact-person__epost-og-telefon-overskrift">
                        <Element tag="div">E-postadresse og/eller telefonnummer</Element>
                        <Normaltekst tag="div">(minst én må fylles ut)</Normaltekst>
                    </h3>
                }
                feil={validation.contactPersonEmailOrPhone}
            >
                <Input
                    className="blokk-xs"
                    type="email"
                    label="E-postadresse"
                    value={kontaktperson?.email ?? ''}
                    onChange={onEmailChange}
                    onBlur={validateEmailAndPhone}
                    feil={validation.contactPersonEmail}
                />
                <Input
                    className="blokk-xs"
                    type="tel"
                    label="Telefonnummer"
                    value={kontaktperson?.phone ?? ''}
                    onBlur={validateEmailAndPhone}
                    feil={validation.contactPersonPhone}
                    onChange={onPhoneChange}
                />
            </SkjemaGruppe>
        </>
    );
};

const mapStateToProps = (state: State) => ({
    contactList: state.adData?.contactList,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    setContactPerson: (contactPerson: any) => dispatch({ type: SET_CONTACT_PERSON, contactPerson }),
    validateEmailAndPhone: () => dispatch({ type: VALIDATE_CONTACTPERSON_EMAIL_AND_PHONE }),
    validateTitle: () => dispatch({ type: VALIDATE_CONTACTPERSON_TITLE }),
    validateName: () => dispatch({ type: VALIDATE_CONTACTPERSON_NAME }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPerson);
