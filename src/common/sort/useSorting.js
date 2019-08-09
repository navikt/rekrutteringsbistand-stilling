import { useEffect, useState } from 'react';
import './Sort.less';

function useSorting(initialState, changeSorting) {
    const [sort, setSort] = useState(initialState);
    const [className, setClassName] = useState('Sort__Icon-asc');


    useEffect(() => {
        changeSorting(sort.field, sort.dir);
        if (sort.dir === 'asc') {
            setClassName('Sort-asc');
        } else {
            setClassName('Sort-desc');
        }
    }, [sort]);

    const toggleSorting = (field) => {
        // change to desc if field already sorted on asc. Otherwise, sort on asc.
        const dir = (sort.field === field) && sort.dir === 'asc' ? 'desc' : 'asc';

        setSort({
            ...sort,
            field,
            dir
        });
    };

    return [sort, toggleSorting, className];
}

export default useSorting;
