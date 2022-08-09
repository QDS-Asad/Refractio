const { ObjectId } = require("mongodb");
const {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NO,
  USER_STATUS,
} = require("../lib/constants");
const { Team } = require("../models/teams");
const users = require("../models/users");
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
  const { page, page_size, teamId, user, OwnerId } = obj;
  const options = {
    page: page || DEFAULT_PAGE_NO,
    limit: page_size || DEFAULT_PAGE_SIZE,
    sort: {
      createdAt: 1, //Sort by Date Added ASC
    },
    select: {
      stripeDetails: 0,
      password: 0,
      token: 0,
      autoRenew: 0,
      tokenExpiry: 0,
      createdBy: 0,
      updatedBy: 0,
    },
  };
  return await User.paginate(
    {
      // ...(!user.isOwner && {_id: {$nin: OwnerId}}),
      teams: {
        $elemMatch: {
          teamId: ObjectId(teamId),
          status: { $nin: USER_STATUS.DISABLED },
        },
      },
      // "teams.teamId": ObjectId(teamId),
      // "teams.roleId": { $in: roleIds },
      // "teams.status": { $nin: USER_STATUS.DISABLED },
    },
    options
  );
};

exports.getAllUsers = async (obj) => {
  const { page, page_size } = obj;
  const options = {
    page: page || DEFAULT_PAGE_NO,
    limit: page_size || DEFAULT_PAGE_SIZE,
    sort: {
      createdAt: 1, //Sort by Date Added ASC
    },
    select: {
      password: 0,
      token: 0,
      tokenExpiry: 0,
      createdBy: 0,
      updatedBy: 0,
    },
  };
  return await User.paginate(
    {
      isSuperAdmin: false,
      // ...(!user.isOwner && {_id: {$nin: OwnerId}}),
      // teams: {
      //   $elemMatch: {
      //     teamId: ObjectId(teamId),
      //     status: { $nin: USER_STATUS.DISABLED },
      //   },
      // },
      // "teams.teamId": ObjectId(teamId),
      // "teams.roleId": { $in: roleIds },
      // "teams.status": { $nin: USER_STATUS.DISABLED },
    },
    options
  );
};

exports.getAllTeams = async (obj) => {
  const { page, page_size } = obj;
  const options = {
    page: page || DEFAULT_PAGE_NO,
    limit: page_size || DEFAULT_PAGE_SIZE,
    sort: {
      createdAt: 1, //Sort by Date Added ASC
    },
    select: {
      createdBy: 0,
      updatedBy: 0,
    },
  };
  return await Team.paginate(
    {},
    options
  );
};

exports.getUsersByTeamId = async (teamId) => {
  return await User.find({
    teams: {
      $elemMatch: {
        teamId: ObjectId(teamId),
        status: { $nin: USER_STATUS.DISABLED },
      },
    },
  });
};

exports.getTeamMembers = async (user) => {
  return await User.find({
    // _id: { $nin: user._id },
    teams: {
      $elemMatch: {
        teamId: ObjectId(user.teamId),
        status: { $in: [USER_STATUS.ACTIVE] },
      },
    },
  }).select({ _id: 1, firstName: 1, lastName: 1, email: 1 });
};

exports.getTeamAllMembers = async (teamId) => {
  return await User.find({
    // _id: { $nin: user._id },
    teams: {
      $elemMatch: {
        teamId: ObjectId(teamId)
      },
    },
  });
};

exports.getUsersByTeamIdRoleId = async (user, adminRole) => {
  return await User.find({
    _id: { $nin: user._id },
    teams: {
      $elemMatch: {
        teamId: ObjectId(user.teamId),
        roleId: ObjectId(adminRole._id),
        status: USER_STATUS.ACTIVE,
      },
    },
  }).select({ _id: 1, firstName: 1, lastName: 1, email: 1 });
};

exports.getUserSelectedTeamByTeamId = (user, teamId) => {
  return user.teams.find((obj) => obj.teamId.toString() === teamId);
};
