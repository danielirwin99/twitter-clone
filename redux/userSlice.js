import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  name: null,
  email: null,
  uid: null,
  photoUrl: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // What we use to pass arguments in redux
    // Changes all the properties to what we are passing in
    setUser: (state, action) => {
      // payload --> What we are passing in
      (state.username = action.payload.username),
        (state.name = action.payload.name),
        (state.email = action.payload.email),
        (state.uid = action.payload.uid),
        (state.photoUrl = action.payload.photoUrl);
    },

    // Changes the properties back to null
    signOutUser: (state) => {
      (state.username = null),
        (state.name = null),
        (state.email = null),
        (state.uid = null),
        (state.photoUrl = null);
    },
  },
});

export const { setUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
