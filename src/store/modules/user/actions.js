export default {
  // eslint-disable-next-line no-empty-pattern
  async listUser({ commit }, user) {
    try {
      // eslint-disable-next-line no-undef
      const resp = await axios.get(`users/${user}`);
      commit("set_user", resp.data);
    } catch (e) {
      console.error(e);
    }
  },
};
