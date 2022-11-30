import { configureStore } from '@reduxjs/toolkit';
import MenuReducer from './MenuReducer';


export let baseURI = "http://localhost:3001/";

let newStore = configureStore({
    reducer: {
        MenuReducer,

    }
});


export default newStore;