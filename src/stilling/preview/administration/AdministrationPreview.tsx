import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdStatus from '../../administration/adStatus/AdStatus';
import { EDIT_AD } from '../../adReducer';
import Inkludering from './vis-inkluderingsmuligheter-ekstern-stilling/VisInkuderingsmuligheterForEksternStilling';
import Publishing from './publishing/Publishing';
import ContactInfo from './contact/ContactInfo';
import Notat from './notat/Notat';

import css from './AdministrationPreview.module.css';
import { erDirektemeldtStilling } from '../../adUtils';
import Kategori from './kategori/Kategori';
import { Button } from '@navikt/ds-react';

const AdministrationPreview = () => {
    const dispatch = useDispatch();

    const source = useSelector((state: any) => state.adData.source);

    const limitedAccess =
        useSelector((state: any) => state.adData.createdBy) !== 'pam-rekrutteringsbistand';

    return (
        <div>
            <div>
                <AdStatus />
            </div>
            <div>
                <div className={css.previewPanel}>
                    <Publishing />
                </div>
                <div className={css.previewPanel}>
                    <Kategori />
                </div>
                <ContactInfo />
                {!erDirektemeldtStilling(source) && <Inkludering />}
                <div className={css.previewPanel}>
                    <Notat />
                </div>
                {limitedAccess && (
                    <Button
                        variant="primary"
                        onClick={() => dispatch({ type: EDIT_AD })}
                        className={css.previewPanelButton}
                    >
                        Rediger
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AdministrationPreview;
