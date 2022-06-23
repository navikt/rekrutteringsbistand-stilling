import React, { FunctionComponent } from 'react';
import LenkeMedIkon from '../../common/lenke-med-ikon/LenkeMedIkon';

type Props = {
    stillingsId: string;
};

const ForeslåKandidaterLenke: FunctionComponent<Props> = ({ stillingsId }) => {
    return (
        <LenkeMedIkon
            href={`/prototype/stilling/${stillingsId}`}
            classNameText="typo-element"
            classNameLink="Ad__actions-link CandidateList"
            text="Foreslå kandidater"
        />
    );
};

export default ForeslåKandidaterLenke;
