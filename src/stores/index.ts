import { IUser } from './../@types';


export { Store } from "./store";

export interface RootState {
    clickState: {
        token: string,
        user: IUser
    };
}