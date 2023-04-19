import React, { BaseSyntheticEvent, FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { leggTilTimerPåISOString } from '../../../utils/datoUtils';
import { SET_PUBLISHED, SET_EXPIRATION_DATE } from '../../adDataReducer';
import {
    BodyShort,
    UNSAFE_DatePicker as DatePicker,
    DateValidationT,
    Label,
    UNSAFE_useDatepicker as useDatepicker,
} from '@navikt/ds-react';
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
    const [publishDateInput, setPublishDateInput] = useState<Date | undefined>(new Date(published));
    const [expirationDateInput, setExpirationDateInput] = useState<Date | undefined>(
        new Date(expires)
    );

    const iGår = () => {
        const iGår = new Date();
        iGår.setDate(iGår.getDate() - 1);
        return iGår;
    };

    const onBlurPublishDate = (input: BaseSyntheticEvent) => {
        const dateString = input.target.value;

        if (!dateString || !publishDateInput) {
            setPublished(dateString);
            return;
        }
        setPublished(leggTilTimerPåISOString(publishDateInput.toISOString(), 3));
    };

    const onBlurExpirationDate = (input: BaseSyntheticEvent) => {
        const dateString = input.target.value;

        if (!dateString || !expirationDateInput) {
            setExpirationDate(dateString);
            return;
        }
        setExpirationDate(leggTilTimerPåISOString(expirationDateInput.toISOString(), 3));
    };

    const onPublishChange = (date: Date) => {
        setPublishDateInput(date);
    };

    const onValidatePublished = (validation: DateValidationT) => {
        if (validation.isBefore) {
            setPublishDateInput(new Date());
        }
    };

    const onExpirationDateChange = (date: Date) => {
        setExpirationDateInput(date);
    };

    const onValidateExpirationDate = (validation: DateValidationT) => {
        if (validation.isBefore) {
            setExpirationDateInput(iGår());
        }
    };

    const datepickerLabel = (tekst: string) => {
        return (
            <>
                <Label size="small" as="span">
                    {tekst}
                </Label>
                <BodyShort size="small" as="span">
                    {' '}
                    (må fylles ut)
                </BodyShort>
            </>
        );
    };

    const datePickerDefaultProps = {
        fromDate: new Date(),
        openOnFocus: false,
        inputFormat: 'dd.MM.yyyy',
        allowTwoDigitYear: false,
    };
    const datepickerPropsPublished = useDatepicker({
        ...datePickerDefaultProps,
        locale: 'nb',
        defaultSelected: new Date(published),
        onDateChange: onPublishChange,
        onValidate: onValidatePublished,
    });

    const datepickerPropsExpirationDate = useDatepicker({
        ...datePickerDefaultProps,
        locale: 'nb',
        defaultSelected: new Date(expires),
        onDateChange: onExpirationDateChange,
        onValidate: onValidateExpirationDate,
    });

    return (
        <div className="Publishing">
            <div className="Publishing__datepicker Publishing__datepicker-publishing-date">
                <DatePicker {...datepickerPropsPublished.datepickerProps}>
                    <DatePicker.Input
                        {...datepickerPropsPublished.inputProps}
                        onBlur={onBlurPublishDate}
                        error={validation.published}
                        label={datepickerLabel('Publiseringsdato')}
                        placeholder="dd.mm.yyyy"
                        size="small"
                    />
                </DatePicker>
            </div>
            <div className="Publishing__datepicker Publishing__datepicker-expires">
                <DatePicker {...datepickerPropsExpirationDate.datepickerProps}>
                    <DatePicker.Input
                        {...datepickerPropsExpirationDate.inputProps}
                        onBlur={onBlurExpirationDate}
                        error={validation.expires}
                        label={datepickerLabel('Siste visningsdato')}
                        placeholder="dd.mm.yyyy"
                        size="small"
                    />
                </DatePicker>
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
