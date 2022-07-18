/* eslint-disable consistent-return */

import { Roles } from 'meteor/alanning:roles';
import normalizeMeteorUserData from './normalizeMeteorUserData';

const getActiveRoles = (userId) => {
  try {
    return (
      Roles.getAllRoles().map((role) => {
        return {
          ...role,
          inRole: Roles.userIsInRole(userId, role.name),
        };
      }) || []
    );
    // return (
    //   Roles.getAllRoles().map((role) => ({
    //     ...role,
    //     inRole: Roles.userIsInRole(userId, role.name),
    //   })) || []
    // );
  } catch (exception) {
    throw new Error(`[mapMeteorUserToSchema.getActiveRoles] ${exception.message}`);
  }
};

export default (options) => {
  try {
    const normalizedMeteorUserData = normalizeMeteorUserData(options);
    return {
      _id: normalizedMeteorUserData._id,
      name:
        normalizedMeteorUserData.service === 'password'
          ? normalizedMeteorUserData.profile.name
          : { first: normalizedMeteorUserData.username },
      emailAddress: normalizedMeteorUserData.emails[0].address,
      emailVerified:
        normalizedMeteorUserData.service === 'password'
          ? normalizedMeteorUserData.emails[0].verified
          : true,
      roles: getActiveRoles(normalizedMeteorUserData._id),
      oAuthProvider:
        normalizedMeteorUserData.service !== 'password' ? normalizedMeteorUserData.service : null,
      settings: normalizedMeteorUserData.settings,
      
      username: normalizedMeteorUserData.username,
      wishlist: normalizedMeteorUserData.wishlist,
      itchlist: normalizedMeteorUserData.itchlist,
      ownlist: normalizedMeteorUserData.ownlist,
      friends: normalizedMeteorUserData.friends,
      loanedTo: normalizedMeteorUserData.loanedTo,
      borrowedFrom: normalizedMeteorUserData.borrowedFrom,
      subscription: normalizedMeteorUserData.subscription,
      gamePlayCounts: normalizedMeteorUserData.gamePlayCounts,
    };
  } catch (exception) {
    throw new Error(`[mapMeteorUserToSchema] ${exception.message}`);
  }
};
