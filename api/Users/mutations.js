import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import updateUser, {
  updateWishlist,
  removeFromWishlist,
  updateItchlist,
  removeFromItchlist,
  updateOwnlist,
  removeFromOwnlist,
  updateGamePlayCount,
  cancelSubscription,
  setSubscriptionToFree,
  setUsername,
  addFriend,
  removeFriend,
  loanGameToUser,
  returnUsersGame,
} from './actions/updateUser';
import queryUser from './actions/queryUser';
import removeUser from './actions/removeUser';
import sendWelcomeEmail from './actions/sendWelcomeEmail';

export default {
  updateUser: async (parent, args, context) => {
    await updateUser({
      currentUser: context.user,
      user: args.user
    });

    console.log({ parent, args, context });

    return queryUser({ userIdToQuery: args.user._id || context.user._id });
  },
  removeUser: async (parent, args, { user }) =>
    removeUser({
      currentUser: user,
      user: args
    }),
  sendVerificationEmail: async (parent, args, context) => {
    Accounts.sendVerificationEmail(context.user._id);

    return {
      _id: context.user._id
    };
  },
  sendWelcomeEmail: async (parent, args, context) => {
    await sendWelcomeEmail({ user: Meteor.users.findOne(context.user._id) });

    return {
      _id: context.user._id
    };
  },

  // game mutation
  addGameToWishlist: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to add a game to your wishlist');
   
    updateWishlist({ currentUser: context.user, _id: args._id });

    return queryUser({ userIdToQuery: context.user._id });
  },
  removeGameFromWishlist: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to remove a game from your wishlist');

    removeFromWishlist({ currentUser: context.user, _id: args._id });

    return queryUser({ userIdToQuery: context.user._id });
  },
  addGameToItchlist: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to add a game to your ownlist');

    updateItchlist({ currentUser: context.user, _id: args._id });

    return queryUser({ userIdToQuery: context.user._id });
  },
  removeGameFromItchlist: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to remove a game from your itchlist');

    removeFromItchlist({ currentUser: context.user, _id: args._id });

    return queryUser({ userIdToQuery: context.user._id });
  },
  addGameToOwnlist: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to add a game to your itchlist');

    updateOwnlist({ currentUser: context.user, _id: args._id });

    return queryUser({ userIdToQuery: context.user._id });
  },
  removeGameFromOwnlist: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to remove a game from your ownlist');

    removeFromOwnlist({ currentUser: context.user, _id: args._id });

    return queryUser({ userIdToQuery: context.user._id });
  },
  updateGamePlayCount: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to remove a game from your ownlist');

    updateGamePlayCount({ currentUser: context.user, _id: args._id });

    return queryUser({ userIdToQuery: context.user._id });
  },
  cancelSubscription: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to unsubscribe a game from your ownlist');

    cancelSubscription({ currentUser: context.user });

    return queryUser({ userIdToQuery: context.user._id });
  },
  setUsersUsername: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to unsubscribe a game from your ownlist');

    setUsername(context.user._id, args.username, args.email);

    return queryUser({ userIdToQuery: context.user._id });
  },
  addFriend: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to add friends');

    addFriend(context.user._id, args.friendEmail);

    return queryUser({ userIdToQuery: context.user._id });
  },
  removeFriend: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to remove friends');

    removeFriend(context.user._id, args.friendUsername);

    return queryUser({ userIdToQuery: context.user._id });
  },
  loanGameToUser: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to loan a game');

    loanGameToUser(context.user._id, args.boardGameId, args.usernameToLoanTo);

    return queryUser({ userIdToQuery: context.user._id });
  },
  returnUsersGame: async (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to return a game');

    returnUsersGame(context.user._id, args.boardGameId, args.usernameToLoanTo, args.returnDate);

    return queryUser({ userIdToQuery: context.user._id });
  }
};
