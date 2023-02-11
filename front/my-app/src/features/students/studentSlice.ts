import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { login } from './studentAPI';
import ICred from '../../models/Cred';
import jwt_decode from "jwt-decode";

export interface StudentState {
  value: number;
  logged: boolean;
  access: string;
  userName: string;
  email: string
  
  status: 'idle' | 'loading' | 'failed';
}

const initialState: StudentState = {
  value: 0,
  status: 'idle',
  logged: false,
  access: "",
  userName: '',
  email: ''
};

export const loginAsync = createAsyncThunk(
  'login/login',
  async (cred:ICred) => {
    const response = await login(cred);
    return response.data;
  }
);

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {logout:(state)=>{
    state.logged = false
    state.access= ""
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log(action.payload.access)
        state.access = action.payload.access
        console.log(jwt_decode(state.access))
        state.userName = jwt_decode<any>(state.access).username
        state.email = jwt_decode<any>(state.access).email
        state.logged = true;
        //state.status = 'failed';
      })
  },
});

export const { logout} = studentSlice.actions;
export const selectAccess = (state: RootState) => state.student.access;
export const selectLogged = (state: RootState) => state.student.logged;
export const selectuserName = (state: RootState) => state.student.userName;
export const selectemail = (state: RootState) => state.student.email;
export default studentSlice.reducer;
