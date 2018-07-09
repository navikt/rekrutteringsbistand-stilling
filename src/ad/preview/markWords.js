const discriminating = [
    new RegExp('([0-9,.]+?[\\s]?\\%)'),                                         //søk etter xx%
    new RegExp('\\b((?:engasjement|faste?))\\b'),                               //søk etter fast, engasjement
    new RegExp('((?:h|d)ei?ltid)'),                                             //søk etter hel- eller deltid
    new RegExp('(fulltid)'),                                                    //søk etter fulltid
    new RegExp('\\b([0-9]{2,2}[ ]+(?:&a(?:mp;a)?ring;|å)r)\\b'),                //søk etter xx år
    new RegExp('((?:&a(?:mp;a)?ring;|å)rem(?:&a(?:mp;a)?ring;|å)l)'),           //søk etter åremål
    new RegExp('(vikar(?:er)?(?:iat(?:et|er)?|ierende)?)'),                     //søk etter vikar(-iat,-ierende)
    new RegExp('((?:referanse|ref|utlysn?ing|kunngj.rings?)[. ]?nr)'),          //søk etter referanse
    new RegExp('\\b((?:id[. ]|saks?\\.?nr|st\\.)[. ]*(?:nr)?)'),                //søk etter id/sak/st. nr
    new RegExp('(arbeidsst[ea]d)'),                                             //søk etter arbeidssted
    new RegExp('([0-9]{1,2}\.[0-9]{1,2}(?:[.]|[ ])(?:[0-9]{4,4}|[0-9]{2,2}))'), //søk etter dato
    new RegExp('(f(?:&(?:amp;)?oslash;|ø)rerkort)'),                            //søk etter førerkort
    new RegExp('(turnus)'),
    new RegExp('(skift(?:ordning|arbeid)?)'),
    new RegExp('(arbeidstid)'),
    new RegExp('(prosjekt(?:stilling|ansettelse))'),
    new RegExp('(annonsen er merket)'),
    new RegExp('(natte?vakt)'),
    new RegExp('(fagbrev)'),
    new RegExp('(dagtid)'),
    new RegExp('(sertifikat)'),
    new RegExp('(snarlig tiltredelse)'),
    new RegExp('(\\bungt (?:milj(?:&oslash;|ø))?)'),
    new RegExp('(tilbyr et ungt)'),                                             //søk etter ungt miljø
    new RegExp('(Ungt)'),
    new RegExp('(ungt)'),
    new RegExp('(hei?l stilling)'),
    new RegExp('(lokalisert)'),
    new RegExp('(\\blocation\\b|\\blocated\\b)'),                               //søk etter location/located
    new RegExp('(deadline)'),
    new RegExp('(permanent|temporary)'),
    new RegExp('(salary)'),
    new RegExp('(duration)'),
    new RegExp('(behersker norsk)'),
    new RegExp('(flytende norsk)'),
    new RegExp('(statsborger)'),
    new RegExp('(etnisk)'),
    new RegExp('(oppdrag)'),
    new RegExp('(intern utlysning)'),
    new RegExp('(næringsdrivende)'),
    new RegExp('(homeparties)'),
    new RegExp('(homeparty)'),
    new RegExp('(franchise)'),
    new RegExp('(partner)'),
    new RegExp('(honorar)'),
    new RegExp('(snakker norsk)'),
    new RegExp('(verv)'),
    new RegExp('(styreverv)'),
    new RegExp('(vikarpool)'),
    new RegExp('(pool)'),
    new RegExp('(intern)'),
    new RegExp('(reference (?:no|number)|ref[ ]+[\\d/.-]+)'),                   //søk etter ref.nr på engelsk
    new RegExp('((?:full|part|day) time)'),
    new RegExp('\\b([0-9]{2,2}[ ]+years\\b)'),                                  //søk etter XX years
    new RegExp('([0-9]{1,2}[.]?[ ]?(?:januar|jan\\.|februar|feb\\.|mars|mar\\.|april|apr\\.|mai|juni|jun\\.|juli|jul\\.|august|aug\\.|september|sep\\.|oktober|okt\\.|november|nov\\.|desember|des\\.)[\\s]?(?:[0-9]{4,4})?)'),
    new RegExp('(www\.nav\.no)'),
    new RegExp(' webcruiter '),
    new RegExp('([Y|y]ngre)')
];

export default function markWords(text) {
    if (text != undefined) {
        for (let i = 0; i < discriminating.length; i++) {
            text = text.replace(discriminating[i], '<span class="AdText__discriminating">$&</span>');
        }
    }
    return text;
}

export const hasExcludingWordsInTitle = (title, employer) => (
    title && title.match(
        new RegExp(`(^ledige stilling[ea]r$)|(^stillinger - uke)|(^ledige )?stilling[ea]r i ${employer}`, 'gi')
    )
);

export function hasExcludingWordsInUrl(url) {
    return url != undefined && 
    [
        new RegExp('webcruiter')
    ]
    .some(r => url.match(r));
}