import React from 'react';
import { connect } from 'react-redux';
import Chevron from 'nav-frontend-chevron';
import { Flatknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { State } from '../../reduxStore';
import './Pagination.less';
import { MineStillingerAction, MineStillingerActionType } from '../MineStillingerAction';

type Props = {
    totalPages: number;
    page: number;
    changePage: (page: number) => void;
};

class Pagination extends React.Component<Props> {
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
                        <Flatknapp onClick={this.onPreviousPage}>
                            <Chevron type="venstre" className="Pagination__chevron" />
                            Forrige
                        </Flatknapp>
                    )}

                    {this.props.page + 1 < this.props.totalPages && (
                        <Flatknapp onClick={this.onNextPage}>
                            Neste
                            <Chevron type="høyre" className="Pagination__chevron" />
                        </Flatknapp>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    totalPages: state.mineStillinger.totalPages,
    page: state.mineStillinger.page,
});

const mapDispatchToProps = (dispatch: (action: MineStillingerAction) => void) => ({
    changePage: (page: number) =>
        dispatch({ type: MineStillingerActionType.ChangeMyAdsPage, page }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
