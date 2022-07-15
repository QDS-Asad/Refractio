import { createSlice } from "@reduxjs/toolkit";
import { localAPI } from "../../common/refractioApi";

// initial state
export const initialState = {
  loading: false,
  error: null,
  opportunity: null,
};

// our slice
const opportunityEvaluateSlice = createSlice({
  name: "opportunityEvaluate",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setOpportunity: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.opportunity = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
// export the actions
export const { setLoading, setOpportunity, setError } =
  opportunityEvaluateSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const opportunityEvaluateSelector = (state) => state.opportunityEvaluate;

// export the default reducer
export default opportunityEvaluateSlice.reducer;

// fetch opportunity details
export const fetchOpportunity = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data } = await localAPI.get("/opportunities.json");
    let opportunity = data.find((o) => o._id === id);
    if (opportunity) {
      setTimeout(() => {
        dispatch(setOpportunity(opportunity));
      }, 1500);
    } else {
      setTimeout(() => {
        dispatch(setError("Opportunity not found."));
      }, 1500);
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};
