import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { ToastAndroid } from "react-native";
import { auth, firestore, storage } from "../../firebase/config";
import { login, userid } from "../authSlice";

export const registerUser = createAsyncThunk(
  "loginUser/registerUser",
  async ({ email, password, regdata, image }) => {
    try {
      const userCredentails = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredentails.user.uid;
      const control = { ...regdata, uid: uid };
      await uploadProfileImage(uid, image);
      await setDoc(doc(firestore, "users", uid), control);
    } catch (e) {
      console.log(e);
    }
  }
);
export const signInUser = createAsyncThunk(
  "loginUser/signInUser",
  async (details, { dispatch }) => {
    const { email, password } = details;
    try {
      const userCredentails = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ).catch((err) => {
        err.code === "auth/user-not-found"
          ? showToast("Account not found Please register")
          : err.code === "auth/wrong-password"
          ? showToast("Wrong password Try again")
          : showToast(err.message);
      });
      const uid = userCredentails.user.uid;
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);
      const { userType } = docSnap.data();
      dispatch(setUserType(userType));
      dispatch(userid(uid));
      dispatch(login(true));
    } catch (error) {
      console.log(error);
    }
  }
);
const showToast = (message) => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};
const uploadProfileImage = async (uid, image) => {
  try {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const imagesRef = ref(storage, `images/${uid}`);
    await uploadBytes(imagesRef, blob);
  } catch (error) {
    console.log(error);
  }
};
const userSlice = createSlice({
  name: "loginUser",
  initialState: { user: null, userDef: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserType(state, action) {
      state.userDef = action.payload;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
    },
    [signInUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [signInUser.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [signInUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { setUser, setUserType } = userSlice.actions;
export const userdata = ({ persistedReducer: { auth, user } }) => {
  return { user, auth };
};
export default userSlice.reducer;
