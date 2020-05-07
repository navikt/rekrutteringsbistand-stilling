/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import './EditHeader.less';
import { DEFAULT_TITLE_NEW_AD } from '../../adReducer';
import { SET_AD_TITLE } from '../../adDataReducer';
import { createErrorObject } from '../../../common/utils';
import CandidateActions from '../../candidateActions/CandidateActions';
import Alertstripe from 'nav-frontend-alertstriper';
import { hentAnnonselenke, stillingErPublisert } from '../../adUtils';
import KopierTekst from '../../kopierTekst/KopierTekst';

class EditHeader extends React.Component {
    onTitleChange = (e) => {
        this.props.setAdTitle(e.target.value.replace(/^\s+/g, '')); // Regex for å fjerne whitespace
    };

    getAdTitle = () => {
        // Hack for hiding the default title coming from backend
        if (this.props.ad.title === DEFAULT_TITLE_NEW_AD) {
            return '';
        }
        return this.props.ad.title || '';
    };

    render() {
        const { onPreviewAdClick, validation, ad } = this.props;
        const limitedAccess = ad.createdBy !== 'pam-rekrutteringsbistand';
        const stillingsLenke = hentAnnonselenke(ad.uuid);

        return (
            <div>
                <div className="Ad__actions">
                    <CandidateActions />
                    <div>
                        {!limitedAccess && (
                            <Knapp className="Ad__actions-button" onClick={onPreviewAdClick} mini>
                                Forhåndsvis stillingen
                            </Knapp>
                        )}
                        {stillingErPublisert(ad) && (
                            <KopierTekst
                                className=""
                                tooltipTekst="Kopier stillingslenke"
                                skalKopieres={stillingsLenke}
                            />
                        )}
                    </div>
                </div>
                {limitedAccess && (
                    <div className="Ad__info">
                        <Alertstripe
                            className="AdStatusPreview__Alertstripe"
                            type="info"
                            solid="true"
                        >
                            Dette er en eksternt utlyst stilling. Du kan <b>ikke</b> endre
                            stillingen.
                        </Alertstripe>
                    </div>
                )}
                <Input
                    inputClassName="EditHeader__AdTitle"
                    label={<Element>Overskrift på annonsen* </Element>}
                    value={this.getAdTitle()}
                    placeholder="For eksempel: engasjert barnehagelærer til Oslo-skole"
                    onChange={this.onTitleChange}
                    feil={createErrorObject(validation.title)}
                />
                <Normaltekst className="blokk-xs">* felter du må fylle ut</Normaltekst>
            </div>
        );
    }
}

EditHeader.propTypes = {
    ad: PropTypes.shape({
        title: PropTypes.string,
        uuid: PropTypes.string,
        source: PropTypes.string,
    }).isRequired,
    onPreviewAdClick: PropTypes.func.isRequired,
    setAdTitle: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
};

const mapStateToProps = (state) => ({
    ad: state.adData,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    setAdTitle: (title) => dispatch({ type: SET_AD_TITLE, title }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditHeader);
