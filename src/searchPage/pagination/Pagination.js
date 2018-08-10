import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Chevron from 'nav-frontend-chevron';
import { Flatknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { CHANGE_PAGE } from '../searchReducer';
import './Pagination.less';

class Pagination extends React.Component {
    onPreviousPage = () => {
        this.props.changePage(this.props.page - 1);
    };

    onNextPage = () => {
        this.props.changePage(this.props.page + 1);
    };

    render() {
        if (this.props.totalPages === 0) {
            return null;
        }
        return (
            <div className="Pagination">
                <Normaltekst className="blokk-xs">
                    {`Viser side ${this.props.page + 1} av ${this.props.totalPages}`}
                </Normaltekst>
                <div className="Pagination__buttons">
                    {this.props.page > 0 && (
                        <Flatknapp
                            onClick={this.onPreviousPage}
                        >
                            <Chevron type="venstre" className="Pagination__chevron" />
                            Forrige
                        </Flatknapp>
                    )}

                    {this.props.page + 1 < this.props.totalPages && (
                        <Flatknapp
                            onClick={this.onNextPage}
                        >
                            Neste
                            <Chevron type="høyre" className="Pagination__chevron" />
                        </Flatknapp>
                    )}
                </div>
            </div>
        );
    }
}


Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    totalPages: state.search.totalPages,
    page: state.search.page
});

const mapDispatchToProps = (dispatch) => ({
    changePage: (page) => dispatch({ type: CHANGE_PAGE, page })
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
