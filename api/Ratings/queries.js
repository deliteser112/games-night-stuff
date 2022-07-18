import { Mongo } from 'meteor/mongo';
import Ratings from './Ratings';

export default {
  ratings: () => Ratings.find().fetch(),
  rating: (parent, args) => {
    try {
      return Ratings.findOne({ _id: new Mongo.ObjectID(args._id) });
    } catch (e) {
      return null;
    }
  },
  ratingByUserIdAndGameId: (parent, args, context) => {
    try {
      return Ratings.findOne({
        gameId: args.gameId,
        userId: context.user._id,
      });
    } catch (e) {
      return null;
    }
  },
};
