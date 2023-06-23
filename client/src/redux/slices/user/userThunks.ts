import { createAsyncThunk } from "@reduxjs/toolkit";
import { check, login, registration } from "../../../http/userApi";
import { IUser } from "../../../models/AppModels";

interface authUserData {
   email: string;
   password: string;
}

export const regUser = createAsyncThunk<IUser, authUserData>(
   "user/regUser",
   async (authArgs, { rejectWithValue, fulfillWithValue }) => {
      const { email, password } = authArgs;

      const response = await registration(email, password);

      if (!response) return rejectWithValue("Ошибка при регистрации пользователя");

      return fulfillWithValue(response);
   }
);

export const logUser = createAsyncThunk<IUser, authUserData>(
    "user/login",
    async (authArgs, { rejectWithValue, fulfillWithValue }) => {
       const { email, password } = authArgs;
 
       const response = await login(email, password);
 
       if (!response) return rejectWithValue("Ошибка при авторизации пользователя");
        
       return fulfillWithValue(response);
    }
 );

export const checkUsersAuth = createAsyncThunk<IUser>(
    "user/checkAuth",
    async (_, { rejectWithValue, fulfillWithValue }) => {
       const response = await check();
 
       if (!response) return rejectWithValue("Ошибка при подтверждении авторизации пользователя");
 
       return fulfillWithValue(response);
    }
 );
