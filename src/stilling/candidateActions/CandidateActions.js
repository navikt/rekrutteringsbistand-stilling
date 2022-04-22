import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LenkeMedIkon from '../../common/lenke-med-ikon/LenkeMedIkon.tsx';
import LeggTilKandidatModal from '../legg-til-kandidat-modal/LeggTilKandidatModal';
import ButtonWithIcon from '../../common/buttonWithIcon/ButtonWithIcon';
import { erDirektemeldtStilling } from '../adUtils';
import { sendGenerellEvent } from '../../verktøy/amplitude';
import './CandidateActions.less';

class CandidateActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showKandidatModal: false,
        };
    }

    toggleKandidatModal = () => {
        this.setState({
            showKandidatModal: !this.state.showKandidatModal,
        });
    };

    loggKnappeklikk = () => {
        sendGenerellEvent('knapp', {
            label: 'Se kandidater',
        });
    };

    render() {
        const { uuid, source, publishedByAdmin } = this.props.ad;
        const { stillingsinfo } = this.props;

        const showCandidateLinks =
            (publishedByAdmin && erDirektemeldtStilling(source)) || stillingsinfo.eierNavident;

        return (
            <div className="CandidateActions">
                {this.state.showKandidatModal && (
                    <LeggTilKandidatModal
                        vis={this.state.showKandidatModal}
                        onClose={this.toggleKandidatModal}
                        stillingsId={uuid}
                    />
                )}
                {showCandidateLinks && (
                    <LenkeMedIkon
                        href={`/kandidater/stilling/${uuid}`}
                        classNameText="typo-element"
                        classNameLink="Ad__actions-link FindCandidate"
                        text="Finn kandidater"
                    />
                )}
                {showCandidateLinks && (
                    <ButtonWithIcon
                        onClick={this.toggleKandidatModal}
                        classNameText="typo-element"
                        classNameButton="Ad__actions-link AddCandidate"
                        text="Legg til kandidat"
                    />
                )}
                {showCandidateLinks && (
                    <LenkeMedIkon
                        onClick={this.loggKnappeklikk}
                        href={`/kandidater/lister/stilling/${uuid}/detaljer`}
                        classNameText="typo-element"
                        classNameLink="Ad__actions-link CandidateList"
                        text="Se kandidatliste"
                    />
                )}
            </div>
        );
    }
}

CandidateActions.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        source: PropTypes.string,
        publishedByAdmin: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
    hasChanges: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    ad: state.adData,
    hasChanges: state.ad.hasChanges,
    stillingsinfo: state.stillingsinfoData,
});

export default connect(mapStateToProps)(CandidateActions);
