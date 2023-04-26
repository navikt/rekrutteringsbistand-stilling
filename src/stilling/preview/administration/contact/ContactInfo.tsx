import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    MARKER_EKSTERN_STILLING_SOM_MIN,
    MARKER_INTERN_STILLING_SOM_MIN,
} from '../../../adReducer';
import { erDirektemeldtStilling } from '../../../adUtils';
import MarkerSomMinModal from '../markerSomMinModal/MarkerSomMinModal';
import { BodyShort, Button, Label } from '@navikt/ds-react';

const ContactInfo = () => {
    const dispatch = useDispatch();
    const stilling = useSelector((state: any) => state.adData);
    const stillingsinfo = useSelector((state: any) => state.stillingsinfoData);
    const innlogget = useSelector((state: any) => state.reportee.data);

    const [markerSomMinStillingModalErÅpen, setMarkerSomMinStillingModalErÅpen] = useState(false);

    const onMarkerSomMinKlikkEksternStilling = () => {
        dispatch({ type: MARKER_EKSTERN_STILLING_SOM_MIN });
        setMarkerSomMinStillingModalErÅpen(false);
    };

    const onMarkerSomMinKlikkInternStilling = () => {
        dispatch({ type: MARKER_INTERN_STILLING_SOM_MIN });
        setMarkerSomMinStillingModalErÅpen(false);
    };

    const isDir = stilling && erDirektemeldtStilling(stilling.source);
    const hasStillingsinfo = stillingsinfo && stillingsinfo.eierNavident;
    const { reportee, navIdent } = stilling.administration;

    const markerSomMinKnappOgModal = () => (
        <>
            <Button
                variant="secondary"
                size="small"
                onClick={() => setMarkerSomMinStillingModalErÅpen(true)}
            >
                Marker som min
            </Button>
            <MarkerSomMinModal
                erÅpen={markerSomMinStillingModalErÅpen}
                onAvbryt={() => setMarkerSomMinStillingModalErÅpen(false)}
                onMarkerSomMin={
                    isDir ? onMarkerSomMinKlikkInternStilling : onMarkerSomMinKlikkEksternStilling
                }
            />
        </>
    );

    return isDir ? (
        <div className="Administration__preview-panel">
            <BodyShort size="small" spacing>
                <Label size="small">Spørsmål om stillingen?</Label>
            </BodyShort>
            <BodyShort size="small" spacing>
                Kontaktperson hos NAV: {reportee} {navIdent ? ` (${navIdent})` : ''}
            </BodyShort>
            {innlogget &&
                innlogget.navIdent !== stilling.administration.navIdent &&
                markerSomMinKnappOgModal()}
        </div>
    ) : (
        <>
            {hasStillingsinfo && (
                <div className="Administration__preview-panel">
                    <BodyShort size="small" spacing>
                        <Label size="small">Spørsmål om stillingen?</Label>
                    </BodyShort>
                    <BodyShort size="small" spacing>
                        Kontaktperson hos NAV: {stillingsinfo.eierNavn}{' '}
                        {stillingsinfo.eierNavident ? ` (${stillingsinfo.eierNavident})` : ''}
                    </BodyShort>
                    {(!stillingsinfo.eierNavident ||
                        (innlogget && stillingsinfo.eierNavident !== innlogget.navIdent)) &&
                        markerSomMinKnappOgModal()}
                </div>
            )}
        </>
    );
};

export default ContactInfo;
