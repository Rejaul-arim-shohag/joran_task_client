import { configureStore } from '@reduxjs/toolkit';
import settingReducer from "../stateSlice/settingSlice";
import taskReducer from "../stateSlice/taskSlice";
import summaryReducer from "../stateSlice/summarySlice";
import profileReducer from "../stateSlice/profileSlice"
export default configureStore({
    reducer:{
        settings:settingReducer,
        task:taskReducer,
        summary:summaryReducer,
        profile:profileReducer,
    }
})