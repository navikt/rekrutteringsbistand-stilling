import { Rekrutteringsbistandstilling } from '../Stilling';
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
    _source: Rekrutteringsbistandstilling;
    sort?: number[];
};

export const lagOpenSearchQuery = (query: HentMineStillingerQuery): OpenSearchQuery => {
    return {
        size: 50,
        from: 0,
        track_total_hits: false,
        query: {
            //term?: Record<string, object>;
            //match?: Record<string, MatchQuery>;
            //bool?: object;
            match_all: {},
            /*multi_match?: {
                query: string;
                fields: string[];
            };*/
            //filter?: any;
        },
    };
};
