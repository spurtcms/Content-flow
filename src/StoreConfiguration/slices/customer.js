import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    count: 0,
    EntryListArray_Redux: [],
    header_slug: "blog",
    header_api_result_redux: [],
    header_keyword: "",
    Header_logo_api_result_redux:"",
    Fetching_View_Detail:{},
};


export const customerSlice = createSlice({
    name: "cusromer",
    initialState,
    reducers: {
        addCount: (state, action) => {
            state.count = action.payload;
        },
        EntryList_Redux_function: (state, action) => {
            state.EntryListArray_Redux = action.payload;
        },
        header_slug_Reduc_function: (state, action) => {
            state.header_slug = action.payload;
        },

        Header_api_result_redux_function: (state, action) => {
            state.header_api_result_redux = action.payload;
        },
        Header_keyword_redux_function: (state, action) => {
            state.header_keyword = action.payload;
        },
        Header_logo_api_result_redux_function: (state, action) => {
            state.Header_logo_api_result_redux = action.payload;
        },

        Fetching_View_Detail:(state, action)=>{
            state.Fetching_View_Detail = action.payload;
        },
     


    },
});


export const { addCount, EntryList_Redux_function, header_slug_Reduc_function ,Header_keyword_redux_function,Header_logo_api_result_redux_function , Header_api_result_redux_function, Fetching_View_Detail} = customerSlice.actions;

export default customerSlice.reducer;
