import { AdState } from './ad/adReducer';
import { AdValidationState } from './ad/adValidationReducer';
import { NavKontorState } from './navKontor/navKontorReducer';

type State = {
    navKontor: NavKontorState;
    ad: AdState;
    adData: any;
    adValidation: AdValidationState;
};

export default State;
