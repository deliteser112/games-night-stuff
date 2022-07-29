import { Mongo } from 'meteor/mongo';
import Games from './Games';

export default {
  games: async (parent, args, context) => {
    return Games.find().fetch();
  },
  totalGamesCount: async () => Games.find().count(),
  paginateGames: async (parent, args) => Games.find({}, { skip: args.skip, limit: args.limit }).fetch(),
  game: async (parent, args) => {
    const _id = new Mongo.ObjectID(args._id);
    try {
      return Games.findOne({ _id });
    } catch (e) {
      return null;
    }
  },
  findGamesByIds: async (parent, args) => {
    const gameIds = [];
    args._ids.map((id) => gameIds.push(new Mongo.ObjectID(id)));
    try {
      return Games.find({ _id: { $in: gameIds } });
    } catch (e) {
      return null;
    }
  },
  findGameByKeywords: async (parent, args) => {
    try {
      if (args.keywords != '') {
        return Games.find({ title: { $regex: args.keywords, $options: 'i' } });
      } else {
        return [];
      }
    } catch (e) {
      return null;
    }
  }
};
