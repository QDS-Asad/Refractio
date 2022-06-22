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
    {customer: userInfo.stripeDetails.customerId}
  );
  const customer = await stripe.customers.update(userInfo.stripeDetails.customerId, {
    invoice_settings: {
      default_payment_method: paymentMethod.id,
    },
  });
  return customer;
};

exports.createSubscription = async ({request, customerId}) => {
  const customer = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {price: request.priceId},
    ],
    cancel_at_period_end: !request.autoRenew
  });
  return customer;
};

exports.saveBillingHistory = async (obj) => {
  return await Billing.create(obj);
};