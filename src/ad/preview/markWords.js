const diskriminerende = [
    '([0-9,.]+?[\\s]?\\%)',                                         //søk etter xx%
    '\\b((?:engasjement|faste?))\\b',                               //søk etter fast, engasjement
    '((?:h|d)ei?ltid)',                                             //søk etter hel- eller deltid
    '(fulltid)',                                                    //søk etter fulltid
    '\\b([0-9]{2,2}[ ]+(?:&a(?:mp;a)?ring;|å)r)\\b',                //søk etter xx år
    '((?:&a(?:mp;a)?ring;|å)rem(?:&a(?:mp;a)?ring;|å)l)',           //søk etter åremål
    '(vikar(?:er)?(?:iat(?:et|er)?|ierende)?)',                     //søk etter vikar(-iat,-ierende)
    '((?:referanse|ref|utlysn?ing|kunngj.rings?)[. ]?nr)',          //søk etter referanse
    '\\b((?:id[. ]|saks?\\.?nr|st\\.)[. ]*(?:nr)?)',                //søk etter id/sak/st. nr
    '(arbeidsst[ea]d)',                                             //søk etter arbeidssted
    '([0-9]{1,2}\.[0-9]{1,2}(?:[.]|[ ])(?:[0-9]{4,4}|[0-9]{2,2}))', //søk etter dato
    '(f(?:&(?:amp;)?oslash;|ø)rerkort)',                            //søk etter førerkort
    '(turnus)',
    '(skift(?:ordning|arbeid)?)',
    '(arbeidstid)',
    '(prosjekt(?:stilling|ansettelse))',
    '(annonsen er merket)',
    '(natte?vakt)',
    '(fagbrev)',
    '(dagtid)',
    '(sertifikat)',
    '(snarlig tiltredelse)',
    '(\\bungt (?:milj(?:&oslash;|ø))?)',
    '(tilbyr et ungt)',                                             //søk etter ungt miljø
    '(Ungt)',
    '(ungt)',
    '(hei?l stilling)',
    '(lokalisert)',
    '(\\blocation\\b|\\blocated\\b)',                               //søk etter location/located
    '(deadline)',
    '(permanent|temporary)',
    '(salary)',
    '(duration)',
    '(behersker norsk)',
    '(flytende norsk)',
    '(statsborger)',
    '(etnisk)',
    '(oppdrag)',
    '(intern utlysning)',
    '(næringsdrivende)',
    '(homeparties)',
    '(homeparty)',
    '(franchise)',
    '(partner)',
    '(honorar)',
    '(snakker norsk)',
    '(verv)',
    '(styreverv)',
    '(vikarpool)',
    '(pool)',
    '(intern)',
    '(reference (?:no|number)|ref[ ]+[\\d/.-]+)',                   //søk etter ref.nr på engelsk
    '((?:full|part|day) time)',
    '\\b([0-9]{2,2}[ ]+years\\b)',                                  //søk etter XX years
    '([0-9]{1,2}[.]?[ ]?(?:januar|jan\\.|februar|feb\\.|mars|mar\\.|april|apr\\.|mai|juni|jun\\.|juli|jul\\.|august|aug\\.|september|sep\\.|oktober|okt\\.|november|nov\\.|desember|des\\.)[\\s]?(?:[0-9]{4,4})?)',
    '(www\.nav\.no)',
    ' webcruiter ',
    '([Y|y]ngre)'
];

export default function markWords(originalText, className = 'highlight-word') {
    let text = originalText.slice(0);
    if (text !== undefined) {
        for (let i = 0; i < diskriminerende.length; i += 1) {
            text = text.replace(new RegExp(diskriminerende[i], 'gi'), `<span class=${className}>$&</span>`);
        }
    }
    return text;
}
