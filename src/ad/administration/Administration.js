import React from 'react';
import AdStatusPreview from './adStatus/AdStatusPreview';
import AdStatusEdit from './adStatus/AdStatusEdit';
import Styrk from './styrk/Styrk';
import Location from './location/Location';
import Employer from './employer/Employer';
import AdminStatusPreview from './adminStatus/AdminStatusPreview';
import './Administration.less';

export default function Administration() {
    return (
        <div className="Administration">
            <div className="Administration__flex">
                <div className="Administration__flex__top">
                    <AdStatusPreview />
                    <Styrk />
                    <Employer />
                    <Location />
                </div>
                <div className="Administration__flex__bottom">
                    <div className="Administration__buttons">
                        <AdStatusEdit />
                    </div>
                    <AdminStatusPreview />
                </div>
            </div>
        </div>
    );
}

