import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import './ContactInfo.less';

class ContactInfo extends React.Component {

  render() {
    const { stilling, recruitment } = this.props;
    const isDir = (stilling && stilling.source === 'DIR');
    const hasRecruitment = recruitment && recruitment.overfoertTil;
    const { reportee, navIdent } = stilling.administration;
    const contact = stilling.contactList && stilling.contactList.length ? stilling.contactList[0] : undefined;

    return isDir ?
    <div className="ContactInfo__preview">
        <Element>Spørsmål om stillingen?</Element>
        <Normaltekst>
          Kontaktperson hos NAV: {reportee} {navIdent ? ` (${navIdent})` : ''}
        </Normaltekst>
        {contact && contact.email && 
        <Normaltekst>
          E-post: {contact.email}
        </Normaltekst>}
        {contact && contact.phone && 
        <Normaltekst>
          Telefon: {contact.phone}
        </Normaltekst>}
      </div> : 
      <div className="ContactInfo__preview">
        {hasRecruitment && (
          <Normaltekst>
            Kontaktperson hos NAV: todo {recruitment.overfoertTil ? ` (${recruitment.overfoertTil})` : ''}
          </Normaltekst>
        )}
      </div>
  }
}

ContactInfo.defaultProps = {
  stilling: undefined,
  recruitment: undefined
}

ContactInfo.propTypes = {
  stilling: PropTypes.shape({
    source: PropTypes.string,
    administration: PropTypes.shape({
      reportee: PropTypes.string,
      navIdent: PropTypes.string
    })
  }),
  recruitment: PropTypes.shape({
    stillingUuid: PropTypes.string,
    overfoertTil: PropTypes.string
  })
}

const mapStateToProps = (state) => ({
  stilling: state.adData,
  recruitment: state.recruitmentData
});

export default connect(mapStateToProps)(ContactInfo); 
