import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chevron from 'nav-frontend-chevron';

import { CHANGE_MY_ADS_SORTING } from '../myAdsReducer';
import useSorting from '../../common/sort/useSorting';
import '../../common/sort/Sort.less';
import './Result.less';

function ResultHeader({ changeSorting, sortDir, sortField }) {
    const [sort, toggleSorting] = useSorting({ field: sortField, dir: sortDir });

    useEffect(() => {
        changeSorting(sort.field, sort.dir);
    }, [sort]);

    const sortClassName = useMemo(() => (sort.dir === 'asc' ? 'Sort__Icon-asc' : 'Sort__Icon-desc'), [sort])

    const chevronTypeActive = useMemo(() => (sort.dir === 'asc' ? 'ned' : 'opp'), [sort]);

    const chevronTypeActiveHover = useMemo(() => (sort.dir === 'asc' ? 'opp' : 'ned'), [sort]);


    return (
        <thead className="ResultHeader typo-element">
            <tr>
                <th className="Col-updated">Sist endret</th>
                <th
                    className={`Col-title ${sort.field === 'title' ? sortClassName : 'Sort__Icon-unsorted'}`}
                    onClick={() => toggleSorting('title')}
                >
                    Stillingstittel
                    <Chevron
                        className={` ${sort.field === 'title' ? 'Chevron' : 'Chevron__unsorted'}`}
                        type={`${sort.field === 'title' ? chevronTypeActive : chevronTypeActiveHover}`}
                    />
                </th>
                <th className="Col-id">
                    Annonse-
                    <br />
                    nummer
                </th>
                <th
                    className={`Col-employer  ${sort.field === 'employer' ? sortClassName : 'Sort__Icon-unsorted'}`}
                    onClick={() => toggleSorting('employer')}
                >
                    Arbeidsgiver
                </th>
                <th
                    className={`Col-expires  ${sort.field === 'expires' ? sortClassName : 'Sort__Icon-unsorted'}`}
                    onClick={() => toggleSorting('expires')}
                >
                    Utløpsdato
                </th>
                <th
                    className={`Col-privacy  ${sort.field === 'privacy' ? sortClassName : 'Sort__Icon-unsorted'}`}
                    onClick={() => toggleSorting('privacy')}
                >
                    Publisert
                </th>
                <th className="Col-status">Status</th>
                <th className="Col-candidate">Kandidatliste</th>
                <th className="Col-edit center">Rediger</th>
                <th className="Col-menu center">Meny</th>
            </tr>
        </thead>
    );
}

ResultHeader.propTypes = {
    changeSorting: PropTypes.func.isRequired,
    sortDir: PropTypes.string.isRequired,
    sortField: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    sortDir: state.myAds.sortDir,
    sortField: state.myAds.sortField
});

const mapDispatchToProps = (dispatch) => ({
    changeSorting: (field, dir) => dispatch({ type: CHANGE_MY_ADS_SORTING, field, dir })
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultHeader);
