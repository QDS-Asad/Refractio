export const ROLES = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  ORGANIZER: 3,
  PARTICIPANT: 4,
};

export const USER_STATUS = {
  ACTIVE: 'active',
  DISABLED: 'disabled',
  INVITE_SENT: 'invite_sent',
  SUBSCRIPTION_PENDING: 'subscription_pending',
};

export const SUBSCRIPTION_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELED: 'canceled',
  ACTIVE: 'active',
};

export const PAYMENT_STATUS = {
  SUCCESS: 'Approved',
  FAILED: 'Failed',
  CANCELED: 'Canceled',
  TRIAL_END: 'Subscription Trial End',
  UNKNOWN: 'Unknown',
};

const constants = Object.freeze({
  ROLES,
  USER_STATUS,
  SUBSCRIPTION_STATUS,
  PAYMENT_STATUS,
});

export default constants;
