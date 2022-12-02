
import { SET_TOKEN, SET_USER } from './../actions';
import { initialState } from '../states';

export const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_TOKEN: return { ...state, token: action.token }; break;
        case SET_USER: return { ...state, user: action.user }; break;
        default: return { ...state }; break;
    }
}
