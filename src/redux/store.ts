import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import adDataReducer, { adDataSaga, AdDataState } from '../stilling/adDataReducer';
import adReducer, { adSaga, AdState } from '../stilling/adReducer';
import adValidationReducer, {
    AdValidationState,
    validationSaga,
} from '../stilling/adValidationReducer';
import savedSearchAlertStripeReducer from '../stilling/alertstripe/SavedAdAlertStripeReducer';
import styrkReducer, { styrkSaga } from '../stilling/edit/jobDetails/styrk/styrkReducer';
import locationAreaReducer, {
    locationAreaSaga,
} from '../stilling/edit/location/locationAreaReducer';
import locationCodeReducer, {
    locationCodeSaga,
} from '../stilling/edit/location/locationCodeReducer';
import varslingReducer, { varslingSaga, VarslingState } from '../common/varsling/varslingReducer';
import mineStillingerReducer, {
    MineStillingerState,
} from '../mine-stillinger/mineStillingerReducer';
import reporteeReducer, { reporteeSaga, ReporteeState } from '../reportee/reporteeReducer';
import stillingsinfoReducer, { stillingsinfoSaga } from '../stillingsinfo/stillingsinfoReducer';
import { Stillingsinfo } from '../Stilling';
import { mineStillingerSaga } from '../mine-stillinger/mineStillingerSagas';
import { hentStateFraLocalStorage } from './localStorage';
import { lagreEndringerSaga } from './lagreEndringerSaga';
import stillingsinfoDataReducer from '../stillingsinfo/stillingsinfoDataReducer';

export type State = {
    ad: AdState;
    adData: AdDataState;
    adValidation: AdValidationState;
    mineStillinger: MineStillingerState;
    stillingsinfoData: Stillingsinfo;
    varsling: VarslingState;
    reportee: ReporteeState;
};

const createReduxStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const reduxStore = createStore(
        combineReducers({
            ad: adReducer,
            adData: adDataReducer,
            adValidation: adValidationReducer,
            locationCode: locationCodeReducer,
            locationArea: locationAreaReducer,
            mineStillinger: mineStillingerReducer,
            reportee: reporteeReducer,
            savedAdAlertStripe: savedSearchAlertStripeReducer,
            styrk: styrkReducer,
            stillingsinfo: stillingsinfoReducer,
            stillingsinfoData: stillingsinfoDataReducer,
            varsling: varslingReducer,
        }),
        hentStateFraLocalStorage(),
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(adSaga);
    sagaMiddleware.run(validationSaga);
    sagaMiddleware.run(locationCodeSaga);
    sagaMiddleware.run(styrkSaga);
    sagaMiddleware.run(reporteeSaga);
    sagaMiddleware.run(mineStillingerSaga);
    sagaMiddleware.run(adDataSaga);
    sagaMiddleware.run(locationAreaSaga);
    sagaMiddleware.run(stillingsinfoSaga);
    sagaMiddleware.run(varslingSaga);
    sagaMiddleware.run(lagreEndringerSaga);

    return reduxStore;
};

export default createReduxStore;
