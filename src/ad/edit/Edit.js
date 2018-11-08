import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Column, Row } from 'nav-frontend-grid';
import { connect } from 'react-redux';
import { RESET_VALIDATION_ERROR } from '../adValidationReducer';
import './Edit.less';
import Requirements from './requirements/Requirements';
import PracticalInformation from './practicalInformation/PracticalInformation';
import Employer from './employer/Employer';
import JobDetails from './jobDetails/JobDetails';
import Loading from '../../common/loading/Loading';
import ContactPerson from './contactPerson/ContactPerson';
import Application from './application/Application';
import Location from './location/Location';
import { formatISOString } from '../../utils';

class Edit extends React.Component {
    componentWillUnmount() {
        this.props.resetValidation();
    }

    render() {
        const { ad, isFetchingStilling } = this.props;

        if (isFetchingStilling) {
            return (
                <Loading />
            );
        }

        return (
            <div className="Edit">
                <Row className="Edit__inner">
                    <Column xs="12" md="8">
                        <div className="Edit__left">
                            <Employer />
                            <JobDetails />
                            {/* <Ekspanderbartpanel
                             tittel="Hvem bør søke på stilingen"
                             tittelProps="undertittel"
                             border
                             apen
                             >
                             <Requirements />
                             </Ekspanderbartpanel> */}
                        </div>
                    </Column>
                    <Column xs="12" md="4">
                        <PracticalInformation />
                        <ContactPerson />
                        <Application />
                        <Location />
                        <Ekspanderbartpanel
                            className="Edit__panel"
                            tittel="Om annonsen"
                            tittelProps="undertittel"
                            border
                            apen
                        >
                            <Input
                                label="Sist endret"
                                value={ad.updated !== ad.created ? formatISOString(ad.updated, 'DD.MM.YYYY') : ''}
                                disabled
                            />
                            <Input
                                label="Hentet fra/kilde"
                                value={ad.medium || ''}
                                disabled
                            />
                            <Input
                                label="Stillingsnummer"
                                value={ad.id || ''}
                                disabled
                            />
                        </Ekspanderbartpanel>
                    </Column>
                </Row>
            </div>
        );
    }
}

Edit.propTypes = {
    ad: PropTypes.shape({
        title: PropTypes.string,
        updated: PropTypes.string,
        created: PropTypes.string,
        medium: PropTypes.string,
        id: PropTypes.number
    }),
    isFetchingStilling: PropTypes.bool.isRequired,
    resetValidation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    ad: state.adData,
    isFetchingStilling: state.ad.isFetchingStilling
});

const mapDispatchToProps = (dispatch) => ({
    resetValidation: () => dispatch({ type: RESET_VALIDATION_ERROR })
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
