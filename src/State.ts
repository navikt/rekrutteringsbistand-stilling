import { AdState } from './ad/adReducer';
import { AdValidationState } from './ad/adValidationReducer';
import { AdDataState } from './ad/adDataReducer';
import { NavKontorState } from './navKontor/navKontorReducer';

type State = {
    navKontor: NavKontorState;
    ad: AdState;
    adData: AdDataState;
    adValidation: AdValidationState;
};

export default State;
