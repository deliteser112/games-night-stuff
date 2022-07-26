import gql from 'graphql-tag';
import { makeExecutableSchema } from 'graphql-tools';

import UserTypes from '../../api/Users/types';
import UserQueries from '../../api/Users/queries';
import UserMutations from '../../api/Users/mutations';

import UserSettingsTypes from '../../api/UserSettings/types';
import UserSettingsQueries from '../../api/UserSettings/queries';
import UserSettingsMutations from '../../api/UserSettings/mutations';

import DocumentTypes from '../../api/Documents/types';
import DocumentQueries from '../../api/Documents/queries';
import DocumentMutations from '../../api/Documents/mutations';

import CommentTypes from '../../api/Comments/types';
import CommentQueries from '../../api/Comments/queries';
import CommentMutations from '../../api/Comments/mutations';

// Games

import GameTypes from '../../api/Games/types';
import GameQueries from '../../api/Games/queries';

import RatingTypes from '../../api/Ratings/types';
import RatingQueries from '../../api/Ratings/queries';
import RatingMutations from '../../api/Ratings/mutations';

import WishesTypes from '../../api/Wishes/types';
import WishesQueries from '../../api/Wishes/queries';
import WishesMutations from '../../api/Wishes/mutations';

import SubscribersTypes from '../../api/Subscribers/types';
import SubscribersQueries from '../../api/Subscribers/queries';
import SubscribersMutations from '../../api/Subscribers/mutations';

import OAuthQueries from '../../api/OAuth/queries';

import '../../api/Documents/server/indexes';
import '../../api/webhooks';

import '../../api/App/server/publications';

const schema = {
  typeDefs: gql`
    ${GameTypes}
    ${RatingTypes}
    ${WishesTypes}
    ${SubscribersTypes}

    ${DocumentTypes}
    ${CommentTypes}

    ${UserTypes}
    ${UserSettingsTypes}

    type Query {
      documents: [Document]
      document(_id: String): Document

      games: [Game]
      totalGamesCount: Int
      paginateGames(skip: Int, limit: Int): [Game]
      game(_id: String): Game
      findGameByKeywords(keywords: String): [Game]

      ratings: [Rating]
      wishes: [Wish]
      Subscribers: [Subscriber]
      rating(_id: String): Rating
      ratingByUserIdAndGameId(gameId: String): Rating

      user(_id: String): User
      users(currentPage: Int, perPage: Int, search: String): Users
      userFromUsername(username: String): User
      userSettings: [UserSetting]
      
      exportUserData: UserDataExport
      oAuthServices(services: [String]): [String]
    }

    type Mutation {
      addDocument(title: String, body: String): Document
      updateDocument(_id: String!, title: String, body: String, isPublic: Boolean): Document
      removeDocument(_id: String!): Document
      addComment(documentId: String!, comment: String!): Comment
      removeComment(commentId: String!): Comment

      # games

      addGameToWishlist(_id: String): User
      removeGameFromWishlist(_id: String): User
      addGameToItchlist(_id: String): User
      removeGameFromItchlist(_id: String): User
      addGameToOwnlist(_id: String): User
      removeGameFromOwnlist(_id: String): User
      updateGamePlayCount(_id: String): User
      addRating(
        gameId: String
        playedBefore: Boolean
        playAgain: Int
        recomendToFriend: Int
        buyThisGame: Int
      ): Rating
      addWish(wish: String): Wish
      addSubscriber(
        name: String
        email: String
      ): Subscriber

      cancelSubscription: User
      setUsersUsername(username: String, email: String): User
      addFriend(_id: String): User
      removeFriend(_id: String): User
      loanGameToUser(boardGameId: String, userIdToLoanTo: String): User
      returnUsersGame(boardGameId: String, userIdToLoanTo: String, returnDate: String): User

      updateUser(user: UserInput): User
      removeUser(_id: String): User
      addUserSetting(setting: UserSettingInput): UserSetting
      updateUserSetting(setting: UserSettingInput): UserSetting
      removeUserSetting(_id: String!): UserSetting
      sendVerificationEmail: User
      sendWelcomeEmail: User
      sendInvitationEmail(emailAddress: String): User
    }

    type Subscription {
      commentAdded(documentId: String!): Comment
    }
  `,
  resolvers: {
    Query: {
      ...DocumentQueries,

      ...GameQueries,
      ...RatingQueries,
      ...WishesQueries,
      ...SubscribersQueries,

      ...UserQueries,
      ...UserSettingsQueries,
      ...OAuthQueries,
    },
    Mutation: {
      ...DocumentMutations,
      ...CommentMutations,

      ...RatingMutations,
      ...WishesMutations,
      ...SubscribersMutations,

      ...UserMutations,
      ...UserSettingsMutations,
    },
    Document: {
      comments: CommentQueries.comments,
    },
    Comment: {
      user: UserQueries.user,
    },
  },
};

export default makeExecutableSchema(schema);
