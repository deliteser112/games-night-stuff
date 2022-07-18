import Ratings from './Ratings';

export default {
  addRating: async (root, args, context) => {
    let ratingId;

    if (!context.user) throw new Error('Sorry, you must be logged in to add a new rating.');

    const existingRating = Ratings.findOne({
      gameId: args.gameId,
      userId: context.user._id,
    });

    if (existingRating) {
      ratingId = Ratings.update(existingRating._id, {
        gameId: args.gameId,
        userId: context.user._id,
        playedBefore: args.playedBefore,
        playAgain: args.playAgain,
        recomendToFriend: args.recomendToFriend,
        buyThisGame: args.buyThisGame,
      });
    } else {
      ratingId = Ratings.insert({
        gameId: args.gameId,
        userId: context.user._id,
        playedBefore: args.playedBefore,
        playAgain: args.playAgain,
        recomendToFriend: args.recomendToFriend,
        buyThisGame: args.buyThisGame,
      });
    }

    const rating = Ratings.findOne(ratingId);
    return rating;
  },
};
