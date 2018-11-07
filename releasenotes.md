## RELEASE - 0.3.61-df65bde
#### New in this release: 
+ 2018-11-06 [PAM-1743] Fjerne kandidatlister som menypunkt
+ 2018-11-05 [Fix] Fortsatt linke til mine annonser selv om annonsen ikke skal slettes
+ 2018-11-05 [Fix] Flytte redirect til mine annonser til saga
+ 2018-11-05 [PAM-1887]: legger til funksjonalitet for å vise utgåtte stillinger og for å stoppe publiserte stillinger
+ 2018-11-05 [Fix] Vise navIdent i søkeresultat når den er satt
+ 2018-11-05 [Fix] Nullstille stillingsdata når man oppretter en ny annonse
+ 2018-11-05 [PAM-1309] Bruke react-router i lenkepanel for å slippe refresh av siden ved linking
+ 2018-11-05 [PAM-1309] Legge til lenkepanel for mine stillinger og finn kandidater på forsiden
+ 2018-11-02 [Fix] Nullstille søket når man trykker på Søk etter stilling
+ 2018-11-02 [PAM-1310] Skrive om filtre til radio-buttons siden søket ikke støtter checkbokser
+ 2018-11-02 [PAM-1310] Fjerne avvist og slettet fra søkeresultat, søke på utløpt og publisert frem i tid
+ 2018-11-01 [Fix] Oppdatere datovisning i søkeresultat, fjerne ubrukt kode og vise publiseringsdato i alertstripe
+ 2018-10-30 [PAM-1887]: første versjon (uferdig) av side med mine stillinger
## RELEASE - 0.2.46-43cadce
#### New in this release: 
+ 2018-11-01 [Fix] Vise publiser endringer, stopp og avbryt samtidig og vise alertstripe ved publisering av endringer
+ 2018-10-31 [Fix] Forhindre at forhåndsvisning vises når man publiserer en annonse
+ 2018-10-30 [PAM-1265] Legger til Kontaktperson i NAV på "Om annonsen"
+ 2018-10-30 [PAM-1265] Legger på sjekk for publisert internt
+ 2018-10-30 [PAM-1612] Vise annen overskrift i avbryt-modal ved tidligere lagrede stillinger
+ 2018-10-30 [PAM-1612] Vise lenke til søkesiden hvis annonsen er slettet
+ 2018-10-30 [PAM-1612] Slette stilling hvis bruker trykker avbryt og det aldri har blitt gjort endringer på den
+ 2018-10-30 [PAM-1265] Legger til Registrert av i "Om annonsen"
## RELEASE - 0.1.40-3751958
#### New in this release: 
+ 2018-10-30 [Fix] Skjule felter Hvem bør søke på stillingen inntill videre
## RELEASE - 0.16.239-7291a67
#### New in this release: 
+ 2018-10-09 [PAM-1431] Legger til alternative styrknavn
## RELEASE - 0.13.229-d12fef3
#### New in this release: 
+ 2018-10-04 [Fix] Flytter "Fjern"-knapp slik at den kommer etter saksbehandlernavn
+ 2018-10-04 [PAM-1616]: Flytter sjekk på kilde ut av komponenten
+ 2018-10-04 [Fix] Gjør listen over arbeidsgivere i typeahead mere lettlest, ved å sturkturere navn og addresse på ulike linjer. Optimaliserer også typeheadenen og gjør den mer responsiv når man skriver inn.
## RELEASE - 0.12.225-4fdddcf
#### New in this release: 
+ 2018-10-03 [PAM-1294] Nullstill søket
+ 2018-10-03 [PAM-1596] Filter på saksbehandlers navn
+ 2018-10-03 [PAM-1601] Gir nytt navn på knapp, "Behandle nye annonser"
+ 2018-10-03 [PAM-1435] Gir nytt navn på annonsestatus, fra "Mottatt" til "Ny"
+ 2018-10-03 [PAM-1595] Markere som min inne på stillingsannonsen
+ 2018-10-03 [PAM-1436] Vise sakesbehandler i opplistingen
## RELEASE - 0.11.219-46a47c3
#### New in this release: 
+ 2018-10-02 [Feature] Flytter Alle nederst i radiobuttonliste
+ 2018-10-01 [Feature] Viser annonser som er MOTTATT og IKKE PUBLISERT når søkebildet åpnes første gang.
## RELEASE - 0.10.217-b1f36b5
#### New in this release: 
+ 2018-09-27 [Fix] Bruker samme datoformat alle steder, DD.MM.YYYY, feks 27.09.2018
## RELEASE - 0.9.214-3ae720f
#### New in this release: 
+ 2018-09-26 [PAM-1500] Sette bredde på krav for å alltid få de rett under hverandre
## RELEASE - 0.8.212-256db36
#### New in this release: 
+ 2018-09-26 [PAM-1499] Workaround for å unngå problemer ved ad.administration=null
+ 2018-09-26 [PAM-1500] Skrive om fra Undertittel til Element i forhåndsvisning av krav
+ 2018-09-26 [PAM-1499] Legger til nullsjekk av ad.administration
+ 2018-09-26 [PAM-1499] Legger til feilhåndtering ved ingen nettverk og http-errors. Viser rød alertstripe med generell feilmelding om å prøve igjen.
+ 2018-09-26 [PAM-1500] Vise hardrequirements, softrequirements og personalattributes i forhåndsvisning av stilling
+ 2018-09-25 Lagt til sjekk på diskriminerende ord. Forslag for å løse [PAM-1513]: bruker transform-funksjonen til react html-parser til å gjøre en sjekk på hver node som er parset. kun hvis noden er ren tekst, sjekker vi for diskrimenernde ord. deretter kjøres ReactHtmlParser på nytt på span-elementet med diskriminerende ord, slik at det blir markert.
+ 2018-09-24 [PAM-1507] endre sjekk for om kommentar skal vises i årsak til avvisning
## RELEASE - 0.7.207-e18d794
#### New in this release: 
+ 2018-09-20 [PAM-1342] - Disabler postnummer-felt for stillinger fra pam-adreg som har kommune eller land registrert - det skal fortsatt være lov å publisere disse stillingene, men NSS må vite at de skal registreres i Arena i tillegg.
## RELEASE - 0.6.206-d1ce1b1
#### New in this release: 
+ 2018-09-20 [PAM-1450] Returnere string i getLocationAsString
+ 2018-09-20 [Bugfix] Småjusteringer av css i duplikatsjekk
+ 2018-09-19 [PAM-1450] Vise arbeidssted selv om en eller flere av feltene mangler
## RELEASE - 0.5.204-f4ece9c
#### New in this release: 
+ 2018-09-20 [Bugfix] Utfører søk etter duplikat når man trykker Enter i søkefeltet for arbeidssted, slik  det er gjort i de andre søkefeltene.
+ 2018-09-20 [Bugfix] Sørger for at listen over postnummere er lastet, før validering av postnummer utføres.
+ 2018-09-18 [PAM-1443] Duplikatsjekk av annonser i frontend.
## RELEASE - 0.4.200-f2910a2
#### New in this release: 
+ 2018-09-19 [PAM-1432]: fikset typo
## RELEASE - 0.2.194-bf802d1
#### New in this release: 
+ 2018-09-11 [PAM-1386] Det skal kun være mulig å legge inn en styrkkode per annonse
## RELEASE - 0.1.191-f3265be
#### New in this release: 
+ 2018-09-10 [PAM-1374] Fjerner linjen med saksbehandlingsstatus
+ 2018-09-03 [PAM-1327] Legger til capitlalize av arbeidsgiver
+ 2018-09-03 [PAM-1327] Legger til capitlalize av sted/kommune/fylke
+ 2018-09-03 [PAM-1334] Endrer tekst til "Søket ga 280 annonser"
+ 2018-09-03 [PAM-886] - Flytter publiseringsdato og utløpsdato ut til admin-panelet - Legger til nav-datovelger på feltene - Gjør utløpsdato obligatorisk for publisering
