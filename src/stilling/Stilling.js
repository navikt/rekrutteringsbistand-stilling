/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Column, Container, Row} from 'nav-frontend-grid';
import AdText from './adText/AdText';
import PersonalAttributes from './requirements/PersonalAttributes';
import SoftRequirements from './requirements/SoftRequirements';
import HardRequirements from './requirements/HardRequirements';
import Application from './application/Application';
import ContactPerson from './contactPerson/ContactPerson';
import EmployerDetails from './employerDetails/EmployerDetails';
import EmploymentDetails from './employmentDetails/EmploymentDetails';
import AdDetails from './adDetails/AdDetails';
import NotFound from './notFound/NotFound';
import Skeleton from './loading/Skeleton';
import Processing from './processing/Processing'
import EmployerContact from './employerContact/EmployerContact'
import Comment from './comment/Comment'
import {FETCH_STILLING_BEGIN} from './stillingReducer';
import './Stilling.less';

class Stilling extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.getStilling(this.props.match.params.uuid);
    }

    render() {
        const {
            stilling, cachedStilling, isFetchingStilling, error
        } = this.props;
        return (
            <div>
                {error && error.statusCode === 404 ? (
                    <Container>
                        <NotFound/>
                    </Container>
                ) : error && (
                    <Container>
                        <NotFound/>
                    </Container>
                )}

                {isFetchingStilling && (
                    <Skeleton stilling={cachedStilling}/>
                )}

                {!isFetchingStilling && stilling && (
                    <article className="Stilling">
                        <Container className="Stilling__main">
                            <Row>
                                <Column xs="12" md="6">
                                    <AdText title={stilling.title} adText={stilling.properties.adtext}/>
                                    <HardRequirements stilling={stilling}/>
                                    <SoftRequirements stilling={stilling}/>
                                    <PersonalAttributes stilling={stilling}/>
                                    <AdDetails updated={stilling.updated} medium={stilling.medium}
                                               reference={stilling.reference}/>
                                </Column>
                                <Column xs="12" md="3">
                                    <EmploymentDetails properties={stilling.properties}/>
                                    <Application
                                        source={stilling.source}
                                        properties={stilling.properties}
                                    />
                                    <ContactPerson properties={stilling.properties}/>
                                    <EmployerDetails properties={stilling.properties}/>

                                </Column>
                                <Column xs="12" md="3">
                                    <Processing/>
                                    <EmployerContact />
                                    <Comment />
                                </Column>
                            </Row>

                        </Container>
                    </article>
                )}
            </div>
        );
    }
}

Stilling.defaultProps = {
    stilling: undefined,
    cachedStilling: undefined,
    isFetchingStilling: false
};

Stilling.propTypes = {
    stilling: PropTypes.shape({
        status: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        properties: PropTypes.shape({
            adtext: PropTypes.string
        }).isRequired
    }),
    cachedStilling: PropTypes.shape({
        title: PropTypes.string
    }),
    getStilling: PropTypes.func.isRequired,
    isFetchingStilling: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isFetchingStilling: state.stilling.isFetchingStilling,
    stilling: state.stilling.stilling,
    cachedStilling: state.stilling.cachedStilling,
    error: state.stilling.error
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid) => dispatch({ type: FETCH_STILLING_BEGIN, uuid })
});

export default connect(mapStateToProps, mapDispatchToProps)(Stilling);
