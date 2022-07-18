import { Mongo } from 'meteor/mongo';
import Games from './Games';

export default {
  games: async (parent, args, context) => {
    return Games.find().fetch();
  },
  totalGamesCount: () => Games.find().count(),
  paginateGames: (parent, args) => Games.find({}, { skip: args.skip, limit: args.limit }).fetch(),
  game: async (parent, args) => {
    try {
      return Games.findOne({ _id: new Mongo.ObjectID(args._id) });
    } catch (e) {
      return null;
    }
  },
  findGameByKeywords: (parent, args) => {
    try {
      return Games.find({ title: { $regex: args.keywords, $options: 'i' } });
    } catch (e) {
      return null;
    }
  }
};
