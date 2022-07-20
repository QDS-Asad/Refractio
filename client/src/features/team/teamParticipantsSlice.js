import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';
import { fetchOpportunity } from '../opportunities/opportunityDetailSlice';

// initial state
export const initialState = {
  loading: false,
  error: null,
  members: [],
  success: false,
};

// our slice
const teamParticipantsSlice = createSlice({
  name: 'teamParticipants',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    setMemberList: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.members = payload;
      state.success = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      state.members = [];
    },
    setSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
  },
});
// export the actions
export const {
  setLoading,
  setMemberList,
  setError,
  setSuccess,
} = teamParticipantsSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const teamMembersSelector = (state) => state.teamParticipants;

// export the default reducer
export default teamParticipantsSlice.reducer;

// fetch all members
export const fetchMemberList = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.get(`/users/team-members`);
    dispatch(setMemberList(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const addMemberOpportunity = (opportunityId, userId) => async (
  dispatch
) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.put(
      `/opportunities/add-opportunity-member/${opportunityId}/${userId}`
    );
    dispatch(fetchOpportunity(opportunityId));
    dispatch(setSuccess());
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const removeMemberOpportunity = (opportunityId, userId) => async (
  dispatch
) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.delete(
      `/opportunities/remove-opportunity-member/${opportunityId}/${userId}`
    );
    dispatch(fetchOpportunity(opportunityId));
    dispatch(setSuccess());
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
