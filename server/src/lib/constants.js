require('dotenv').config();

module.exports = Object.freeze({
    PORT: `${process.env.PORT}`,
    NODE_ENV: `${process.env.NODE_ENV}`,
    CRYPTO_KEY: `${process.env.CRYPTO_KEY}`,
    JWT_KEY: `${process.env.JWT_KEY}`,
    CONNECTION_STRING: `${process.env.DB_URI}`,
    MIGRATION_STRING: 'mongodb+srv://qdsravi:iBQFBbRGpVOgbkSQ@cluster0.mt4zc.mongodb.net/refractio_db_v2?retryWrites=true&w=majority',
    STRIPE_KEY: `${process.env.STRIPE_KEY}`,
    SESSION_SECRET: `${process.env.SESSION_SECRET}`,
    CLIENT_HOST: `${process.env.CLIENT_HOST}`,
    SERVER_HOST: `${process.env.SERVER_HOST}`,
    MAIL_USERNAME: `${process.env.MAIL_USERNAME}`,
    MAIL_PASSWORD: `${process.env.MAIL_PASSWORD}`,
    MAIL_SERVICE: `${process.env.MAIL_SERVICE}`,
    SUPER_ADMIN_EMAIL: `${process.env.SUPER_ADMIN_EMAIL}`,
    SUPER_ADMIN_PASSWORD: `${process.env.SUPER_ADMIN_PASSWORD}`,
    DEFAULT_PAGE_NO: 0,
    DEFAULT_PAGE_SIZE: 10,
    TOTAL_TEAM_ADMIN: 3,
    TOTAL_TEAM_ORGANIZER: 3,
    TOTAL_TEAM_MEMBERS: 24,
    EMAIL_TYPES: {
        VERIFY_REGISTER: "verify-register",
        INVITE_USER: "invite-user",
        FORGOT_PASSWORD: "forgot-password",
    },
    ROLES: {
        SUPER_ADMIN: 1,
        ADMIN: 2,
        ORGANIZER: 3,
        PARTICIPANT: 4,
    },
    USER_STATUS : {
      ACTIVE: "active",
      DISABLED: "disabled",
      INVITE_SENT: "invite_sent",
      SUBSCRIPTION_PENDING: "subscription_pending",
    },
    TEAM_STATUS: {
      ACTIVE: "active",
      DISABLED: "disabled"
    },
    SUBSCRIPTION_STATUS: {
      SUCCESS: "success",
      FAILED: "failed",
      CANCELED: "canceled",
      ACTIVE: "active"
    },
    PAYMENT_STATUS: {
      SUCCESS: "Approved",
      FAILED: "Failed",
      CANCELED: "Canceled",
      TRIAL_END: "Subscription Trial End",
      UNKNOWN: "Unknown"
    },
    PAYMENT_METHOD: {
      CARD: 'card',
    },
    HTTP_STATUS: {
        SUCCESS: {CODE: 200, TEXT: "Success"},
        BAD_REQUEST: {CODE: 400, TEXT: "Bad Request"},
        UNAUTHORIZED: {CODE: 401, TEXT: "Unauthorized"},
        NOT_FOUND: {CODE: 404, TEXT: "Not Found"},
        INTERNAL_SERVER: {CODE: 500, TEXT: "Internal Server Error"},
    },
    REGEX_PATTERN: {
        PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    },
    TOKEN_EXPIRY: 3600000,//1hr
    JWT_EXPIRY: '24h',//24hrs
    JWT_EXPIRY_REMEMBER_ME: '7d',//7days
    SUCCESS_MESSAGE:{
        ACTIVATION_MAIL_SENT: "Activation email is sent successfully",
        ACTIVATION_MAIL_VERIFIED: "Email verified successfully",
        USER_REGISTERED: "User Registered Successfully",
        EMAIL_SENT: "Email sent successfully.",
        PASSWORD_RESET_SUCCESS: "Password reset successfully.",
        DB_CONNECTED: "Connected to the Database",
        DEFAULT_ROLES: "Default Roles Created Successfully",
        SUPER_ADMIN_CREATED: "Super Admin Created Successfully",
        LOGIN_SUCCESS: "Login Successfully",
        DATA_FETCHED: "Fetched Successfully",
        SUBSCRIBED: "Subscribed Successfully",
        CREATED: "Created Successfully",
        UPDATED: "Updated Successfully",
        DELETED: "Deleted Successfully",
        CANCELED: "Canceled Successfully",
        TRANSFERED: "Transfered Succesfully"

    },
    ERROR_MESSAGE:{
        INVALID_EMAIL: "Invalid email",
        INVALID_TOKEN: "Invalid OTP",
        INVALID_CREDS: "Invalid Credentials",
        USER_NOT_VERIFIED: "User not verified.",
        DB_NOT_CONNECTED: "Cannot Connect to the Databases.",
        PLAN_USED: "Cannot delete this plan.It is subscribed by user(s)",
        SUBSCRIBED: "Already Subscribed!",
        SUBSCRIBED_CANCELED: "Subscription Canceled or Expired!",
        UNAUTHORIZED: "authorization denied.",
        NO_DATA: "No data available.",
        NOT_FOUND: "Not found.",
        INVALID_ENDPOINT: "Invalid api endpoint!",
        FULL_NAME: "Full name can not be empty!",
        EMAIL: "Email can not be empty!",
        PASSWORD: "Password can not be empty!",
        NEW_PASSWORD: "New Password name can not be empty!",
        CONFIRM_PASSWORD: "Confirm Password name can not be empty!",
        PASSWORD_MUST_SAME: "New password and confirm password must be same!",
        NAME: "Name can not be empty!",
        DESCRIPTION: "Description can not be empty!",
        MONTHLY_PRICE: "Monthly Price can not be empty!",
        YEARLY_PRICE: "Yearly Price can not be empty!",
        MUST_NUMERIC: "Must be numeric!",
        MUST_BOOLEAN: "Must be boolean!",
        REQUIRED: "Is required!",
        NOT_EMPTY: "Cannot be empty!",
        INVALID_PASSWORD: "Invalid password!",
        ALLREADY_REGISTERED: "Already registered!",
        ALLREADY_VERIFIED: "Already Verified!",
        ALLREADY_INVITED: "Already Invited!",
        EMAIL_SENT_FAILED: "unable to send email!",
        DEFAULT_ROLES_FAILED: "Error in creating Default Roles!",
        SUPER_ADMIN_FAILED: "Error in creating Super Admin!",
        DEFAULT_ROLES_EXIST: "Roles already exist!",
        SUPER_ADMIN_EXIST: "Super Admin already exist!",
        TOKEN_EXPIRED: "OTP expired. Please request again!",
        TEAM_LIMIT_EXCEED:"Team limit reached. You can add only 24 team members!",
        TEAM_ADMIN_LIMIT_EXCEED:"Team Administrator limit reached. A Team can have 3 Administrators only!",
        TEAM_ORGANIZER_LIMIT_EXCEED:"Team Organizer limit reached. A Team can have 3 Organizers only!",
    },
    VERIFY_REGISTER_EMAIL_SUBJECT: "Verify your email",
    VERIFY_REGISTER_EMAIL_TEMPLATE: (params) => {
        return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Refractio</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Refractio. Use the following OTP to complete your Sign Up procedures. OTP is valid for 1 hour.</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${params.token}</h2>
          <p style="font-size:0.9em;">Regards,<br />Refractio</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Refractio Inc</p>
            <p>Address</p>
            <p>City</p>
          </div>
        </div>
      </div>`
    },
    FORGOT_PASSWORD_EMAIL_SUBJECT: "Reset your password",
    FORGOT_PASSWORD_EMAIL_TEMPLATE: (params) => {
        return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Refractio</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Please use this link to reset your password</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><a href="${params.link}" style="color:#ffff;text-decoration:none;">Reset Your Password</a></h2>
          <p style="font-size:0.9em;">Regards,<br />Refractio</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Refractio Inc</p>
            <p>Address</p>
            <p>City</p>
          </div>
        </div>
      </div>`
    },
    INVTE_USER_EMAIL_SUBJECT: "Invitation: Join your Team at Refractio",
    INVTE_USER_EMAIL_TEMPLATE: (params) => {
        return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Refractio</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>You are invited to join your Team at Refractio</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><a href="${params.link}" style="color:#ffff;text-decoration:none;">Accept Invite</a></h2>
          <p style="font-size:0.9em;">Your team values your thoughts and ideas; Refractio is software to help your team overcome communication constraints and more efficiently and effectively achieve your goals.</p>
          <br />
          <p style="font-size:0.9em;">This invitation is sent to ${params.recipientEmail} from ${params.senderEmail} from Refractio.</p>
          <p style="font-size:0.9em;">Regards,<br />Refractio</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Refractio Inc</p>
            <p>Address</p>
            <p>City</p>
          </div>
        </div>
      </div>`
    }
});