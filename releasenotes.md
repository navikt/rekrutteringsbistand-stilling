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
