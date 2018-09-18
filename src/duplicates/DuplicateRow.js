import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import capitalizeEmployerName from '../ad/administration/employer/capitalizeEmployerName';
import capitalizeLocation from '../ad/administration/location/capitalizeLocation';
import AdminStatusEnum from '../searchPage/enums/AdminStatusEnum';
import AdStatusEnum from '../searchPage/enums/AdStatusEnum';
import { formatISOString } from '../utils';
import { FETCH_OTHER } from './duplicatesReducer';

class DuplicateRow extends React.Component {

    onClick = () => {
        this.props.fetchOther(this.props.duplicate.uuid);
    };

    render() {
        const { duplicate } = this.props;
        return (
            <div role="button" tabIndex="0" onFocus={this.onClick} className="DuplicateRow" onClick={this.onClick}>
                <Row>
                    <Column md="1">
                        <Normaltekst className="DuplicateRow__ellipsis">
                            {duplicate.created ? formatISOString(duplicate.created, 'DD.MM.YY HH:MM') : ''}
                        </Normaltekst>
                    </Column>
                    <Column md="4">
                        <Normaltekst className="DuplicateRow__ellipsis">
                            {duplicate.title ? duplicate.title : ''}
                        </Normaltekst>
                    </Column>
                    <Column md="3">
                        <Normaltekst className="DuplicateRow__ellipsis">
                            {duplicate.employer && duplicate.employer.name ? capitalizeEmployerName(duplicate.employer.name) : ''}
                        </Normaltekst>
                    </Column>
                    <Column md="2">
                        <Normaltekst className="DuplicateRow__ellipsis">
                            {duplicate.location && duplicate.location.city ? capitalizeLocation(duplicate.location.city) : ''}
                        </Normaltekst>
                    </Column>
                    <Column md="1">
                        <Normaltekst className="DuplicateRow__ellipsis">
                            {duplicate.source ? duplicate.source : ''}
                        </Normaltekst>
                    </Column>
                    <Column md="1">
                        <Normaltekst className="DuplicateRow__ellipsis">
                            {duplicate.status ? AdStatusEnum[duplicate.status] : ''}
                        </Normaltekst>
                    </Column>
                </Row>
            </div>
        );
    }
}

DuplicateRow.propTypes = {
    fetchOther: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    fetchOther: (uuid) => dispatch({ type: FETCH_OTHER, uuid })
});

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateRow);
