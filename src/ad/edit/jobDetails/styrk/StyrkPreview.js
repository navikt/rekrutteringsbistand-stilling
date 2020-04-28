import React from 'react';
import { connect } from 'react-redux';
import { Element, Normaltekst } from 'nav-frontend-typografi';

function StyrkPreview({ categoryList }) {
    return (
        <div className="StyrkPreview">
            <Element>Yrke</Element>
            {categoryList && categoryList.length > 0 ? (
                categoryList.map((styrk) => (
                    <Normaltekst key={styrk.code}>
                        {styrk.code}: {styrk.name}
                    </Normaltekst>
                ))
            ) : (
                <Normaltekst>Mangler</Normaltekst>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    categoryList: state.adData.categoryList,
});

export default connect(mapStateToProps)(StyrkPreview);
