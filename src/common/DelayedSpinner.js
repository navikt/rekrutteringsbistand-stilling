import React from 'react';
import Spinner from 'nav-frontend-spinner';

export default class DelayedSpinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
        };
    }

    componentDidMount() {
        this.spinnerTimeout = setTimeout(() => {
            this.setState({
                showSpinner: true,
            });
        }, 300);
    }

    componentWillUnmount() {
        clearTimeout(this.spinnerTimeout);
    }

    render() {
        if (this.state.showSpinner) {
            return <Spinner type="L" />;
        }
        return null;
    }
}
