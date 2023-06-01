import { Status } from '../Stilling';
import { RekrutteringsbistandstillingOpenSearch } from '../StillingOpenSearch';
import { HentMineStillingerQuery } from '../mine-stillinger/mineStillingerSagas';

export type OpenSearchQuery = {
    size?: number;
    from?: number;
    track_total_hits?: boolean;
    query: {
        term?: Record<string, object>;
        match?: Record<string, MatchQuery>;
        bool?: object;
        match_all?: object;
        multi_match?: {
            query: string;
            fields: string[];
        };
        filter?: any;
    };
};

type MatchQuery = {
    query: string;
};

export type OpenSearchResponse = {
    took: number;
    timed_out: boolean;
    _shards: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: {
        total: {
            value: number;
            relation: string;
        };
        max_score: number | null;
        hits: Array<Hit>;
    };
};

export type Hit = {
    _index: string;
    _type: string;
    _id: string;
    _score: number | null;
    _source: RekrutteringsbistandstillingOpenSearch;
    sort?: number[];
};

export const lagOpenSearchQuery = (
    query: HentMineStillingerQuery,
    sidestørrelse: number
): OpenSearchQuery => {
    return {
        size: sidestørrelse,
        from: 0,
        track_total_hits: true,
        query: byggIndreQuery(query),
    };
};

const byggIndreQuery = (query: HentMineStillingerQuery) => {
    console.log('Søker med query:', query);

    return {
        bool: {
            filter: [...kunMineStillinger, ...byggSynlighetQuery(query.deactivatedByExpiry)],
        },
    };
};

const kunMineStillinger = [
    {
        bool: {
            should: [
                {
                    term: {
                        'stilling.administration.navIdent': 'Z994122',
                    },
                },
                {
                    term: {
                        'stillingsinfo.eierNavident': 'Z994122',
                    },
                },
            ],
        },
    },
];

const byggSynlighetQuery = (visUtløpteStillinger: boolean) => {
    if (visUtløpteStillinger) {
        return [
            {
                bool: {
                    must: [
                        { term: { 'stilling.status': 'INACTIVE' } },
                        {
                            range: {
                                'stilling.expires': {
                                    lt: 'now/d',
                                },
                            },
                        },
                        ...stillingenErEllerHarVærtPublisert,
                    ],
                },
            },
        ];
    } else {
        return [
            {
                bool: {
                    should: [
                        {
                            term: {
                                'stilling.status': 'ACTIVE',
                            },
                        },
                        {
                            term: {
                                'stilling.status': 'INACTIVE',
                            },
                        },
                        {
                            term: {
                                'stilling.status': 'STOPPED',
                            },
                        },
                    ],
                    must_not: [
                        {
                            range: {
                                'stilling.expires': {
                                    lt: 'now/d',
                                },
                            },
                        },
                    ],
                },
            },
        ];
    }
};

const stillingenErEllerHarVærtPublisert = [
    {
        term: {
            'stilling.administration.status': 'DONE',
        },
    },
    {
        exists: {
            field: 'stilling.publishedByAdmin',
        },
    },
    {
        range: {
            'stilling.published': {
                lte: 'now/d',
            },
        },
    },
];
