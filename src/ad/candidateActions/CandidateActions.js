import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AWithIcon from '../../common/aWithIcon/AWithIcon';
import { SHOW_HAS_CHANGES_MODAL } from '../adReducer';
import LeggTilKandidatModal from '../kandidatModal/LeggTilKandidatModal';
import ButtonWithIcon from '../../common/buttonWithIcon/ButtonWithIcon';
import './CandidateActions.less';


class CandidateActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showKandidatModal: false
        };
    }

    onNavigationClick = (url) => (e) => {
        if (this.props.hasChanges) {
            e.preventDefault();
            this.props.showHasChangesModal(url);
        }
    };

    toggleKandidatModal = () => {
        this.setState({
            showKandidatModal: !this.state.showKandidatModal
        });
    };

    render() {
        const { uuid, source, publishedByAdmin, id } = this.props.ad;
        const showCandidateLinks = publishedByAdmin && source === 'DIR';

        return (
            <div className="CandidateActions">
                {this.state.showKandidatModal && (
                    <LeggTilKandidatModal
                        vis={this.state.showKandidatModal}
                        onClose={this.toggleKandidatModal}
                        stillingsId={id}
                    />
                )}
                {showCandidateLinks && (
                    <AWithIcon
                        href={`/kandidater/stilling/${uuid}`}
                        onClick={this.onNavigationClick(`/kandidater/stilling/${uuid}`)}
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
                    <AWithIcon
                        href={`/kandidater/lister/stilling/${uuid}/detaljer`}
                        onClick={this.onNavigationClick(`/kandidater/lister/stilling/${uuid}/detaljer`)}
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
        id: PropTypes.string
    }).isRequired,
    hasChanges: PropTypes.bool.isRequired,
    showHasChangesModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    ad: state.adData,
    hasChanges: state.ad.hasChanges
});

const mapDispatchToProps = (dispatch) => ({
    showHasChangesModal: (leaveUrl) => dispatch({ type: SHOW_HAS_CHANGES_MODAL, leaveUrl })
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateActions);
