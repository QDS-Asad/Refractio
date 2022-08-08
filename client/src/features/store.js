import { configureStore } from '@reduxjs/toolkit';
import { interceptor } from '../common/refractioApi';
import authForgetPasswordSlice from './auth/authForgetPasswordSlice';
import authLoginSlice from './auth/authLoginSlice';
import authNewPasswordSlice from './auth/authNewPasswordSlice';
import authRegisterSlice from './auth/authRegisterSlice';
import authVerifyCodeSlice from './auth/authVerifyCodeSlice';
import roleListSlice from './roles/roleList';
import opportunityCreateSlice from './opportunities/opportunityCreateSlice';
import opportunityDetailSlice from './opportunities/opportunityDetailSlice';
import opportunityListSlice from './opportunities/opportunityListSlice';
import inviteMemberSlice from './team/inviteMemberSlice';
import teamListSlice from './team/teamListSlice';
import cancelMemberSlice from './team/cancelMemberSlice';
import resendInviteMemberSlice from './team/resendInviteMemberSlice';
import authVerifyMemberSlice from './auth/authVerifyMemberSlice';
import authRegisterMemberSlice from './auth/authRegisterMemberSlice';
import changeMemberRoleSlice from './team/changeMemberRoleSlice';
import planListSlice from './plans/planListSlice';
import addPlanSlice from './plans/addPlanSlice';
import editPlanSlice from './plans/editPlanSlice';
import removePlanSlice from './plans/removePlanSlice';
import removeMemberSlice from './team/removeMemberSlice';
import subscriptionSlice from './subscriptions/subscriptionSlice';
import billingListSlice from './billing/billingListSlice';
import subscriptionDetailSlice from './subscriptions/subscriptionDetailSlice';
import changeCardSlice from './billing/changeCardSlice';
import subscriptionCancelSlice from './subscriptions/subscriptionCancelSlice';
import subscriptionResumeSlice from './subscriptions/subscriptionResumeSlice';
import workspaceListSlice from './workspace/workspaceListSlice';
import workspaceSelectSlice from './workspace/workspaceSelectSlice';
import workspaceJoinSlice from './workspace/workspaceJoinSlice';
import orderListSlice from './orders/orderListSlice';
import opportunityManageListSlice from './opportunities/opportunityManageListSlice';
import opportunityResponseSlice from './opportunities/opportunityResponseSlice';
import opportunityEvaluateSlice from './opportunities/opportunityEvaluateSlice';
import editProfileSlice from './team/editProfileSlice';
import deleteMemberSlice from './team/deleteMemberSlice';
import transferOwnerSlice from './team/transferOwnerSlice';
import teamParticipantsSlice from './team/teamParticipantsSlice';
import opportunityGetResponseSlice from './opportunities/opportunityGetResponseSlice';
import changeTeamNameSlice from './team/changeTeamNameSlice';
import getUsersSlice from './team/getUsersSlice';

const store = configureStore({
  reducer: {
    authLogin: authLoginSlice,
    authRegister: authRegisterSlice,
    authVerifyCode: authVerifyCodeSlice,
    authForgetPassword: authForgetPasswordSlice,
    authNewPassword: authNewPasswordSlice,
    authVerifyMember: authVerifyMemberSlice,
    authRegisterMember: authRegisterMemberSlice,
    subscription: subscriptionSlice,
    roleList: roleListSlice,
    opportunityList: opportunityListSlice,
    opportunityDetail: opportunityDetailSlice,
    opportunityCreate: opportunityCreateSlice,
    teamList: teamListSlice,
    inviteMember: inviteMemberSlice,
    cancelMember: cancelMemberSlice,
    removeMember: removeMemberSlice,
    resendInviteMember: resendInviteMemberSlice,
    changeMemberRole: changeMemberRoleSlice,
    planList: planListSlice,
    addPlan: addPlanSlice,
    editPlan: editPlanSlice,
    removePlan: removePlanSlice,
    billingList: billingListSlice,
    subscriptionDetail: subscriptionDetailSlice,
    changeCard: changeCardSlice,
    subscriptionCancel: subscriptionCancelSlice,
    subscriptionResume: subscriptionResumeSlice,
    opportunityResponse: opportunityResponseSlice,
    opportunityEvaluate: opportunityEvaluateSlice,
    workspaceList: workspaceListSlice,
    workspaceSelect: workspaceSelectSlice,
    workspaceJoin: workspaceJoinSlice,
    orderList: orderListSlice,
    opportunityManageList: opportunityManageListSlice,
    editProfile: editProfileSlice,
    deleteMember: deleteMemberSlice,
    transferOwner: transferOwnerSlice,
    teamParticipants: teamParticipantsSlice,
    opportunityGetResponse: opportunityGetResponseSlice,
    changeTeamName: changeTeamNameSlice,
    getUsers: getUsersSlice,
  },
});

interceptor(store);
export default store;
