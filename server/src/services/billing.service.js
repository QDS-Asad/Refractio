const { Billing } = require("../models/billing");
const { User } = require("../models/users");
const { ObjectId } = require("mongodb");
const { STRIPE_KEY, PAYMENT_METHOD } = require("../lib/constants");
const stripe = require("stripe")(STRIPE_KEY);

exports.paymentMethod = async (obj) => {
  const exp_month = obj.cardExpiry.split('/')[0];
  const exp_year = obj.cardExpiry.split('/')[1];
  const paymentMethod = await stripe.paymentMethods.create({
    type: PAYMENT_METHOD.CARD,
    card: {
      number: obj.cardNumber,
      exp_month,
      exp_year,
      cvc: obj.cardCvv,
    }
  });
  return paymentMethod;
};

exports.createStripeCustomer = async ({paymentMethod, userInfo}) => {
  const customer = await stripe.customers.create({
    name: userInfo.fullName,
    email: userInfo.email,
    payment_method: paymentMethod.id,
    invoice_settings: {
      default_payment_method: paymentMethod.id,
    },
  });
  return customer;
};

exports.updateStripeCustomer = async ({paymentMethod, userInfo}) => {
  await stripe.paymentMethods.attach(
    paymentMethod.id,
    {customer: userInfo.customerId}
  );
  const customer = await stripe.customers.update(userInfo.customerId, {
    invoice_settings: {
      default_payment_method: paymentMethod.id,
    },
  });
  return customer;
};

exports.createSubscription = async ({request, customerId}) => {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {price: request.priceId},
    ],
    cancel_at_period_end: !request.autoRenew
  });
  return subscription;
};

exports.updateSubscription = async ({request, subscriptionId}) => {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: !request.autoRenew
  });
  return subscription;
};

exports.cancelResumeSubscription = async (subscriptionId, status) => {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: status
  });
  return subscription;
};

exports.saveBillingHistory = async (obj) => {
  return await Billing.create(obj);
};

exports.getBillingHistory = async (obj) => {
  const { page, page_size, userId, teamId } = obj;
  const options = {
    page: page || DEFAULT_PAGE_NO,
    limit: page_size || DEFAULT_PAGE_SIZE,
    sort: {
      createdAt: 1, //Sort by Date Added ASC
    },
    select: {},
  };
  return await Billing.paginate(
    {
      userId,
      teamId
    },
    options
  );
}