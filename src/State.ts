import { AdState } from './ad/adReducer';
import { AdValidationState } from './ad/adValidationReducer';
import { AdDataState } from './ad/adDataReducer';

type State = {
    ad: AdState;
    adData: AdDataState;
    adValidation: AdValidationState;
};

export default State;
