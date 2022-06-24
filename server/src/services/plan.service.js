const { Plan } = require("../models/plans");
const { User } = require("../models/users");
const { ObjectId } = require("mongodb");
const { STRIPE_KEY } = require("../lib/constants");
const stripe = require("stripe")(STRIPE_KEY);

exports.createStripePlan = async (obj) => {
  const createdPlan = await stripe.products.create({
    name: obj.name,
    description: obj.description,
    active: true,
  });
  let createdPrices = [];
  await Promise.all(
    obj.prices.map(async (price) => {
      let stripPrice = await createStripePrice({
        createdPlanId: createdPlan.id,
        amount: price.amount,
        interval: price.interval,
      });
      stripPrice && createdPrices.push(stripPrice.id);
    })
  );
  return { createdPlan, createdPrices };
};

exports.updateStripePlan = async (obj) => {
  const updatedPlan = await stripe.products.update(obj.planId, {
    name: obj.name,
    description: obj.description,
    active: true,
  });
  let createdPrices = [];
  obj.priceIds.map(async(price) => {
    await delStripePriceById(price);
  })
  await Promise.all(
    obj.prices.map(async (price) => {
      let stripPrice = await createStripePrice({
        createdPlanId: obj.planId,
        amount: price.amount,
        interval: price.interval,
      });
      stripPrice && createdPrices.push(stripPrice.id);
    })
  );
  return { updatedPlan, createdPrices };
};

exports.getAllStripePlans = async () => {
  let plansList = [];
  let plans = await stripe.products.list({ active: true });
  plans.data.sort((a, b) => a.created - b.created);
  await Promise.all(
    plans.data.map(async (plan) => {
      let priceData = await stripe.prices.search({
        query: `product:'${plan.id}' AND active:'true'`,
      });
      let prices = [];
      priceData.data.map(async (price) => {
        let filterPrices = {
          id: price.id,
          amount: convertDollerToCent(price.unit_amount),
          interval: price.recurring.interval
        }
        prices.push(filterPrices);
      })
      let filterPlan = {
        id: plan.id,
        name: plan.name,
        description: plan.description,
        prices
      }
      plansList.push(filterPlan)
    })
  );
  return plansList;
};

exports.getStripePlanById = async (obj) => {
  const plan = await stripe.products.retrieve(obj.planId);
  let prices = [];
  await Promise.all(
    obj.prices.map(async (price) => {
      let priceData = await stripe.prices.retrieve(price);
      priceData && prices.push(priceData);
    })
  );
  return { ...plan, prices };
};

exports.getAllStripePricesByPlanId = async (planId) => {
  return await stripe.prices.search({
    query: `product:'${planId}' AND active:'true'`,
  });
};

exports.deleteStripePlanById = async (planId, planPrices = []) => {
  planPrices.map(async (price) => {
    delStripePriceById(price.id);
  });
  return await stripe.products.update(planId, {
    active: false,
  });
};

const createStripePrice = async (obj) => {
  return await stripe.prices.create({
    product: obj.createdPlanId,
    unit_amount_decimal: convertCentToDoller(obj.amount),
    currency: "usd",
    recurring: { interval: obj.interval },
    active: true,
  });
};

const delStripePriceById = async (priceId) => {
  await stripe.prices.update(priceId, {
    active: false,
  });
};

exports.createPlan = async (obj) => {
  return await Plan.create(obj);
};

exports.updatePlan = async (planId, obj) => {
  return await Plan.findOneAndUpdate({ planId: planId }, obj);
};

exports.getPlanByPlanId = async (planId) => {
  return await Plan.findOne({ planId: planId });
};

exports.deletePlanByPlanId = async (planId) => {
  return await Plan.updateOne({ planId: planId }, { active: false });
};

exports.getUserPlanByPlanId = async (planId) => {
  return await User.find({
     'stripeDetails.subscription.planId': planId
  })
}

const convertCentToDoller = (price) => {
  return price * 100;
};

const convertDollerToCent = (price) => {
  return price / 100;
};
