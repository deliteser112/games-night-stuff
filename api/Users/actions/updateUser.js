import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import checkIfAuthorized, { isAdmin } from './checkIfAuthorized';

let action;


// //////////////////////////////////////////////////////////////


const returnUsersGameLocal = (_id, boardGameId, userIdLoanedTo, returnDate) => {
  const userToLoanTo = Meteor.users.findOne({ _id: userIdLoanedTo });
  const userToLoanFrom = Meteor.users.findOne(_id);

  Meteor.users.update(
    { _id: userToLoanTo._id },
    {
      $pull: {
        borrowedFrom: {
          _id: boardGameId,
          userId: _id,
          emailAddress: userToLoanFrom.emailAddress,
        },
      },
      $addToSet: {
        allTimeBorrowedFrom: {
          _id: boardGameId,
          userId: _id,
          emailAddress: userToLoanFrom.emailAddress,
          returnDate,
        },
      },
    },
  );

  return Meteor.users.update(_id, {
    $pull: {
      loanedTo: {
        _id: boardGameId,
        userId: userToLoanTo._id,
        emailAddress: userToLoanTo.emailAddress,
      },
    },
    $addToSet: {
      allTimeLoanedTo: {
        _id: boardGameId,
        userId: userToLoanTo._id,
        emailAddress: userToLoanTo.emailAddress,
        returnDate,
      },
    },
  });
};

const lendGameOut = (_id, boardGameId, userIdToLoanTo) => {
  const userToLoanTo = Meteor.users.findOne({ _id: userIdToLoanTo });
  const userToLoanFrom = Meteor.users.findOne(_id);

  Meteor.users.update(
    { _id: userToLoanTo._id },
    {
      $addToSet: {
        borrowedFrom: {
          _id: boardGameId,
          userId: _id,
          emailAddress: userToLoanFrom.emails[0].address,
        },
        allTimeBorrowedFrom: {
          _id: boardGameId,
          userId: _id,
          emailAddress: userToLoanFrom.emails[0].address,
        },
      },
    },
  );

  return Meteor.users.update(_id, {
    $addToSet: {
      loanedTo: {
        _id: boardGameId,
        userId: userToLoanTo._id,
        emailAddress: userToLoanTo.emails[0].address,
      },
      allTimeLoanedTo: {
        _id: boardGameId,
        userId: userToLoanTo._id,
        emailAddress: userToLoanTo.emails[0].address,
      },
    },
  });
};

const removeFriendUser = (_id, friendId) => {
  const friendUser = Meteor.users.findOne({ _id: friendId });
  const myUser = Meteor.users.findOne(_id);

  Meteor.users.update(
    { _id: friendUser._id },
    {
      $pull: {
        friends: {
          userId: _id,
          emailAddress: myUser.emails[0].address,
        },
      },
    },
  );

  return Meteor.users.update(_id, {
    $pull: {
      friends: {
        userId: friendUser._id,
        emailAddress: friendUser.emails[0].address,
      },
    },
  });
};

const addFriendUser = (_id, friendId) => {
  const friendUser = Meteor.users.findOne({ _id: friendId });
  const myUser = Meteor.users.findOne(_id);

  Meteor.users.update(
    { _id: friendUser._id },
    {
      $addToSet: {
        friends: {
          userId: _id,
          emailAddress: myUser.emails[0].address,
        },
      },
    },
  );

  return Meteor.users.update(_id, {
    $addToSet: {
      friends: {
        userId: friendUser._id,
        emailAddress: friendUser.emails[0].address,
      },
    },
  });
};

const setUsersSubscriptionToFree = (_id) => {
  try {
    return Meteor.users.update(_id, {
      $set: { subscription: 'free', subscriptionId: null },
    });
  } catch (exception) {
    throw new Error(`[updateUser.setUsersSubscriptionToFree] ${exception.message}`);
  }
};

