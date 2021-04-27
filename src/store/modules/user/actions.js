export default {
  async listUser({ commit }, user) {
    try {
      // eslint-disable-next-line no-undef
      const resp = await axios.get(`users/${user}`);
      commit("set_user", resp.data);
    } catch (e) {
      console.error(e);
    }
  },
  async listUsers({ commit }, user) {
    try {
      if (user) {
        // eslint-disable-next-line no-undef
        const resp = await axios.get(`search/users?q=${user}`);
        commit("set_users", resp.data.items);
      } else commit("set_users", []);
    } catch (e) {
      console.error(e);
    }
  },
  async listReposSearch({ commit }, repo) {
    try {
      if (repo) {
        // eslint-disable-next-line no-undef
        const resp = await axios.get(`search/repositories?q=${repo}`);
        commit("set_repos", resp.data.items);
      } else commit("set_repos", []);
    } catch (e) {
      console.error(e);
    }
  },
  async listUserRepos({ commit }, user) {
    try {
      if (user) {
        // eslint-disable-next-line no-undef
        const resp = await axios.get(`users/${user}/repos`);
        commit("set_user_repos", resp.data);
      } else commit("set_user_repos", []);
    } catch (e) {
      console.error(e);
    }
  },
  async listUserStarred({ commit }, user) {
    try {
      if (user) {
        // eslint-disable-next-line no-undef
        const resp = await axios.get(`users/${user}/starred`);
        commit("set_user_starred", resp.data);
      } else commit("set_user_starred", []);
    } catch (e) {
      console.error(e);
    }
  },
};
