import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';

function StyrkPreview({ categoryList }) {
    return (
        <div className="StyrkPreview">
            {categoryList && categoryList.length > 0 && categoryList.map((styrk) => (
                <Normaltekst key={styrk.code}>
                    {styrk.code}: {styrk.name}
                </Normaltekst>
            ))}
        </div>
    );
}

const mapStateToProps = (state) => ({
    categoryList: state.adData.categoryList
});

export default connect(mapStateToProps)(StyrkPreview);
