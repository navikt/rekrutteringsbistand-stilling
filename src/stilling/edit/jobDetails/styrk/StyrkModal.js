import { Flatknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { RESET_STYRK_THREE, SET_STRYK_SEARCH_STRING, TOGGLE_STYRK_MODAL } from './styrkReducer';
import StyrkThree from './StyrkThree';
import './StyrkModal.less';
import ModalMedStillingScope from '../../../../common/ModalMedStillingScope';

class StyrkModal extends React.Component {
    onInputChange = (e) => {
        this.props.setStyrkSearchString(e.target.value);
    };

    onResetStyrkThree = () => {
        this.props.resetStyrkThree();
    };

    render() {
        return (
            <ModalMedStillingScope
                className="StyrkModal"
                contentClass="StyrkModal__content"
                isOpen
                onRequestClose={this.props.toggleList}
                contentLabel="Søk etter STYRK"
                appElement={document.getElementById('app')}
            >
                <div className="StyrkModal__header">
                    <Undertittel className="StyrkModal__header__title">Velg STYRK</Undertittel>
                    <div className="StyrkModal__header__flex">
                        <Input
                            className="StyrkModal__header__search"
                            placeholder="Søk (to eller flere tegn)"
                            label=""
                            value={this.props.styrkSearchString}
                            onChange={this.onInputChange}
                        />
                        <Flatknapp mini onClick={this.onResetStyrkThree}>
                            Nullstill
                        </Flatknapp>
                    </div>
                </div>
                <div className="StyrkModal__body">
                    <StyrkThree />
                </div>
            </ModalMedStillingScope>
        );
    }
}

StyrkModal.defaultProps = {
    styrkSearchString: '',
};

StyrkModal.propTypes = {
    setStyrkSearchString: PropTypes.func.isRequired,
    resetStyrkThree: PropTypes.func.isRequired,
    styrkSearchString: PropTypes.string,
    toggleList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    styrkSearchString: state.styrk.styrkSearchString,
});

const mapDispatchToProps = (dispatch) => ({
    setStyrkSearchString: (value) => dispatch({ type: SET_STRYK_SEARCH_STRING, value }),
    resetStyrkThree: () => dispatch({ type: RESET_STYRK_THREE }),
    toggleList: () => dispatch({ type: TOGGLE_STYRK_MODAL }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyrkModal);
