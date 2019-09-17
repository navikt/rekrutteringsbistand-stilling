import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element, Normaltekst } from 'nav-frontend-typografi';

class Publishing extends React.Component {

  render() {
    const { published, expires } = this.props;

    return(
      <div>
              <div>
                  {(published || expires) && (
                    <Element>Publisering</Element>
                  )}
                  { published && (
                    <Normaltekst>
                    Publiseringsdato: {published.substring(0,10)} 
                    </Normaltekst>
                   )}
                   { expires && (
                    <Normaltekst>
                    Siste visningsdato: {expires.substring(0,10)} 
                    </Normaltekst>
                   )}
              </div>
      </div>)
  }
}

Publishing.defaultProps = {
  published: undefined,
  expires: undefined
};

Publishing.propTypes = {
  published: PropTypes.string,
  expires: PropTypes.string
};

const mapStateToProps = (state) => ({
  published: state.adData.published,
  expires: state.adData.expires
});

export default connect(mapStateToProps)(Publishing); 