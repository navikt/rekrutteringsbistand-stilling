import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Preview from './preview/Preview';
import Administration from './administration/Administration';
import { FETCH_AD, FETCH_NEXT_AD } from './adReducer';
import Error from './error/Error';
import DelayedSpinner from '../common/DelayedSpinner';
import './Ad.less';
import Faded from '../common/faded/Faded';
import Edit from './edit/Edit';
import ValidationSummary from './validation/ValidationSummary';
import AdminStatusEnum from './administration/AdminStatusEnum';

class Ad extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.match.params.uuid) {
            this.uuid = this.props.match.params.uuid;
            this.props.getStilling(this.uuid);
        } else {
            this.props.getNextAd();
        }
    }

    componentDidUpdate() {
        if (this.props.match.params.uuid === undefined && this.props.stilling) {
            // Skjer når man kommer rett til /ads uten uuid
            this.uuid = this.props.stilling.uuid;
            this.props.history.replace(`/ads/${this.uuid}`);
        } else if (this.props.match.params.uuid && this.props.match.params.uuid !== this.uuid) {
            // Skjer når man trykker tilbake i browser
            this.uuid = this.props.match.params.uuid;
            this.props.getStilling(this.uuid);
        } else if (this.props.stilling && this.props.stilling.uuid !== this.uuid) {
            // Skjer når man har trykket hent neste
            this.uuid = this.props.stilling.uuid;
            this.props.history.push(`/ads/${this.uuid}`);
        }
    }

    render() {
        const {
            stilling, isFetchingStilling, isEditingAd
        } = this.props;

        return (
            <div className="Ad">
                {!isFetchingStilling && stilling ? (
                    <Faded>
                        <div className="Ad__flex">
                            <div className="Ad__flex__center">
                                <div className="Ad__flex__center__inner">
                                    <div className="Ad__flex__center__inner__content">
                                        <ValidationSummary />
                                        {stilling.administration.status === AdminStatusEnum.PENDING ? (
                                            <div>
                                                {isEditingAd ? (
                                                    <Edit />
                                                ) : (
                                                    <Preview stilling={stilling} />
                                                )}
                                            </div>
                                        ) : (
                                            <Preview stilling={stilling} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="Ad__flex__right">
                                <div className="Ad__flex__right__inner">
                                    <Administration />
                                </div>
                            </div>
                        </div>
                    </Faded>
                ) : (
                    <div className="Ad__spinner">
                        <DelayedSpinner />
                    </div>
                )}
                <Error />
            </div>
        );
    }
}


Ad.defaultProps = {
    stilling: undefined,
    isFetchingStilling: false
};

Ad.propTypes = {
    stilling: PropTypes.shape({
        title: PropTypes.string.isRequired,
        properties: PropTypes.shape({
            adtext: PropTypes.string
        }).isRequired
    }),
    getStilling: PropTypes.func.isRequired,
    getNextAd: PropTypes.func.isRequired,
    isEditingAd: PropTypes.bool.isRequired,
    isFetchingStilling: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isFetchingStilling: state.ad.isFetchingStilling,
    stilling: state.ad.data,
    isEditingAd: state.ad.isEditingAd
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid) => dispatch({ type: FETCH_AD, uuid }),
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD })
});


export default connect(mapStateToProps, mapDispatchToProps)(Ad);