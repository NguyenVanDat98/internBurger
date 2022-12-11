import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    auth: null,
    userName: "",
    password: "",
    email: "",
    address: "",
    telephone: "",
  },
  reducers: {
    login: (state, action) => {
      state.auth = action.payload;
    },
    setUser: (state, action) => {
      if(!action.payload){
        return
      }
      const { email, address, telephone, userName, password } = action.payload;
      state.email = email;
      state.telephone = telephone;
      state.userName = userName;
      state.address = address;
      state.password = password;
    },
  },
});

export const { login, setUser } = user.actions;
