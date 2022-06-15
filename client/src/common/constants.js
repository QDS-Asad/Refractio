const constants = Object.freeze({
  ROLES: {
    SUPER_ADMIN: 1,
    ADMIN: 2,
    ORGANIZER: 3,
    PARTICIPANT: 4,
  },
  USER_STATUS: {
    ACTIVE: 'active',
    DISABLED: 'disabled',
    INVITE_SENT: 'invite_sent',
    SUBSCRIPTION_PENDING: 'subscription_pending',
  },
  SUBSCRIPTION_STATUS: {
    SUCCESS: 'success',
    FAILED: 'failed',
  },
});

export default constants;
