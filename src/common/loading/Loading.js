import React from 'react';
import Spinner from 'nav-frontend-spinner';
import './Loading.less';

export default function Loading() {
    return (
        <div className="Loading">
            <Spinner type="L" />
        </div>
    );
}
