import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveCaseDetails = createAsyncThunk(
  "brook/saveCaseDetails",
  async (caseData) => {
    try {
      const ref = collection(firestore, "case");
      await addDoc(ref, caseData);
    } catch (eld) {
      console.log(eld);
    }
  }
);
export const savePatientFeedback = createAsyncThunk(
  "brook/savePatientFeedback",
  async (feedData) => {
    try {
      const date = new Date().toLocaleString();
      const control = { ...feedData, date: date };
      const ref = collection(firestore, "feedback");
      await addDoc(ref, control);
    } catch (vsz) {
      console.log(vsz);
    }
  }
);
