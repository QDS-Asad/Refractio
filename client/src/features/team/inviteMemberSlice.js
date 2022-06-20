import { createSlice } from "@reduxjs/toolkit";
import refractioApi from "../../common/refractioApi";

// initial state
export const initialState = {
  loading: false,
  error: null,
  success: false,
};

// our slice
const inviteMemberSlice = createSlice({
  name: "inviteMember",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.success = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
});
// export the actions
export const {
  setLoading,
  setSuccess,
  setError,
  reset,
} = inviteMemberSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const inviteMemberSelector = (state) => state.inviteMember;

// export the default reducer
export default inviteMemberSlice.reducer;

// fetch all opportunities
export const inviteMember = (body) => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(setSuccess(false));
    await refractioApi.post("/users/invite-account", {
      email: body.email,
      roleId: body.role,
    });
    dispatch(setSuccess(true));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const resetInviteTeamMember = () => async (dispatch) => {
  dispatch(reset());
};
