export default `

  type GameArtist {
    _id: String
    id: String
    name: String
  }

  type GameMechanic {
    _id: String
    id: String
    mechanic: String
  }

  type GamePublisher {
    _id: String
    id: String
    publisher: String
  }

  type GameCategory {
    _id: String
    id: String
    category: String
  }

  type GameDesigner {
    _id: String
    id: String
    designer: String
  }

  type AlternativeName {
    _id: String
    name: String
  }

  type Game {
    _id: String
    bggid: String
    title: String
    minPlayers: String
    maxPlayers: String
    playingTime: String
    minPlaytime: String
    maxPlaytime: String
    age: String
    description: String
    thumbnail: String
    image: String
    yearPublished: String
    gameArtists: [GameArtist]
    gameMechanics: [GameMechanic]
    gamePublishers: [GamePublisher]
    gameCategories: [GameCategory]
    gameDesigners: [GameDesigner]
    alternativeNames: [AlternativeName]
    count: Int
  }
`;

// These are not yet implemented in the scraper
// gameFamilies: [GameFamilies]
// reimplementations: [Game]
// languageVariants: [Game]
// expansions: [Game]
