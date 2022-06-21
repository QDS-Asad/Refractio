const { ObjectId } = require("mongodb");
const {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NO,
  USER_STATUS,
} = require("../lib/constants");
const { Team } = require("../models/teams");
const { User } = require("../models/users");

exports.createTeam = async (obj) => {
  return await Team.create(obj);
};

exports.updateTeamMembers = async (teamId, obj) => {
  return await Team.findByIdAndUpdate({ _id: teamId }, obj);
};

exports.getTeamById = async (teamId) => {
  return await Team.findOne({ _id: teamId });
};

exports.getTeam = async (obj) => {
  const { page, page_size, user, teamId, roleIds } = obj;
  const options = {
    page: page || DEFAULT_PAGE_NO,
    limit: page_size || DEFAULT_PAGE_SIZE,
    sort: {
      createdAt: 1, //Sort by Date Added ASC
    },
    select: {
      stripeDetails: 0,
      password:0,
      token:0,
      autoRenew:0,
      tokenExpiry:0,
      createdBy:0,
      updatedBy:0
    },
  };
  return await User.paginate(
    {
      teamId,
      roleId: { $nin: roleIds },
      status: { $nin: USER_STATUS.DISABLED },
    },
    options
  );
};
