import { AdState } from './ad/adReducer';
import { AdValidationState } from './ad/adValidationReducer';
import { AdDataState } from './ad/adDataReducer';
import { Stillingsinfo } from './Stilling';
import { VarslingState } from './common/varsling/varslingReducer';

type State = {
    ad: AdState;
    adData: AdDataState;
    adValidation: AdValidationState;
    stillingsinfoData: Stillingsinfo;
    varsling: VarslingState;
};

export default State;
