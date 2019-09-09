import React from 'react';
import AdStatus from '../../administration/adStatus/AdStatus';
import Inkludering from './inkludering/Inkludering';
import Kontaktinformasjon from './Kontaktinformasjon/Kontaktinformasjon';
import Comment from './comment/Comment'
import './AdministrationPreview.less';

function AdministrationPreview() {
  return (
    <div className="Preview__Administration">
      <div className="Administration__flex">
          <div className="Administration__flex__top">
            <AdStatus />
            <div className="Administration__panel">
                <Inkludering />
             </div>
             <div className="Administration__panel">
                <Kontaktinformasjon />
              </div>
              <div className="Administration__panel">
                <Comment />
            </div>
       </div>
    </div>
  </div>
  )}
export default AdministrationPreview;