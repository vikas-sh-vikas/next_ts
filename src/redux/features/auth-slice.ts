import { createSlice,PayloadAction } from "@reduxjs/toolkit";
type InitialState = {
    value: AuthState;
}
type AuthState = {
    isAuth: boolean,
    username: string,
    uid:string,
    isModerator:boolean,    
}
const initialState = {
    value:{
        isAuth: false,
        username:"",
        uid:"",
        isModerator:false,
    } as AuthState
} as InitialState;

export const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logOut: () => {
            return initialState;
        },
        logIn: (state,actions: PayloadAction<string>) => 
        {
            // console.log("slice")
            console.log("Reach logIn Function",actions)
            return {
                value:{
                    isAuth: true,
                    username: actions.payload,
                    uid:"nslkdlsdnclsndcmldsc",
                    isModerator:false,
                },
            }
        }

    }
});

export const {logOut,logIn} = auth.actions;
export default auth.reducer;