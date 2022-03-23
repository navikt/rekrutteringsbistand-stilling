import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { formatISOString } from '../../../../utils/datoUtils.ts';
import './Publishing.less';

class Publishing extends React.Component {
    render() {
        const { published, expires } = this.props;

        return (
            <div>
                <div className="Publishing__preview">
                    {(published || expires) && <Element>Publisering</Element>}
                    {published && (
                        <Normaltekst>Publiseringsdato: {formatISOString(published)}</Normaltekst>
                    )}
                    {expires && (
                        <Normaltekst>Siste visningsdato: {formatISOString(expires)}</Normaltekst>
                    )}
                </div>
            </div>
        );
    }
}

Publishing.defaultProps = {
    published: undefined,
    expires: undefined,
};

Publishing.propTypes = {
    published: PropTypes.string,
    expires: PropTypes.string,
};

const mapStateToProps = (state) => ({
    published: state.adData.published,
    expires: state.adData.expires,
});

export default connect(mapStateToProps)(Publishing);
