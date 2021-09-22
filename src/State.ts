import { AdState } from './ad/adReducer';
import { AdValidationState } from './ad/adValidationReducer';
import { AdDataState } from './ad/adDataReducer';
import { Stillingsinfo } from './Stilling';

type State = {
    ad: AdState;
    adData: AdDataState;
    adValidation: AdValidationState;
    stillingsinfoData: Stillingsinfo;
};

export default State;
