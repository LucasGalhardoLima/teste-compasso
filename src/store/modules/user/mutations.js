export default {
  set_user: (state, value) => {
    state.user = value;
  },
  set_users: (state, value) => {
    state.users = value;
  },
  set_repos: (state, value) => {
    state.repos = value;
  },
  set_user_repos: (state, value) => {
    state.user_repos = value;
  },
  set_user_starred: (state, value) => {
    state.starred = value;
  },
};
