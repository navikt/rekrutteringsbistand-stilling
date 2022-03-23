import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import adDataReducer, { adDataSaga, AdDataState } from './ad/adDataReducer';
import adReducer, { adSaga, AdState } from './ad/adReducer';
import adValidationReducer, { AdValidationState, validationSaga } from './ad/adValidationReducer';
import savedSearchAlertStripeReducer from './ad/alertstripe/SavedAdAlertStripeReducer';
import employerReducer, { employerSaga } from './ad/edit/employer/employerReducer';
import styrkReducer, { styrkSaga } from './ad/edit/jobDetails/styrk/styrkReducer';
import locationAreaReducer, { locationAreaSaga } from './ad/edit/location/locationAreaReducer';
import locationCodeReducer, { locationCodeSaga } from './ad/edit/location/locationCodeReducer';
import varslingReducer, { varslingSaga, VarslingState } from './common/varsling/varslingReducer';
import myAdsReducer, { myAdsSaga } from './myAds/myAdsReducer';
import reporteeReducer, { reporteeSaga, ReporteeState } from './reportee/reporteeReducer';
import stillingsinfoDataReducer from './stillingsinfo/stillingsinfoDataReducer';
import stillingsinfoReducer, { stillingsinfoSaga } from './stillingsinfo/stillingsinfoReducer';
import { Rekrutteringsbistandstilling, Stillingsinfo } from './Stilling';

export type State = {
    ad: AdState;
    adData: AdDataState;
    adValidation: AdValidationState;
    myAds: {
        items: Rekrutteringsbistandstilling[];
    };
    stillingsinfoData: Stillingsinfo;
    varsling: VarslingState;
    reportee: ReporteeState;
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = createStore(
    combineReducers({
        ad: adReducer,
        adData: adDataReducer,
        adValidation: adValidationReducer,
        employer: employerReducer,
        locationCode: locationCodeReducer,
        locationArea: locationAreaReducer,
        myAds: myAdsReducer,
        reportee: reporteeReducer,
        savedAdAlertStripe: savedSearchAlertStripeReducer,
        styrk: styrkReducer,
        stillingsinfo: stillingsinfoReducer,
        stillingsinfoData: stillingsinfoDataReducer,
        varsling: varslingReducer,
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(adSaga);
sagaMiddleware.run(validationSaga);
sagaMiddleware.run(employerSaga);
sagaMiddleware.run(locationCodeSaga);
sagaMiddleware.run(styrkSaga);
sagaMiddleware.run(reporteeSaga);
sagaMiddleware.run(myAdsSaga);
sagaMiddleware.run(adDataSaga);
sagaMiddleware.run(locationAreaSaga);
sagaMiddleware.run(stillingsinfoSaga);
sagaMiddleware.run(varslingSaga);

export default reduxStore;
