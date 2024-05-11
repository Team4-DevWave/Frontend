module.exports = {
    setupFilesAfterEnv: ['./jest.setup.js'],
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [
        '/node_modules/(?!axios).+\\.js$'
      ],
      moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },

    
};