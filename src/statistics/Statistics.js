import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Innholdstittel } from 'nav-frontend-typografi';
import Loading from '../common/loading/Loading';
import { formatISOString } from '../utils';
import { FETCH_STATS } from './statisticsReducer';
import './Statistics.less';

class Statistics extends React.Component {
    componentDidMount() {
        this.props.getStatistics();
    }

    render() {
        const { isFetching, stats } = this.props;
        return (
            <div className="Statistics">
                {isFetching && (
                    <Loading />
                )}
                {!isFetching && stats && (
                    <div>
                        <Innholdstittel className="blokk-m">Stillinger pr. kilde</Innholdstittel>
                        <table className="Statistics__table">
                            <tbody>
                                <tr>
                                    <th scope="row">Kilde</th>
                                    {stats.map((stat) => (
                                        <th key={stat.source} scope="col">{stat.source}</th>
                                    ))}
                                </tr>
                                <tr>
                                    <th scope="row">Ubehandlede stillinger</th>
                                    {stats.map((stat) => (
                                        <td key={stat.source}>{stat.receivedAds}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th scope="row">Eldste fra</th>
                                    {stats.map((stat) => (
                                        <td key={stat.source}>{formatISOString(stat.oldestReceivedAt)}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>)}
            </div>
        );
    }
}

Statistics.defaultProps = {
    stats: undefined
};

Statistics.propTypes = {
    getStatistics: PropTypes.func.isRequired,
    stats: PropTypes.arrayOf(PropTypes.shape({
        source: PropTypes.string,
        receivedAds: PropTypes.number,
        oldestReceivedAt: PropTypes.string
    })),
    isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    stats: state.statistics.stats,
    isFetching: state.statistics.isFetching
});

const mapDispatchToProps = (dispatch) => ({
    getStatistics: () => dispatch({ type: FETCH_STATS })
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
