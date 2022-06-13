const { Plan } = require("../models/plans");
const { ObjectId } = require("mongodb");
const { STRIPE_KEY } = require("../lib/constants");
const stripe = require("stripe")(STRIPE_KEY);

exports.createStripePlan = async (obj) => {
  const createdPlan = await stripe.products.create({
    name: obj.name,
    description: obj.description,
    active: true,
  });
  const monthlyPrice = await stripe.prices.create({
    product: createdPlan.id,
    unit_amount_decimal: `${convertCentToDoller(obj.monthlyPrice)}`,
    currency: "usd",
    recurring: { interval: "month" },
    active: true,
  });
  const yearlyPrice = await stripe.prices.create({
    product: createdPlan.id,
    unit_amount_decimal: convertCentToDoller(obj.yearlyPrice),
    currency: "usd",
    recurring: { interval: "year" },
    active: true,
  });
  return { createdPlan, monthlyPrice, yearlyPrice };
};

exports.updateStripePlan = async (obj) => {
  const updatedPlan = await stripe.products.update(obj.planId, {
    name: obj.name,
    description: obj.description,
    active: true,
  });
  const monthlyPrice = await stripe.prices.update(obj.monthlyPriceId, {
    unit_amount_decimal: `${convertCentToDoller(obj.monthlyPrice)}`,
    currency: "usd",
    recurring: { interval: "month" },
    active: true,
  });
  const yearlyPrice = await stripe.prices.update(obj.yearlyPriceId, {
    unit_amount_decimal: convertCentToDoller(obj.yearlyPrice),
    currency: "usd",
    recurring: { interval: "year" },
    active: true,
  });
  return { updatedPlan, monthlyPrice, yearlyPrice };
};

exports.getAllStripePlans = async () => {
  return await stripe.products.list({active:true});
};


exports.getStripePlanById = async (obj) => {
   const plan = await stripe.products.retrieve(obj.planId);
   const monthlyPrice = await stripe.prices.retrieve(obj.monthlyPriceId);
   const yearlyPrice = await stripe.prices.retrieve(obj.yearlyPriceId);
   return {plan, monthlyPrice, yearlyPrice};
};

exports.getAllStripePricesByPlanId = async (planId) => {
   return await stripe.prices.search({
      query: `product:'${planId}' AND active:'true'`,
    });
};

exports.deleteStripePlanById = async (planId, planPrices) => {
   await planPrices?.map(async (price) => {
      console.log(price);
      await stripe.prices.update(price.id, {
         active: false
      });
   })
   return await stripe.products.update(planId, {
      active: false
   });
};

exports.createPlan = async (obj) => {
   return await Plan.create(obj);
};

exports.getPlanByPlanId = async (planId) => {
   return await Plan.findOne({ planId: planId });
};

exports.deletePlanByPlanId = async (planId) => {
   return await Plan.updateOne({ planId: planId }, {active:false});
};

const convertCentToDoller = (price) => {
  return price * 100;
};