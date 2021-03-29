module.exports = {
  extends: ['@commitlint/config-conventional', 'gitmoji'],
  rules: {
    'subject-case': [1, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 88]
  }
};
