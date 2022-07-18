import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import checkIfAuthorized, { isAdmin } from './checkIfAuthorized';

let action;


// //////////////////////////////////////////////////////////////


const returnUsersGameLocal = (_id, boardGameId, userLoanedToo, returnDate) => {
  const userToLoanTo = Meteor.users.findOne({ username: userLoanedToo });
  const userToLoanFrom = Meteor.users.findOne(_id);

  Meteor.users.update(
    { _id: userToLoanTo._id },
    {
      $pull: {
        borrowedFrom: {
          _id: boardGameId,
          userId: _id,
          username: userToLoanFrom.username,
        },
      },
      $addToSet: {
        allTimeBorrowedFrom: {
          _id: boardGameId,
          userId: _id,
          username: userToLoanFrom.username,
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
        username: userToLoanTo.username,
      },
    },
    $addToSet: {
      allTimeLoanedTo: {
        _id: boardGameId,
        userId: userToLoanTo._id,
        username: userToLoanTo.username,
        returnDate,
      },
    },
  });
};

const lendGameOut = (_id, boardGameId, usernameToLoanTo) => {
  const userToLoanTo = Meteor.users.findOne({ username: usernameToLoanTo });
  const userToLoanFrom = Meteor.users.findOne(_id);

  Meteor.users.update(
    { _id: userToLoanTo._id },
    {
      $addToSet: {
        borrowedFrom: {
          _id: boardGameId,
          userId: _id,
          username: userToLoanFrom.username,
        },
        allTimeBorrowedFrom: {
          _id: boardGameId,
          userId: _id,
          username: userToLoanFrom.username,
        },
      },
    },
  );

  return Meteor.users.update(_id, {
    $addToSet: {
      loanedTo: {
        _id: boardGameId,
        userId: userToLoanTo._id,
        username: userToLoanTo.username,
      },
      allTimeLoanedTo: {
        _id: boardGameId,
        userId: userToLoanTo._id,
        username: userToLoanTo.username,
      },
    },
  });
};

const removeFriendUser = (_id, friendUsername) => {
  const friendUser = Meteor.users.findOne({ username: friendUsername });
  const myUser = Meteor.users.findOne(_id);

  Meteor.users.update(
    { _id: friendUser._id },
    {
      $pull: {
        friends: {
          userId: _id,
          username: myUser.username,
        },
      },
    },
  );

  return Meteor.users.update(_id, {
    $pull: {
      friends: {
        userId: friendUser._id,
        username: friendUser.username,
      },
    },
  });
};

const addFriendUser = (_id, friendEmail) => {
  const friendUser = Meteor.users.findOne({ email: friendEmail });
  const myUser = Meteor.users.findOne(_id);

  Meteor.users.update(
    { _id: friendUser._id },
    {
      $addToSet: {
        friends: {
          userId: _id,
          username: myUser.username,
        },
      },
    },
  );

  return Meteor.users.update(_id, {
    $addToSet: {
      friends: {
        userId: friendUser._id,
        username: friendUser.username,
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

const setUsersUsername = (_id, username, email) => {
  try {
    setUsersSubscriptionToFree(_id);

    return Meteor.users.update(_id, {
      $set: { username, email },
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

export function setUsername(_id, username, email) {
  setUsersUsername(_id, username, email);
}

export function addFriend(_id, friendEmail) {
  addFriendUser(_id, friendEmail);
}

export function removeFriend(_id, friendUsername) {
  removeFriendUser(_id, friendUsername);
}

export function loanGameToUser(_id, boardGameId, usernameToLoanTo) {
  lendGameOut(_id, boardGameId, usernameToLoanTo);
}

export function returnUsersGame(_id, boardGameId, usernameToLoanTo, returnDate) {
  returnUsersGameLocal(_id, boardGameId, usernameToLoanTo, returnDate);
}
