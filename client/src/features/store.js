import { configureStore } from '@reduxjs/toolkit';
import opportunityCreateSlice from './opportunities/opportunityCreateSlice';
import opportunityDetailSlice from './opportunities/opportunityDetailSlice';
import opportunityListSlice from './opportunities/opportunityListSlice';

export default configureStore({
  reducer: {
    opportunityList: opportunityListSlice,
    opportunityDetail: opportunityDetailSlice,
    opportunityCreate: opportunityCreateSlice,
  },
});
