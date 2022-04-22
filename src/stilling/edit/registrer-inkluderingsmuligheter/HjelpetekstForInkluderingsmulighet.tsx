import React, { FunctionComponent } from 'react';
import { Inkluderingsmulighet } from '../../tags/hierarkiAvTags';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

type Props = {
    inkluderingsmulighet: Inkluderingsmulighet;
};

const Tilrettelegging = () => (
    <>
        <Element tag="h3">Arbeidstid</Element>
        <Normaltekst className="blokk-s">
            Arbeidsgiveren kan tilpasse arbeidstiden. For eksempel legge til rette for kortere
            dager, eller gradvis øke stillingsprosenten.
        </Normaltekst>
        <Element tag="h3">Fysisk tilrettelegging</Element>
        <Normaltekst className="blokk-s">
            Arbeidsgiveren kan tilrettelegge arbeidsplassen fysisk. For eksempel ergonomisk
            tilpasning og/eller tilby en universelt utformet arbeidsplass.
        </Normaltekst>
        <Element tag="h3">Arbeidshverdagen</Element>
        <Normaltekst className="blokk-s">
            Arbeidsgiveren kan tilpasse arbeidshverdagen, for eksempel ved opplæring,
            arbeidsoppgaver eller tett oppfølging. Personer med psykiske eller kognitive
            utfordringer m.fl. kan ha slike behov.
        </Normaltekst>
        <Element tag="h3">Utfordringer med norsk</Element>
        <Normaltekst>
            Arbeidsgiveren kan tilpasse arbeidsoppgaver for medarbeidere som har utfordringer med å
            snakke, skrive eller lese norsk. Eksempler er ved lese- og skrivevansker, språk- og
            taleforstyrrelser eller utfordringer med norsk fordi man kommer fra et annet land.
        </Normaltekst>
    </>
);

const TiltakEllerVirkemiddel = () => (
    <>
        <Element tag="h3">Lønnstilskudd</Element>
        <Normaltekst className="blokk-s">
            Arbeidsgiveren er åpen for en kandidat som har behov for midlertidig eller varig
            lønnstilskudd. Kandidaten blir ansatt på ordinære lønns- og arbeidsvilkår, men kan få
            tilskudd til lønn fra NAV som skal kompensere for lavere produktivitet.
        </Normaltekst>
        <Element tag="h3">Mentor (tilskudd)</Element>
        <Normaltekst className="blokk-s">
            Arbeidsgiveren er åpen for kandidater som trenger en mentor på arbeidsplassen. En mentor
            er en kollega som kan gi praktisk bistand, veiledning eller opplæring slik at kandidaten
            kan mestre jobben. Det er arbeidsgiveren som søker og mottar mentortilskuddet.
        </Normaltekst>
        <Element tag="h3">Lærlingplass</Element>
        <Normaltekst>
            Arbeidsgiver er åpen for å ta inn personer som lærlinger, og kan gi opplæring i
            lærerplanen for faget. Bedriften må godkjennes som en lærebedrift.{' '}
            <Lenke href="https://laerlingplass.no/blog/bli-en-godkjent-l%C3%A6rebedrift/">
                Les mer om hva bedriften må gjøre.
            </Lenke>
        </Normaltekst>
    </>
);

const PrioriterteMålgrupper = () => (
    <>
        <Undertittel className="blokk-xxs">
            Har arbeidsgiveren et ekstra engasjement for enkelte målgrupper?
        </Undertittel>
        <Normaltekst className="blokk-s">
            Arbeidsgivere kan ha et ekstra engasjement eller interesse for enkelte målgrupper som de
            gjerne vil hjelpe. Har arbeidsgiveren erfaring eller ekstra motivasjon for å gi en
            mulighet til noen av disse målgruppene?{' '}
        </Normaltekst>
        <Element tag="h3">Unge under 30 år</Element>
        <Normaltekst className="blokk-s">
            Unge under 30 år er en målgruppe med høy prioritet i NAV. Tidlig og tett oppfølging er
            viktig for å hindre at unge blir stående utenfor arbeidslivet.
        </Normaltekst>
        <Element tag="h3">Senior 50+</Element>
        <Normaltekst className="blokk-s">
            Å få arbeidsgivere til å ansette og beholde personer som er 50+, er med på å forlenge
            yrkeslivet og senkarrieren til kandidater. Ansettelse av seniorer bidrar til at vi har
            et inkluderende, kompetent og lønnsomt arbeidsliv.
        </Normaltekst>
        <Element tag="h3">Innvandrere fra land utenfor EØS</Element>
        <Normaltekst className="blokk-s">
            Innvandrere fra land utenfor EØS er en prioritert målgruppe i NAV, og sysselsettingen i
            denne gruppen er lav. Mange innvandrere vil ha behov for å utvikle kompetanse og få
            erfaring som det norske arbeidslivet etterspør.
        </Normaltekst>
        <Element tag="h3">Hull i CV-en</Element>
        <Normaltekst className="blokk-s">
            Arbeidsgiveren er åpen for å ta imot en person som ikke har vært i arbeid, utdanning
            eller opplæring i to av de siste fem årene.
        </Normaltekst>
        <Element tag="h3">Ingen eller lav utdanning</Element>
        <Normaltekst className="blokk-s">
            Arbeidsgiveren er åpen for en kandidat som kun har grunnskole eller ikke har fullført
            videregående skole.
        </Normaltekst>
        <Element tag="h3">Lite eller ingen arbeidserfaring</Element>
        <Normaltekst>
            Arbeidsgiveren er åpen for en kandidat som har 1 år eller mindre arbeidserfaring.
        </Normaltekst>
    </>
);

const StatligInkluderingsdugnad = () => (
    <>
        <Element tag="h3">Statlig inkluderingsdugnad</Element>
        <Normaltekst>
            Statlig inkluderingsdugnad skal benyttes når NAV har inngått en samarbeidsavtale med
            statlige bedrifter. Avtalen går ut på at NAV får forsprang til å jobbe med
            (midlertidige) stillinger.
        </Normaltekst>
    </>
);

export const HjelpetekstForInkluderingsmulighet: FunctionComponent<Props> = ({
    inkluderingsmulighet,
}) => {
    switch (inkluderingsmulighet) {
        case Inkluderingsmulighet.Tilrettelegging:
            return <Tilrettelegging />;
        case Inkluderingsmulighet.TiltakEllerVirkemiddel:
            return <TiltakEllerVirkemiddel />;
        case Inkluderingsmulighet.PrioriterteMålgrupper:
            return <PrioriterteMålgrupper />;
        case Inkluderingsmulighet.StatligInkluderingsdugnad:
            return <StatligInkluderingsdugnad />;
        default:
            return null;
    }
};
