require('dotenv').config();

module.exports = Object.freeze({
    PORT: `${process.env.PORT}`,
    NODE_ENV: `${process.env.NODE_ENV}`,
    CRYPTO_KEY: `${process.env.CRYPTO_KEY}`,
    JWT_KEY: `${process.env.JWT_KEY}`,
    CONNECTION_STRING: `${process.env.DB_URI}`,
    MIGRATION_STRING: 'mongodb+srv://qdsravi:iBQFBbRGpVOgbkSQ@cluster0.mt4zc.mongodb.net/refractio_db_new?retryWrites=true&w=majority',
    SESSION_SECRET: `${process.env.SESSION_SECRET}`,
    CLIENT_HOST: `${process.env.CLIENT_HOST}`,
    SERVER_HOST: `${process.env.SERVER_HOST}`,
    MAIL_USERNAME: `${process.env.MAIL_USERNAME}`,
    MAIL_PASSWORD: `${process.env.MAIL_PASSWORD}`,
    MAIL_SERVICE: `${process.env.MAIL_SERVICE}`,
    SUPER_ADMIN_EMAIL: `${process.env.SUPER_ADMIN_EMAIL}`,
    SUPER_ADMIN_PASSWORD: `${process.env.SUPER_ADMIN_PASSWORD}`,
    EMAIL_TYPES: {
        VERIFY_REGISTER: "verify-register",
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
    SUBSCRIPTION_STATUS: {
      SUCCESS: "success",
      FAILED: "failed",
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
    JWT_EXPIRY: '2h',//2hrs
    SUCCESS_MESSAGE:{
        ACTIVATION_MAIL_SENT: "Activation email is sent successfully",
        ACTIVATION_MAIL_VERIFIED: "Email verified successfully",
        USER_REGISTERED: "User Registered Successfully",
        VERIFY_EMAIL_SUBJECT: "Verify Your Email",
        EMAIL_SENT: "Email sent successfully.",
        PASSWORD_RESET_SUCCESS: "Password reset successfully.",
        DB_CONNECTED: "Connected to the Database",
        DEFAULT_ROLES: "Default Roles Created Successfully",
        SUPER_ADMIN_CREATED: "Super Admin Created Successfully",
        LOGIN_SUCCESS: "Login Successfully",

    },
    ERROR_MESSAGE:{
        INVALID_EMAIL: "Invalid email",
        INVALID_TOKEN: "Invalid OTP",
        INVALID_CREDS: "Invalid Credentials",
        USER_NOT_VERIFIED: "User not verified.",
        DB_NOT_CONNECTED: "Cannot Connect to the Databases.",
        UNAUTHORIZED: "authorization denied.",
        NO_DATA: "No data available.",
        NOT_FOUND: "Not found.",
        FULL_NAME: "Full name can not be empty!",
        EMAIL: "Email can not be empty!",
        PASSWORD: "Password name can not be empty!",
        NEW_PASSWORD: "New Password name can not be empty!",
        CONFIRM_PASSWORD: "Confirm Password name can not be empty!",
        ALLREADY_REGISTERED: "Already registered!",
        ALLREADY_VERIFIED: "Already Verified!",
        EMAIL_SENT_FAILED: "unable to send email!",
        DEFAULT_ROLES_FAILED: "Error in creating Default Roles!",
        SUPER_ADMIN_FAILED: "Error in creating Super Admin!",
        DEFAULT_ROLES_EXIST: "Roles already exist!",
        SUPER_ADMIN_EXIST: "Super Admin already exist!",
        TOKEN_EXPIRED: "OTP expired. Please request again!",
        PASSWORD_MUST_SAME: "New password and confirm password must be same!",
    },
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
    }
});