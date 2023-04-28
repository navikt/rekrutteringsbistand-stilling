import { Retning } from './tabell/Retning';

export enum MineStillingerSorteringsfelt {
    SistEndretTidspunkt = 'updated',
    Stillingstittel = 'title',
    Arbeidsgiver = 'employerName',
    Utløpsdato = 'expires',
    Publisert = 'privacy',
}

export type MineStillingerSortering = {
    felt: MineStillingerSorteringsfelt;
    retning: Retning;
};
