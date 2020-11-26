import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AlertStripeAdvarsel, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { KandidatAlertStripeMode } from './kandidatReducer';
import './LeggTilKandidatAlertStripe.less';
import { Kandidat } from './LeggTilKandidatModal';

type Props = {
    showAlertStripe: boolean;
    alertStripeMode: string;
    kandidat?: Kandidat;
    fodselsnummer?: string;
};

const LeggTilKandidatAlertStripe: FunctionComponent<Props> = ({
    showAlertStripe,
    alertStripeMode,
    kandidat,
    fodselsnummer,
}) => {
    if (showAlertStripe && alertStripeMode === KandidatAlertStripeMode.SAVED) {
        const fornavn = kandidat?.fornavn || '';
        const etternavn = kandidat?.etternavn || '';
        return (
            <AlertStripeSuksess className="LeggTilKandidatAlertStripe">
                {`${fornavn} ${etternavn} (${fodselsnummer}) er lagt til i kandidatlisten`}
            </AlertStripeSuksess>
        );
    } else if (showAlertStripe && alertStripeMode === KandidatAlertStripeMode.FAILURE) {
        return (
            <AlertStripeAdvarsel className="LeggTilKandidatAlertStripe">
                Kandidat kunne ikke legges til
            </AlertStripeAdvarsel>
        );
    }
    return <div />;
};

const mapStateToProps = (state: any) => ({
    showAlertStripe: state.kandidat.showAlertStripe,
    alertStripeMode: state.kandidat.alertStripeMode,
    kandidat: state.kandidat.kandidat,
    fodselsnummer: state.kandidat.fodselsnummer,
});

export default connect(mapStateToProps)(LeggTilKandidatAlertStripe);
