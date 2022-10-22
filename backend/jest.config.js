module.exports = {
    roots: [
      "<rootDir>/src/"
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    moduleNameMapper: {
      "@/(.*)": "<rootDir>/src/$1"
    }
  }
  