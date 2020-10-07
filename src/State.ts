import { AdValidationState } from './ad/adValidationReducer';
import { NavKontorState } from './navKontor/navKontorReducer';

type State = {
    navKontor: NavKontorState;
    ad: any;
    adData: any;
    adValidation: AdValidationState;
};

export default State;
