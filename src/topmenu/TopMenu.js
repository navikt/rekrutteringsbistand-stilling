import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Systemtittel } from 'nav-frontend-typografi';
import './TopMenu.less';
import ShortcutsInfo from '../common/shortcuts/ShortcutsInfo';
import { registerShortcuts, removeShortcuts } from '../common/shortcuts/Shortcuts';

class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    }

    componentDidMount() {
        registerShortcuts('global', {
            '?': () => {
                this.openModal();
            },
            'g i': () => {
                this.props.history.push('/');
            }
        });
    }

    componentWillUnmount() {
        removeShortcuts('global');
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render() {
        return (
            <div className="TopMenu">
                <Systemtittel className="TopMenu__title">NSS Admin</Systemtittel>
                <button type="button" className="TopMenu__shortcuts link" onClick={this.openModal}>
                    Hurtigtaster
                </button>
                <ShortcutsInfo closeModal={this.closeModal} isOpen={this.state.modalIsOpen} />
            </div>
        );
    }
}

TopMenu.propTypes = {
    history: PropTypes.shape().isRequired
};

export default withRouter(TopMenu);
