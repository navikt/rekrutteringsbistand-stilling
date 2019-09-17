import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import ProcessString from 'react-process-string';

class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    process = () => {
        const { comments } = this.props;

        const config = [{
            regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
            fn: (key, result) => <span key={key}>
                                     <a target="_blank" href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}>{result[2]}.{result[3]}{result[4]}</a>{result[5]}
                                 </span>
        }];
        
        return ProcessString(config)(comments);
    }
    

    render() {
        const { comments } = this.props;
        if(!comments) {
            return <div/>
        }

        const comment = this.process();
        return (
            <div>
                <Element>Notater</Element>
                <p className="typo-normal Comment__text">{comment}</p>
            </div>
            )}
}

Comment.defaultProps = {
    comments: undefined
};

Comment.propTypes = {
    comments: PropTypes.string
};

const mapStateToProps = (state) => ({
    comments: state.adData.administration.comments
});

export default connect(mapStateToProps)(Comment);
