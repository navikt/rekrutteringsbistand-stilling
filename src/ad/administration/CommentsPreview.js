import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element, Normaltekst } from 'nav-frontend-typografi';

function CommentsPreview({ comments }) {
    return (
        <div className="CommentsPreview">
            <Element>Kommentarer</Element>
            <Normaltekst>{comments || 'Ingen kommentrarer'}</Normaltekst>
        </div>
    );
}

CommentsPreview.defaultProps = {
    comments: undefined
};

CommentsPreview.propTypes = {
    comments: PropTypes.string
};

const mapStateToProps = (state) => ({
    comments: state.adData.administration.comments
});

export default connect(mapStateToProps)(CommentsPreview);
