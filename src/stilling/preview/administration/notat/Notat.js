import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Element } from 'nav-frontend-typografi';
import ProcessString from 'react-process-string';
import './Notat.less';

class Notat extends React.Component {
    process = () => {
        const { notat } = this.props;

        const config = [
            {
                regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.)/gim,
                fn: (key, result) => (
                    <span key={key} className="Notat__text__link">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}
                        >
                            {result[2]}.{result[3]}
                            {result[4]}
                        </a>
                        {result[5]}
                    </span>
                ),
            },
        ];

        return ProcessString(config)(notat);
    };

    render() {
        const notat =
            this.props.notat && this.props.notat.length
                ? this.process()
                : 'Det er ikke lagt inn notater.';

        return (
            <div className="Notat__preview">
                <Element>Notater</Element>
                <p className="typo-normal Notat__text">{notat}</p>
            </div>
        );
    }
}

Notat.defaultProps = {
    notat: undefined,
};

Notat.propTypes = {
    notat: PropTypes.string,
};

const mapStateToProps = (state) => ({
    notat: state.stillingsinfoData.notat,
});

export default connect(mapStateToProps)(Notat);
