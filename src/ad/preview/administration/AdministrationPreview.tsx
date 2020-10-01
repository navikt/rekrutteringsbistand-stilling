import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import AdStatus from '../../administration/adStatus/AdStatus';
import { EDIT_AD } from '../../adReducer';
import Inkludering from './inkludering/Inkludering';
import Publishing from './publishing/Publishing';
import ContactInfo from './contact/ContactInfo';
import Notat from './notat/Notat';

import './AdministrationPreview.less';
import { erDirektemeldtStilling } from '../../adUtils';

type Props = {
    source: string;
    createdBy: string;
    editAd: () => void;
};

const AdministrationPreview: FunctionComponent<Props> = ({ source, createdBy, editAd }) => {
    const limitedAccess = createdBy !== 'pam-rekrutteringsbistand';

    return (
        <div className="Preview__Administration">
            <div className="Administration__flex">
                <div className="Administration__flex__top">
                    <AdStatus />
                </div>
                <div className="Administration__flex__center">
                    <div className="Administration__preview-panel">
                        <Publishing />
                    </div>
                    <div className="Administration__preview-panel">
                        <ContactInfo />
                    </div>
                    {!erDirektemeldtStilling(source) && <Inkludering />}
                    <div className="Administration__preview-panel">
                        <Notat />
                    </div>
                    {limitedAccess && (
                        <div className="Administration__preview-panel">
                            <Hovedknapp className="Ad__actions-button" onClick={editAd} mini>
                                Rediger
                            </Hovedknapp>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    source: state.adData.source,
    createdBy: state.adData.createdBy,
});

const mapDispatchToProps = (dispatch: any) => ({
    editAd: () => dispatch({ type: EDIT_AD }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministrationPreview);
