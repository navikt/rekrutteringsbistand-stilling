import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Faded.less';

export default class Faded extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            faded: true,
        };
    }

    componentDidMount() {
        this.fadeTimeout = setTimeout(() => {
            this.setState({
                faded: false,
            });
        }, 50);
    }

    componentWillUnmount() {
        clearTimeout(this.fadeTimeout);
    }

    render() {
        const { children } = this.props;
        return (
            <div className={classNames('Faded', { 'Faded--faded': this.state.faded })}>
                {children}
            </div>
        );
    }
}

Faded.defaultProps = {
    children: undefined,
};

Faded.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
