import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NOTAT } from '../../../stillingsinfo/stillingsinfoDataReducer';
import { MAX_LENGTH_NOTAT } from '../../adValidationReducer';
import { Detail, Heading, Textarea } from '@navikt/ds-react';

const Notat = ({ placeholder }) => {
    const lagretNotat = useSelector((state: any) => state.stillingsinfoData.notat);
    const validation = useSelector((state: any) => state.adValidation.errors);
    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const [notat, setNotat] = useState<string>(lagretNotat);

    const dispatch = useDispatch();

    const onChange = (e) => {
        setHasChanged(true);
        setNotat(e.target.value);
        dispatch({
            type: SET_NOTAT,
            notat: e.target.value,
        });
    };

    const onBlur = () => {
        if (hasChanged) {
            setHasChanged(false);
            dispatch({
                type: SET_NOTAT,
                notat,
            });
        }
    };

    const label = (
        <>
            <Heading level="2" size="xsmall" spacing>
                Notater
            </Heading>
            <Detail>
                Notat, vises kun internt
                <br />
                Ikke skriv personopplysninger her
            </Detail>
        </>
    );

    return (
        <div>
            <Textarea
                maxLength={MAX_LENGTH_NOTAT}
                onChange={onChange}
                onBlur={onBlur}
                value={lagretNotat}
                error={validation.notat}
                label={label}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Notat;
