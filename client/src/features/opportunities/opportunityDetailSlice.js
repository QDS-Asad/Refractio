import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  opportunity: null,
  success: false,
  message: '',
  deleted: false,
};

// our slice
const opportunityDetailSlice = createSlice({
  name: 'opportunityDetail',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.success = false;
    },
    setOpportunity: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.opportunity = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    setSuccess: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.opportunity = null;
      state.message = '';
      state.success = false;
      state.deleted = false;
    },
    setDelete: (state, { payload }) => {
      state.deleted = payload;
    },
  },
});
// export the actions
export const {
  setLoading,
  setOpportunity,
  setError,
  reset,
  setSuccess,
  setDelete,
} = opportunityDetailSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const opportunityDetailSelector = (state) => state.opportunityDetail;

// export the default reducer
export default opportunityDetailSlice.reducer;

// fetch opportunity details
export const fetchOpportunity = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.get(`/opportunities/${id}`);
    dispatch(setOpportunity(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const updateOpportunity = (id, status, bodyData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.put(`/opportunities/update/${id}`, {
      status,
      ...bodyData,
    });
    if (status === 'draft') {
      dispatch(setSuccess('Opportunity saved as draft successfully.'));
    } else {
      dispatch(setSuccess('Opportunity published successfully.'));
    }
    dispatch(fetchOpportunity(id));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const deleteOpportunity = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.delete(`/opportunities/delete/${id}`);
    dispatch(setSuccess('Opportunity deleted successfully.'));
    setTimeout(() => {
      dispatch(setDelete(true));
    }, 1000);
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const resetOpportunity = () => async (dispatch) => {
  dispatch(reset());
};
