import { useEffect, useState } from 'react';
import './Sort.less';

function useSorting(initialState, changeSorting) {
    const [sort, setSort] = useState(initialState);
    const [className, setClassName] = useState('Sort__Icon-asc');

    useEffect(() => {
        if (sort !== initialState) {
            changeSorting(sort.field, sort.dir);
        }

        if (sort.dir === 'asc') {
            setClassName('Sort-asc');
        } else {
            setClassName('Sort-desc');
        }
    }, [sort, initialState, changeSorting]);

    const toggleSorting = (field) => {
        // If field already sorted, change opposite direction
        // If field is a date, sort on desc
        // otherwise, sort on asc.
        let dir;
        if (sort.field === field) {
            dir = sort.dir === 'asc' ? 'desc' : 'asc';
        } else if (field === 'published' || field === 'updated' || field === 'expires') {
            dir = 'desc';
        } else {
            dir = 'asc';
        }

        setSort({
            ...sort,
            field,
            dir,
        });
    };

    return [sort, toggleSorting, className];
}

export default useSorting;
