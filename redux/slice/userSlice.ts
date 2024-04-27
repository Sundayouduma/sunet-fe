import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/constant";

export interface UserData {
  token: string
}

interface loginData {
  password: string;
  email: string;
}

export const loginUser = createAsyncThunk<UserData, loginData, {}>(
  "user/login",
  async(loginData: loginData, {rejectWithValue}) => {
    try{
      const response: any = await axios.post(`${API_URL}/auth/login`, loginData,{
        headers:{
          "Content-Length": "appliction/json"
        }
      })

      return response.data
    }catch(error: any){
      if (error.reponse.data.message){
        return rejectWithValue(error.reponse.data.message)
      }else{
        return rejectWithValue("An error occured, please try again later")
      }
    }
  }
)