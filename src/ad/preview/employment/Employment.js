import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { formatISOString, isValidISOString } from '../../../utils';
import { getLocationsAsString } from '../../../common/getWorkLocation';
import worktimeParser from './worktimeParser';

export default function Employment({ properties, locationList }) {
    return (
        <div className="detail-section">
            <Undertittel className="detail-section__head">Om stillingen</Undertittel>
            <dl className="dl-flex typo-normal">
                {properties.jobtitle && [
                    <dt key="dt">Stillingstittel:</dt>,
                    <dd key="dd">{properties.jobtitle}</dd>]
                }
                {locationList && locationList.length > 0 && [
                    <dt key="dt">Arbeidssted:</dt>,
                    <dd key="dd">
                        {getLocationsAsString(locationList)}
                    </dd>
                ]}
                {properties.engagementtype && [
                    <dt key="dt">Ansettelsesform:</dt>,
                    <dd key="dd">{properties.engagementtype }</dd>
                ]}
                {properties.extent && [
                    <dt key="dt">Heltid/deltid:</dt>,
                    <dd key="dd">{properties.extent}</dd>
                ]}
                {properties.positioncount && [
                    <dt key="dt">Antall stillinger:</dt>,
                    <dd key="dd">{properties.positioncount}</dd>
                ]}
                {properties.sector && [
                    <dt key="dt">Sektor:</dt>,
                    <dd key="dd">{properties.sector}</dd>
                ]}
                {properties.workday && [
                    <dt key="dt">Arbeidsdager:</dt>,
                    <dd key="dd">{worktimeParser(properties.workday)}</dd>
                ]}
                {properties.workhours && [
                    <dt key="dt">Arbeidstid:</dt>,
                    <dd key="dd">{worktimeParser(properties.workhours)}</dd>
                ]}
                {properties.jobarrangement && [
                    <dt key="dt">Arb.tidsordning:</dt>,
                    <dd key="dd">{properties.jobarrangement}</dd>
                ]}
                {properties.starttime && [
                    <dt key="dt">Oppstart:</dt>,
                    <dd key="dd">
                        {isValidISOString(properties.starttime) ?
                            formatISOString(properties.starttime, 'DD.MM.YYYY') :
                            properties.starttime}
                    </dd>
                ]}
            </dl>
        </div>
    );
}

Employment.defaultProps = {
    locationList: undefined
};

Employment.propTypes = {
    properties: PropTypes.shape({
        jobtitle: PropTypes.string,
        location: PropTypes.string,
        engagementtype: PropTypes.string,
        extent: PropTypes.string,
        positioncount: PropTypes.string,
        sector: PropTypes.string,
        workday: PropTypes.string,
        workhours: PropTypes.string,
        jobarrangement: PropTypes.string,
        starttime: PropTypes.string
    }).isRequired,
    locationList: PropTypes.arrayOf(PropTypes.object),
};

