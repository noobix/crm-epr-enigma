import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { auth, firestore, storage } from "../../firebase/config";
import { login } from "../authSlice";

export const registerUser = createAsyncThunk(
  "loginUser/registerUser",
  async ({ email, password, regdata, image }, { dispatch }) => {
    try {
      const userCredentails = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredentails.user.uid;
      const control = { ...regdata, uid: uid };
      loadXHR(image).then(function (blob) {
        // loadToStorage(blob, uid);
      });
      await setDoc(doc(firestore, "users", uid), control);
      dispatch(login(true));
    } catch (e) {
      console.log(e);
    }
  }
);
export const signInUser = createAsyncThunk(
  "loginUser/signInUser",
  async ({ email, password }, { dispatch }) => {
    try {
      const userCredentails = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(login(true));
    } catch (error) {
      console.log(error);
    }
  }
);
const loadToStorage = createAsyncThunk(
  "loginUser/loadToStorage",
  async (blob, uid) => {
    const imagesRef = ref(storage, `images/${uid}`);
    await uploadBytes(imagesRef, blob);
  }
);
function loadXHR(url) {
  return new Promise(function (resolve, reject) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.onerror = function () {
        reject("Network error.");
      };
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject("Loading error:" + xhr.statusText);
        }
      };
      xhr.send();
    } catch (err) {
      reject(err.message);
    }
  });
}
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
export const userdata = (state) => state.user;
export default userSlice.reducer;
