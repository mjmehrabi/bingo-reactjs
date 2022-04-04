const initialState = {marked:[]}
export function CellReducer(state: any = initialState, action: any) {
    switch(action.type) {
        case 'SET_MARKED': {
            if(state.marked.find((element:number) => element === action.number) === undefined) {
                return {...state, marked: [...state.marked, action.number]}
            } else {
                return state
            }
        }
        default:
            return state
    }
}