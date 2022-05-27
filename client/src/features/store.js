import { configureStore } from '@reduxjs/toolkit';
import opportunityListSlice from './opportunities/opportunityListSlice';

export default configureStore({
  reducer: {
    opportunityList: opportunityListSlice,
  },
});
