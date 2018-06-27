import React from 'react';
import ListBox from './ListBox';
import { arrayHasData } from './utils';

export default function HardRequirements({ stilling }) {
    if (arrayHasData(stilling.properties.hardrequirements)) {
        return (
            <ListBox
                title="Krav (kvalifikasjoner)"
                items={stilling.properties.hardrequirements}
            />
        );
    }
    return null;
}
