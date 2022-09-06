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
export const saveDoctorReply = createAsyncThunk(
  "brook/saveDoctorReply",
  async (rMessage) => {
    try {
      const date = new Date().toLocaleString();
      const control = { ...rMessage, date: date };
      const ref = collection(firestore, "feedreply");
      await addDoc(ref, control);
    } catch (lsq) {
      console.log(lsq);
    }
  }
);
export const saveFeedbackStatus = createAsyncThunk(
  "brook/saveFeedbackStatus",
  async (status) => {
    try {
      const ref = collection(firestore, "status");
      await addDoc(ref, status);
    } catch (lsd) {
      console.log(lsd);
    }
  }
);
