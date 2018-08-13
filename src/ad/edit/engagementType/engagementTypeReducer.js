export const SET_ENGAGEMENTTYPE_TYPEAHEAD_VALUE = 'SET_ENGAGEMENTTYPE_VALUE';

const initialState = {
    suggestions: []
};

const engagementTypes = ['Fast', 'Vikariat', 'Engasjement', 'Prosjekt', 'Sesong', 'Sommerjobb', 'Trainee og lærling', 'Annet'];

export default function engagementTypeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ENGAGEMENTTYPE_TYPEAHEAD_VALUE:
            return {
                ...state,
                suggestions: action.value.length > 0 ? engagementTypes.filter((type) => type.toLowerCase().startsWith(action.value.toLowerCase())) : []
            };
        default:
            return state;
    }
}
