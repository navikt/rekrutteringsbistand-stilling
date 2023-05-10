import { useEffect } from 'react';
import {
    UNSAFE_useDatepicker as useDatepicker,
    UNSAFE_DatePicker as Datepicker,
} from '@navikt/ds-react';

type Props = {
    dato?: string;
    onChange: (dato?: Date) => void;
    label: string;
    disabled?: boolean;
    fromDate?: Date;
};

const Datovelger = ({ dato, onChange, label, disabled, fromDate }: Props) => {
    const aktuellVerdi = disabled ? undefined : dato;
    const aktuellVerdiSomDate = aktuellVerdi ? new Date(aktuellVerdi) : undefined;

    const { datepickerProps, inputProps, selectedDay } = useDatepicker({
        defaultSelected: aktuellVerdiSomDate,
        fromDate,
    });

    const { datepickerProps: disabledDatepickerProps, inputProps: disabledInputProps } =
        useDatepicker({
            defaultSelected: undefined,
        });

    useEffect(() => {
        if (!disabled) {
            onChange(selectedDay);
        }
    }, [selectedDay, disabled, onChange]);

    return (
        <Datepicker {...(disabled ? disabledDatepickerProps : datepickerProps)}>
            <Datepicker.Input
                {...(disabled ? disabledInputProps : inputProps)}
                hideLabel
                label={label}
                disabled={disabled}
                placeholder="dd.mm.åååå"
            />
        </Datepicker>
    );
};

export default Datovelger;
