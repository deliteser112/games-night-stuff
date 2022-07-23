export default `
  type Name {
    first: String
    last: String
  }

  input NameInput {
    first: String
    last: String
  }

  type Role {
    _id: String
    name: String
    inRole: Boolean
  }

  type GamePlayCount {
    _id: String
    count: Float
  }

  type Friends {
    userId: String
    emailAddress: String
  }
  
  type LoanedTo {
    _id: String
    userId: String
    emailAddress: String
  }

  type BorrowedFrom {
    _id: String
    userId: String
    emailAddress: String
  }

  input ProfileInput {
    name: NameInput
  }
  
  input UserInput {
    _id: String,
    email: String,
    password: String,
    profile: ProfileInput,
    roles: [String],
    settings: [UserSettingInput] # From /api/UserSettings/types.js
  }

  type User {
    _id: String
    name: Name
    username: String
    emailAddress: String
    emailVerified: Boolean
    oAuthProvider: String
    roles: [Role]
    itchlist: [String]
    wishlist: [String]
    ownlist: [String]
    friends: [Friends]
    subscription: String
    subscriptionId: String
    gamePlayCounts: [GamePlayCount],
    loanedTo: [LoanedTo]
    borrowedFrom: [BorrowedFrom]
    settings: [UserSetting] # From /api/UserSettings/types.js
  }

  type Users {
    total: Int
    users: [User]
  }

  type UserDataExport {
    zip: String
  }
`;
