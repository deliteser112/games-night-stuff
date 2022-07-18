import Wishes from './Wishes';

export default {
  addWish: (root, args, context) => {
    if (!context.user) throw new Error('Sorry, you must be logged in to add a new wish.');

    return Wishes.insert({
      wish: args.wish,
      username: context.user.username,
      userId: context.user._id,
    });
  },
};
