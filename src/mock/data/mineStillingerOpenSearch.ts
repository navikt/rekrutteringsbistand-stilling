import { Status } from '../../Stilling';
import { Kilde } from '../../Stilling';
import { AdminStatus, Ansettelsesform, Omfang } from '../../Stilling';
import { OpenSearchResponse } from '../../api/openSearchQuery';

export const mineStillingerFraOpenSearch: OpenSearchResponse = {
    took: 10,
    timed_out: false,
    _shards: {
        total: 3,
        successful: 3,
        skipped: 0,
        failed: 0,
    },
    hits: {
        total: {
            value: 10000,
            relation: 'gte',
        },
        max_score: 1.0,
        hits: [
            {
                _index: 'stilling_1',
                _type: '_doc',
                _id: 'fe5bc79c-1202-4ab6-85fd-438076c454b7',
                _score: 1.0,
                _source: {
                    stilling: {
                        title: 'Kommuneoverlege Samfunnsmedisin 100% Skien kommune',
                        uuid: 'fe5bc79c-1202-4ab6-85fd-438076c454b7',
                        annonsenr: '143179',
                        status: Status.Inaktiv,
                        privacy: 'SHOW_ALL',
                        published: '2019-09-24T05:00:11.01177',
                        expires: '2019-09-23T00:00:00',
                        created: '2019-06-19T05:02:38.589',
                        updated: '2019-12-18T08:45:33.561241',
                        employer: null,
                        categories: [
                            {
                                styrkCode: '2211.03',
                                name: 'Bydelslege/Kommunelege',
                            },
                        ],
                        source: Kilde.Finn,
                        medium: 'Skien kommune',
                        businessName: 'Skien kommune',
                        locations: [
                            {
                                address: null,
                                postalCode: null,
                                city: null,
                                county: null,
                                municipal: null,
                                municipalCode: null,
                                latitude: null,
                                longitude: null,
                                country: 'NORGE',
                            },
                        ],
                        reference: 'vismaenterprise.sk-asp.net/sk_recruitment/opening?2160/SANLISE',
                        administration: {
                            status: AdminStatus.Done,
                            remarks: [],
                            comments: '',
                            reportee: '',
                            navIdent: '',
                        },
                        properties: {
                            extent: Omfang.Heltid,
                            applicationdue: '23.09.19',
                            author: 'Skien kommune',
                            engagementtype: Ansettelsesform.Annet,
                            classification_styrk08_score: 0.086036645,
                            employerdescription:
                                '<p>Skien er Telemarks fylkeshovedstad og en av landets eldste byer med røtter tilbake til år 900 e. kr. Byen ligger sentralt plassert mellom fjord og fjell på Østlandet, og er en del av Grenland som til sammen har nærmere 100.000 innbyggere. Skien kommune er også Telemarks største arbeidsgiver og en moderne og spennende arbeidsplass i utvikling. Her jobber 4.200 ansatte daglig for gi kommunens 54.250 innbyggere best mulig tjenester. Sammen er vi med på å gjøre Skien til et godt og trygt sted å jobbe, bo og leve. Skien er en spennende og moderne kommune med høyt aktivitetsnivå. Vi har som mål å gi best mulig service på flest mulig områder til byens befolkning. Vår visjon er &#34;Skien - den gode og inkluderende møteplass!&#34;</p>\n',
                            externalref: '2160/SANLISE',
                            adtext: '<h3><strong>Informasjon om arbeidssted og stilling</strong></h3>\n<p>Kommuneoverlegen er medisinskfaglig rådgiver for kommunen og skal fylle de lovpålagte funksjoner i Helse- og<br />\nomsorgstjenesteloven, folkehelseloven, smittevernloven og regelverk som følger av disse. Legen er administrativt<br />\norganisert under kommunalsjef Helse og Velferd, men er rådgiver for hele kommunen i helsefaglige spørsmål.</p>\n<p>Det vil i løpet av 2019 bli utlyst en ytterligere kommuneoverlegestilling med hovedfokus på faglig ansvar for<br />\nkommunens kliniske (utøvende) helsetjenester og rekruttering/spesialistutdanning av kommunens leger. Det<br />\nforutsettes at kommuneoverlegene samarbeider og kan være gjensidig stedfortredere for hverandre ved behov.</p>\n<h3><strong>Arbeidsoppgaver</strong></h3>\n<ul><li>Kommuneoverlegen er medisinskfaglig rådgiver for kommunen i henhold til gjeldende lovverk.</li><li>Folkehelsearbeid inklusiv oversikt, analyse, rådgivning og deltakelse i kommunens arbeid.</li><li>Faglig støtte til helsefremmende og forebyggende, grupperettede tiltak.</li><li>Deltakelse i planarbeid, for eksempel kommuneplan, delplan helse/omsorg, samfunnssikkerhet og beredskap.</li><li>Bidra i ledelse og operasjonalisering av politiske prioriteringer.</li><li>Samarbeidsrelasjoner og samarbeidsavtaler med spesialisthelsetjenesten, NAV, frivillige organisasjoner mv.</li><li>Deltakelse i kommuneoverlegefora i fylket.</li><li>Helsemessig beredskap og samfunnssikkerhet, herunder deltakelse i kommunens sentrale kriseledelse</li><li>Miljørettet helsevern, herunder deltakelse i det interkommunale Miljørettet helsevern og kollegial stedfortrederordning.</li><li>Ansvar for smittevern og infeksjonskontroll.</li><li>Utvikling av kvalitet og faglighet i de kommunale helse og omsorgstjenestene.</li></ul>\n<h3><strong>Utdanning</strong></h3>\n<ul><li>Må være lege og spesialist i samfunnsmedisin eller annen relevant videreutdanning, for eksempel master i<br />\nfolkehelsevitenskap</li><li>Leger under spesialisering til samfunnsmedisin kan komme i betrakning</li></ul>\n<h3><strong>Erfaring</strong></h3>\n<ul><li>Erfaring fra samfunnsmedisinsk, grupperettet arbeid, epidemiologi, folkehelsearbeid, deltakelse i helsemessig<br />\nberedskap er ønskelig.</li></ul>\n<h3><strong>Personlige egenskaper</strong></h3>\n<ul><li>God faglig innsikt innenfor feltet samfunnsmedisin og -kontekst.</li><li>Gode samarbeidsevner og relasjonskompetanse</li><li>Selvstendighet, ansvarsbevissthet og evne til fremdrift.</li><li>God norsk fremstillingsevne skriftlig og muntlig</li></ul>\n<h3><strong>Vi tilbyr</strong></h3>\n<ul><li>Lønn etter avtale</li><li>Meget gode forsikrings- og pensjonsordninger</li></ul>\n<h3><strong>Andre opplysninger</strong></h3>\n<p>Politiattest må fremlegges før tiltredelse.</p>\n<p>Vitnemål og attester skal IKKE legges ved denne søknaden, men medbringes ved eventuelt intervju.<br />\nHPR nr.: Helsepersonell må oppgi HPR nr. i CV&#39;en under fanen &#34;Autorisasjoner&#34;.</p>\n<h3><strong>Slik søker du på stillingen</strong></h3>\n<p>Du søker via linken &#34;Søk på stillingen&#34;. Søknaden kan ikke mellomlagres så når du har begynt å søke må du fullføre alle stegene i prosessen. Med bakgrunn i at du ikke kan mellomlagre anbefaler vi at du skriver søknadsteksten i Word eller tilsvarende program først.</p>\n',
                            sourceurl:
                                'https://vismaenterprise.sk-asp.net/sk_recruitment/opening?17',
                            searchtags: [
                                {
                                    label: 'Kommunelege',
                                    score: 0.07756687,
                                },
                                {
                                    label: 'Bydelslege',
                                    score: 0.05046912,
                                },
                                {
                                    label: 'Kommune arbeider',
                                    score: 0.038453504,
                                },
                                {
                                    label: 'Fylkeslege',
                                    score: 0.033742677,
                                },
                                {
                                    label: 'Ship Doctor',
                                    score: 0.033742677,
                                },
                            ],
                            employer: 'Skien kommune',
                            location: 'Helse og velferd',
                            classification_input_source: 'title',
                            sector: 'Offentlig',
                        },
                        contacts: [],
                    },
                    stillingsinfo: null,
                },
            },
            {
                _index: 'stilling_1',
                _type: '_doc',
                _id: 'e57c9fe6-72a6-4957-901f-9646b8888bfe',
                _score: 1.0,
                _source: {
                    stilling: {
                        title: 'Vi søker ny skipsingeniør/prosjekt leder',
                        uuid: 'e57c9fe6-72a6-4957-901f-9646b8888bfe',
                        annonsenr: '11936',
                        status: 'INACTIVE',
                        privacy: 'SHOW_ALL',
                        published: '2019-11-07T07:04:33.143911',
                        expires: '2019-12-01T00:00:00',
                        created: '2018-11-24T07:14:46.067',
                        updated: '2019-12-01T01:31:48.376664',
                        employer: {
                            name: 'GLESVÆR SHIP DESIGN AS',
                            publicName: 'GLESVÆR SHIP DESIGN AS',
                            orgnr: '988075337',
                            parentOrgnr: '988048755',
                            orgform: 'BEDR',
                        },
                        categories: [],
                        source: 'FINN',
                        medium: 'FINN',
                        businessName: 'Glesvær Ship Design AS',
                        locations: [
                            {
                                address: 'Gjertrudvegen 11D',
                                postalCode: '5353',
                                city: 'STRAUME',
                                county: 'HORDALAND',
                                municipal: 'FJELL',
                                municipalCode: '1246',
                                latitude: '60.35786819458008',
                                longitude: '5.118706703186035',
                                country: 'NORGE',
                            },
                        ],
                        reference: '131742221',
                        administration: {
                            status: AdminStatus.Done,
                            remarks: [],
                            comments: '',
                            reportee: '',
                            navIdent: '',
                        },
                        properties: {
                            extent: Omfang.Heltid,
                            employerhomepage: 'http://www.gsdesign.no/',
                            address: 'Gjertrudvegen 11D,5353 Straume',
                            applicationdue: '01.12.2019',
                            occupation: 'Ingeniør',
                            jobtitle: 'Skipsingeniør/Prosjekt Leder',
                            author: 'Privat',
                            engagementtype: Ansettelsesform.Fast,
                            industry:
                                'Fiskeri og oppdrett;Konsulent og rådgivning;Maritim og offshore',
                            employerdescription:
                                '<p>Held til på Sartor på Sotra.<br />\nEtablert i 2005. Har idag 6 faste stillingar.<br />\nMe har hatt eit jevnt, hart press, og ynskjer å styrke vår kapasitet.<br />\nKundene våre er rederier, verksteder innen skipsbygging og andre konsulenter.<br />\nTypiske jobbar : Ombygging av offshore fartøyer, tankbåtar, bulkbåtar, nytegning og ombygging av fiskebåtar, arbeidsbåtar, lektere.<br />\nUtfører generelle arrangementer, lager klassetegninger, stabilitetsberegninger, heri også krengeprøver. Stål/struktur tegninger, maskintegninger, systemer. Styrkeberegninger for struktur i stål og aluminium.<br />\nMe jobbar med båtar i stål, aluminium og GRP</p>\n',
                            externalref: 131742221,
                            adtext: '<p><strong>Ønskede kvalifikasjoner:</strong></p>\n<p>Vi søker allsidig, engasjert og serviceinnstilt person med erfaring innen marin teknikk.</p>\n<p>Ønskede kvalifikasjoner:</p>\n<p>Ingeniør Marinteknikk eller Maskinteknikk</p>\n<p>Erfaring kreves fra skipsverft, skipskonsulent eller inspektør i rederi/klasse/myndighet</p>\n<p>Evne til å sette seg inn i forskrifter og regler er en forutsetning. Norske og internasjonale.</p>\n<p>Vi benytter Libre Office, Bricscad, Rhino seros, Delft samt Hypet stabilitets program.</p>\n<p>Erfaring fra disse eller lignende verktøy er ønskelig.</p>\n<p><strong>Egenskaper:</strong></p>\n<p>Selvgående, initiativrik og serviceinnstilt</p>\n<p>Gode kommunikasjons og samarbeidsevner</p>\n<p>God norsk og engelsk fremstillingsevne</p>\n<p>Positiv og godt humør i en hektisk hverdag</p>\n<p><strong>Vi kan tilby:</strong></p>\n<p>Selvstendig arbeid i trivelig arbeidsmiljø</p>\n<p>Fleksibel arbeidstid</p>\n<p>Avanse muligheter</p>\n',
                            sourceurl: 'https://www.finn.no/131742221',
                            applicationemail: 'office@gsdesign.no',
                            sourceupdated: '2019-11-06T07:56:00.000Z',
                            searchtags: [
                                {
                                    label: 'Ingeniør',
                                    score: 0.88322294,
                                },
                                {
                                    label: 'Linux-ingeniør',
                                    score: 0.61554384,
                                },
                                {
                                    label: 'Bygningsingeniør - Sement',
                                    score: 0.61460996,
                                },
                                {
                                    label: 'EDB-ingeniør',
                                    score: 0.61426216,
                                },
                                {
                                    label: 'Skipsingeniør',
                                    score: 0.61426216,
                                },
                            ],
                            applicationurl:
                                'https://www.finn.no/recruitment/hired/frontend/applynow/input.action?adId=131742221',
                            employer: 'Glesvær Ship Design AS',
                            location: 'Straume',
                            classification_input_source: 'occupation',
                            sector: 'Privat',
                        },
                        contacts: [],
                    },
                    stillingsinfo: null,
                },
            },
            {
                _index: 'stilling_1',
                _type: '_doc',
                _id: '543e02f0-de81-4dbe-9cfc-46c69d0403b1',
                _score: 1.0,
                _source: {
                    stilling: {
                        title: 'Daglig leder Kommunerevisjonen IKS',
                        uuid: '543e02f0-de81-4dbe-9cfc-46c69d0403b1',
                        annonsenr: '6779',
                        status: 'INACTIVE',
                        privacy: 'SHOW_ALL',
                        published: '2019-10-11T01:00:00',
                        expires: '2019-12-06T02:00:00',
                        created: '2018-11-20T12:51:13.051',
                        updated: '2019-12-07T00:00:00.061599',
                        employer: {
                            name: 'NESODDEN KOMMUNE NESODDTUNET HELSE OG OMSORGSSENTER',
                            publicName: 'NESODDEN KOMMUNE NESODDTUNET HELSE OG OMSORGSSENTER',
                            orgnr: '974579456',
                            parentOrgnr: '990813302',
                            orgform: 'BEDR',
                        },
                        categories: [
                            {
                                styrkCode: '1349.05',
                                name: 'Leder (privat virksomhet)',
                            },
                        ],
                        source: 'DEXI',
                        medium: 'nes-bu.kommune',
                        businessName: 'NESODDEN KOMMUNE NESODDTUNET HELSE OG OMSORGSSENTER',
                        locations: [
                            {
                                address: null,
                                postalCode: '0655',
                                city: 'OSLO',
                                county: 'OSLO',
                                municipal: 'OSLO',
                                municipalCode: '0301',
                                latitude: null,
                                longitude: null,
                                country: 'NORGE',
                            },
                        ],
                        reference: '<span lang="NO-NYN">Daglig leder Kommunerevisjonen IKS</span>',
                        administration: {
                            status: AdminStatus.Done,
                            remarks: [],
                            comments:
                                'https://rekrutteringsbistand.nais.preprod.local/kandidater/lister/detaljer/45b93071-33b9-421c-8004-d4922c87b2c6',
                            reportee: 'F_Z990315 E_Z990315',
                            navIdent: 'Z990315',
                        },
                        properties: {
                            extent: Omfang.Heltid,
                            sourceurl: 'https://www.nes-bu.kommune.no/ledige-stillinger/',
                            searchtags: [
                                {
                                    label: 'Daglig leder',
                                    score: 0.38583,
                                },
                                {
                                    label: 'Assisterende leder',
                                    score: 0.16973685,
                                },
                                {
                                    label: 'Reisebyråleder',
                                    score: 0.16962439,
                                },
                                {
                                    label: 'Daglig leder byggentrepenørfirma',
                                    score: 0.16942967,
                                },
                                {
                                    label: 'Institusjonsleder',
                                    score: 0.16942967,
                                },
                            ],
                            author: 'Nes kommune',
                            engagementtype: Ansettelsesform.Annet,
                            classification_styrk08_score: 0.38583,
                            employer: 'Nes kommune',
                            location: 'Nes',
                            classification_input_source: 'title',
                            adtext: '<p><em>Kommunerevisjon IKS er eid av kommunene i Hallingdal og Valdres.\nMålet er at vi skal utgjøre en forskjell for kundene våre, ved å bidra til at de følger regelverket, gjennomfører tiltak som er vedtatt og iverksetter forbedringer.</em></p>\n<p><strong>Kommunerevisjon IKS søker en engasjert og dyktig daglig leder.</strong></p>\n<p>Vi søker daglig leder til et selskap med spennende oppgaver innenfor regnskapsrevisjon, forvaltningsrevisjon og eierskapskontroll.</p>\n<p>Kundene er våre 12 eierkommuner, interkommunale selskaper, kommunale foretak, interkommunale samarbeidsområder og stiftelser i Hallingdal og Valdres.</p>\n<p>Vi søker en engasjert person med relevant høyere utdanning på masternivå innenfor f.eks. revisjon, økonomi, juss eller samfunnsvitenskap, til å lede selskapet og yte tjenester innenfor regnskaps- og/eller forvaltningsrevisjon til våre kunder.</p>\n<p>Personlige egenskaper, gode kommunikasjonsferdigheter og relevant praksis vil bli vektlagt. Det vil være en fordel å ha praksis fra revisjons- og utredningsarbeid, kunnskap om kommunal sektor og ledererfaring fra kompetanseorganisasjoner.</p>\n<p>Ordnede arbeidsforhold med rom for personlige tilpasninger.</p>\n<p>Kontorsted Gol eller Fagernes, med arbeidsområde Valdres og Hallingdal.</p>\n<p>Send søknad med CV pr. post eller e-post <strong>innen 19. november 2018.</strong></p>\n<p>Ta gjerne kontakt med styreleder Finn Hesselberg, tlf. 975 64 610, eller konstituert daglig leder Dagny Thon Hovrud på tlf. 975 31 129/e-post <a href="mailto:post&#64;kommunerevisjoniks.no" rel="nofollow">post&#64;kommunerevisjoniks.no</a> for mer informasjon.</p>\n<p><a href="http://www.kommunerevisjoniks.no" rel="nofollow">www.kommunerevisjoniks.no</a><br />\nPostadresse: Postboks 142, 2901 Fagernes.</p>\n',
                            sector: 'Offentlig',
                        },
                        contacts: [],
                    },
                    stillingsinfo: {
                        eierNavident: 'Z990281',
                        eierNavn: 'F_Z990281 E_Z990281',
                        notat: null,
                        stillingsid: '543e02f0-de81-4dbe-9cfc-46c69d0403b1',
                        stillingsinfoid: '314ca3ec-490c-4f6c-b0bf-0a9a55963533',
                        stillingskategori: null,
                    },
                },
            },
        ],
    },
};