const setUsersUsername = (_id, username) => {
  try {
    setUsersSubscriptionToFree(_id);

    return Meteor.users.update(_id, {
      $set: { username },
    });
  } catch (exception) {
    throw new Error(`[updateUser.setUsersUsername] ${exception.message}`);
  }
};

const cancelUserSubscription = (_id) => {
  try {
    //const stripe = Stripe(Meteor.settings.private.stripePrivateKey);
    const user = Meteor.users.findOne(_id);

    //stripe.subscriptions.del(user.subscriptionId);

    return Meteor.users.update(_id, {
      $set: {
        subscription: 'free',
        subscriptionId: null,
      },
    });
  } catch (exception) {
    throw new Error(`[updateUser.updateUserOwnlist] ${exception.message}`);
  }
};

const incrementPlayCount = (_id, boardGameId) => {
  Meteor.users.update(
    {
      _id,
      'gamePlayCounts._id': boardGameId,
    },
    {
      $inc: { 'gamePlayCounts.$.count': 1 },
    },
  );
};

const updateUserGamePlayCount = ({ _id }, boardGameId) => {
  try {
    const user = Meteor.users.findOne(_id);

    const hasNotPlayedBefore = user.gamePlayCounts
      ? user.gamePlayCounts.filter((gamePlayCount) => gamePlayCount._id === boardGameId).length ===
        0
      : true;

    if (hasNotPlayedBefore) {
      return Meteor.users.update(
        _id,
        {
          $addToSet: {
            gamePlayCounts: {
              _id: boardGameId,
              count: 0,
            },
          },
        },
        () => incrementPlayCount(_id, boardGameId),
      );
    }

    return incrementPlayCount(_id, boardGameId);
  } catch (exception) {
    throw new Error(`[updateUser.updateUserOwnlist] ${exception.message}`);
  }
};

const updateUserOwnlist = ({ _id }, boardGameId) => {
  try {
    return Meteor.users.update(_id, {
      $addToSet: {
        ownlist: boardGameId,
      },
      $pull: { wishlist: { $in: [boardGameId] } },
    });
  } catch (exception) {
    throw new Error(`[updateUser.updateUserOwnlist] ${exception.message}`);
  }
};

const removeGameFromOwnlist = ({ _id }, boardGameId) => {
  try {
    return Meteor.users.update(_id, {
      $pull: { ownlist: { $in: [boardGameId] } },
    });
  } catch (exception) {
    throw new Error(`[updateUser.removeGameFromOwnlist] ${exception.message}`);
  }
};

const updateUserItchlist = ({ _id }, boardGameId) => {
  try {
    return Meteor.users.update(_id, {
      $addToSet: { itchlist: boardGameId, allTimeItchlist: boardGameId },
    });
  } catch (exception) {
    throw new Error(`[updateUser.updateUserItchlist] ${exception.message}`);
  }
};

const removeGameFromItchlist = ({ _id }, boardGameId) => {
  try {
    return Meteor.users.update(_id, {
      $pull: { itchlist: { $in: [boardGameId] } },
    });
  } catch (exception) {
    throw new Error(`[updateUser.removeGameFromItchlist] ${exception.message}`);
  }
};

const updateUserWishlist = ({ _id }, boardGameId) => {
  try {
    return Meteor.users.update(_id, {
      $addToSet: { wishlist: boardGameId, allTimeWishlist: boardGameId },
    });
  } catch (exception) {
    throw new Error(`[updateUser.updateUserWishlist] ${exception.message}`);
  }
};

const removeGameFromWishlist = ({ _id }, boardGameId) => {
  try {
    return Meteor.users.update(_id, {
      $pull: { wishlist: { $in: [boardGameId] } },
    });
  } catch (exception) {
    throw new Error(`[updateUser.removeGameFromWishlist] ${exception.message}`);
  }
};


// /////////////////////////////////////////////////////////////////////////
const updateUserSettings = ({ _id, settings }) => {
  try {
    return Meteor.users.update(_id, {
      $set: { settings },
    });
  } catch (exception) {
    throw new Error(`[updateUser.updateUserSettings] ${exception.message}`);
  }
};

