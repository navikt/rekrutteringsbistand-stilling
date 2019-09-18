import React from 'react';
import { connect } from 'react-redux';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import './ContactInfo.less';

class ContactInfo extends React.Component {

  render() {
    const { stilling } = this.props;
    const showContactHelp = (stilling && stilling.source === 'DIR');
    const { reportee, navIdent } = stilling.administration;
    const contact = stilling.contactList && stilling.contactList.length ? stilling.contactList[0] : undefined;

    return showContactHelp ?
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
      </div> : ''
  }
}

const mapStateToProps = (state) => ({
  stilling: state.adData
});

export default connect(mapStateToProps)(ContactInfo); 