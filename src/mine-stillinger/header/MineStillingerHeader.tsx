import React, { ReactNode } from 'react';
import css from './MineStillingerHeader.module.css';
import { Heading } from '@navikt/ds-react';
import '@navikt/ds-css';

type Props = {
    children: ReactNode;
};

const MineStillingerHeader = ({ children }: Props) => (
    <div className={css.mineStillingerHeader}>
        <div className={css.container}>
            <Heading level="1" size="xlarge">
                Mine stillinger
            </Heading>
            <div>{children}</div>
        </div>
    </div>
);

export default MineStillingerHeader;
