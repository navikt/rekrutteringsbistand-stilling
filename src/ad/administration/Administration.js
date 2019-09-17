import React from 'react';
import Tabs from 'nav-frontend-tabs';
import { Undertittel, Systemtittel } from 'nav-frontend-typografi';
import AdStatus from './adStatus/AdStatus';
import AdStatusEdit from './adStatus/AdStatusEdit';
import Publishing from './publishing/Publishing';
import Privacy from './publishing/Privacy';
import InkluderingPanel from './inkludering/InkluderingPanel';
import AdminStatusPreview from './adminStatus/AdminStatusPreview';
import Comment from './comment/Comment';
import './Administration.less';

class Administration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: undefined
        };
    }

    publisering() {
        return (
            <div className="Tab__area Administration__elements">
                <div className="Administration__panel">
                    <Undertittel className="Administration__panel__title">Når skal stillingen vises?</Undertittel>
                    <Publishing />
                </div>
                <div className="Administration__panel">
                    <Undertittel className="Administration__panel__title">Hvor skal stillingen publiseres?*</Undertittel>
                    <Privacy />
                </div>
                <div className="Administration__panel">
                    <Undertittel className="Administration__panel__title">Notater</Undertittel>
                    <Comment placeholder="Legg inn notat" />
                </div>
            </div>
        )
    }

    inkludering() {
       return (
            <div className="Tab__area">
                <div className="Administration__panel Inkluderingpanel">
                    <Undertittel className="Administration__panel__title">Inkludering</Undertittel>
                    <InkluderingPanel />
                </div> 
            </div>
       )
    }

    render() {
        return (
            <div className="Administration">
                <div className="Administration__flex">
                    <div className="Administration__flex__top">
                        <AdStatus />
                    </div>
                    <Tabs className="Tabs"
                            tabs={[
                                {"label": "Publisering av stilling"},
                                {"label": "Inkludering"}
                            ]}
                            onChange={(event, index) => {
                                this.setState({
                                    tabIndex: index
                                })
                            }}
                            
                        /> 
                    <div className="Administration__flex__center">
                        {this.state.tabIndex ? this.inkludering() : this.publisering()}
                    </div>
                    <div className="Administration__flex__bottom">
                        <AdminStatusPreview />
                        <AdStatusEdit />
                    </div>
                </div>
            </div>
        );
    }
};
export default Administration;
