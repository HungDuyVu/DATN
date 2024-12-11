import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   interactsList: [],
   interactsDetail: null,
   loading: false,
   error: null,
};

export const getAllInteractions = createAsyncThunk("interactions/getAllInteractions", async () => {
   const response = await axios.get(`http://localhost:5000/api/interactions/all`);
   return response.data;
});

export const detailInteractionsUser = createAsyncThunk("interactions/detailInteractionsUser", async (userId) => {
   const response = await axios.get(`http://localhost:5000/api/interactions/detail/${userId}`);
   return response.data;
});

export const logInteraction = createAsyncThunk("interactions/logInteraction", async ({ userId, productId, action }) => {
   const response = await axios.post(`http://localhost:5000/api/interactions/interact/${userId}/${productId}`, {
      action
   });

   return response.data;
});

const interactionSlice = createSlice({
   name: "interaction",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllInteractions.pending, (state) => {
            state.loading = true;
         })
         .addCase(getAllInteractions.fulfilled, (state, action) => {
            state.loading = false;
            state.interactsList = action.payload;
         })
         .addCase(getAllInteractions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(detailInteractionsUser.pending, (state) => {
            state.loading = true;
         })
         .addCase(detailInteractionsUser.fulfilled, (state, action) => {
            state.loading = false;
            state.interactsDetail = action.payload;
         })
         .addCase(detailInteractionsUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(logInteraction.pending, (state) => {
            state.loading = true;
         })
         .addCase(logInteraction.fulfilled, (state, action) => {
            state.loading = false;
            // không cần phải cập nhật lại toàn bộ danh sách các tương tác (interactsList) nếu chỉ có một tương tác bị thay đổi. Thay vào đó, bạn chỉ cần cập nhật đúng tương tác đó trong danh sách.
            state.interactsList = state.interactsList.map(interact =>
               interact._id === action.payload._id ? action.payload : interact
            );
            // state.interactsList = action.payload;

         })
         .addCase(logInteraction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         });
   }
});

export default interactionSlice.reducer;
