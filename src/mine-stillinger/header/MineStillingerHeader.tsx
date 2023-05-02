import React from 'react';
import css from './MineStillingerHeader.module.css';
import { Button, Heading } from '@navikt/ds-react';

type Props = {
    opprettStilling: () => void;
};

const MineStillingerHeader = ({ opprettStilling }: Props) => (
    <div className={css.header}>
        <div className={css.innhold}>
            <Heading level="1" size="xlarge">
                Mine stillinger
            </Heading>
            <Button onClick={opprettStilling}>Opprett ny</Button>
        </div>
    </div>
);

export default MineStillingerHeader;
