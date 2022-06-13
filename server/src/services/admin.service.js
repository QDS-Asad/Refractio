const { Plan } = require("../models/plans");
const { ObjectId } = require('mongodb');
const { STRIPE_KEY} = require("../lib/constants");
const stripe = require('stripe')(STRIPE_KEY);

exports.createStripePlan = async (obj) => {
   const createdPlan = await stripe.products.create({
      name: obj.name,
      description: obj.description,
      active: true,

   });
   const monthlyPrice = await stripe.prices.create({
      product: createdPlan.id,
      unit_amount_decimal: `${convertCentToDoller(obj.monthlyPrice)}`,
      currency: 'usd',
      recurring: {interval: 'month'},
      active: true,
    });
   const yearlyPrice = await stripe.prices.create({
      product: createdPlan.id,
      unit_amount_decimal: convertCentToDoller(obj.yearlyPrice),
      currency: 'usd',
      recurring: {interval: 'year'},
      active: true,
    });
    return {createdPlan, monthlyPrice, yearlyPrice};

}

const convertCentToDoller = (price) => {
   return price * 100;
}

exports.createPlan = async (obj) => {
   return await Plan.create(obj);
}