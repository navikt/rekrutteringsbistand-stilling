import React, { useState } from 'react';

function useSorting(initialState) {
    const [sort, setSort] = useState(initialState);

    const toggleSorting = (field) => {
        // change to desc if field already sorted on asc. Otherwise, sort on asc.
        const dir = (sort.field === field) && sort.dir === 'asc' ? 'desc' : 'asc';

        setSort({
            ...sort,
            field,
            dir
        });
    };

    return [sort, toggleSorting];
}

export default useSorting;
