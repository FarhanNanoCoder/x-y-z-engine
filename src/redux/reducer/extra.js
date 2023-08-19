import {
    createSlice,
    isRejected,
  } from "@reduxjs/toolkit";
  import { message } from "antd";
  
  const initialState = {
    headTitle: "XYZ Engine",
    isSidebarCollapsed: false,
  };
  
  const extraSlice = createSlice({
    name: "extra",
    initialState,
    reducers: {
      setHeadTitle(state, action) {
        if (action.payload) {
          state.headTitle = `${action.payload} | ${initialState.headTitle}`;
        } else {
          state.headTitle = initialState.headTitle;
        }
      },
    },
    // extraReducers: (builder) => {
      
    //   builder.addMatcher(isRejected, (state, action) => {
    //     // state.orderLoader = false;
    //     message.error(action.error.message);
    
    //   });
    // },
  });
  
  export const {  setHeadTitle } = extraSlice.actions;
  export default extraSlice.reducer;
  