const updateUserProfile = ({ _id, profile }) => {
  try {
    return Meteor.users.update(_id, {
      $set: { profile },
    });
  } catch (exception) {
    throw new Error(`[updateUser.updateUserProfile] ${exception.message}`);
  }
};

const updateUserEmail = ({ _id, email }) => {
  try {
    return Meteor.users.update(_id, {
      $set: {
        'emails.0.address': email,
      },
    });
  } catch (exception) {
    throw new Error(`[updateUser.updateUserEmail] ${exception.message}`);
  }
};

const updateUserRoles = ({ _id, roles }) => {
  try {
    return Roles.setUserRoles(_id, roles);
  } catch (exception) {
    throw new Error(`[updateUser.updateUserRoles] ${exception.message}`);
  }
};

const updateUserPassword = ({ _id, password }) => {
  try {
    return Accounts.setPassword(_id, password);
  } catch (exception) {
    throw new Error(`[updateUser.updateUserPassword] ${exception.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.currentUser) throw new Error('options.currentUser is required.');
    if (!options.user) throw new Error('options.user is required.');
  } catch (exception) {
    throw new Error(`[updateUser.validateOptions] ${exception.message}`);
  }
};

const updateUser = (options) => {
  try {
    validateOptions(options);
    checkIfAuthorized({
      as: ['admin', () => !options.user._id],
      userId: options.currentUser._id,
      errorMessage: 'Sorry, you need to be an admin or the passed user to do this.',
    });

    const userToUpdate = options.user;

    if (userToUpdate && !userToUpdate._id) {
      // NOTE: If passed user doesn't have an _id, we know we're updating the
      // currently logged in user (i.e., via the /profile page).
      userToUpdate._id = options.currentUser._id;
    }

    if (userToUpdate.password) updateUserPassword(userToUpdate);
    if (userToUpdate.roles && isAdmin(options.currentUser._id)) updateUserRoles(userToUpdate);
    if (userToUpdate.email) updateUserEmail(userToUpdate);
    if (userToUpdate.profile) updateUserProfile(userToUpdate);
    if (userToUpdate.settings) updateUserSettings(userToUpdate);

    action.resolve();
  } catch (exception) {
    action.reject(`[updateUser] ${exception.message}`);
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    action = { resolve, reject };
    updateUser(options);
  });



  // --------------------------- / ------------------/ ------------------

  
export function updateWishlist(options) {
  updateUserWishlist(options.currentUser, options._id);
}

export function removeFromWishlist(options) {
  removeGameFromWishlist(options.currentUser, options._id);
}

export function updateItchlist(options) {
  updateUserItchlist(options.currentUser, options._id);
}

export function removeFromItchlist(options) {
  removeGameFromItchlist(options.currentUser, options._id);
}

export function updateOwnlist(options) {
  updateUserOwnlist(options.currentUser, options._id);
}

export function removeFromOwnlist(options) {
  removeGameFromOwnlist(options.currentUser, options._id);
}

export function updateGamePlayCount(options) {
  updateUserGamePlayCount(options.currentUser, options._id);
}

export function cancelSubscription(options) {
  cancelUserSubscription(options.currentUser._id);
}

export function setSubscriptionToFree(_id) {
  setUsersSubscriptionToFree(_id);
}

export function setUsername(_id, username) {
  setUsersUsername(_id, username);
}

export function addFriend(_id, friendId) {
  addFriendUser(_id, friendId);
}

export function removeFriend(_id, friendId) {
  removeFriendUser(_id, friendId);
}

export function loanGameToUser(_id, boardGameId, userIdToLoanTo) {
  lendGameOut(_id, boardGameId, userIdToLoanTo);
}

export function returnUsersGame(_id, boardGameId, userIdToLoanTo, returnDate) {
  returnUsersGameLocal(_id, boardGameId, userIdToLoanTo, returnDate);
}
