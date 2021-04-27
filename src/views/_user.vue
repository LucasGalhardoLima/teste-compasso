<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "User",
  data: () => ({
    showStarred: null,
    showRepos: null,
    loadingDetails: false,
    loading: false,
  }),
  computed: {
    ...mapGetters(["getUser", "getUserRepos", "getUserStarred"]),
  },
  async mounted() {
    this.loading = true;
    await this.listUser(this.$route.params.user);
    this.loading = false;
  },
  methods: {
    ...mapActions(["listUser", "listUserRepos", "listUserStarred"]),
    async listRepos(id) {
      this.showStarred = null;
      this.showRepos = id;
      this.loadingDetails = true;
      await this.listUserRepos(id);
      this.loadingDetails = false;
    },
    async listStarred(id) {
      this.showRepos = null;
      this.showStarred = id;
      this.loadingDetails = true;
      await this.listUserStarred(id);
      this.loadingDetails = false;
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m8 user__main-col">
        <div v-if="loading" class="preloader-wrapper active user__loading">
          <div class="spinner-layer">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
        <div v-else class="card user__card">
          <div class="card-content">
            <span class="card-title">
              <div class="row valign-wrapper">
                <div class="col s2">
                  <img
                    :src="getUser.avatar_url"
                    class="circle responsive-img"
                  />
                </div>
                <div class="col s10">
                  <span class="black-text" v-if="getUser.name || getUser.login">
                    {{ getUser.name || getUser.login }}
                  </span>
                </div>
              </div>
            </span>
            <p v-if="getUser.login">Usuário: {{ getUser.login }}</p>
            <p v-if="getUser.name">Nome: {{ getUser.name }}</p>
            <p v-if="getUser.email">E-mail: {{ getUser.email }}</p>
            <p v-if="getUser.bio">Bio: {{ getUser.bio }}</p>
            <p v-if="getUser.company">Empresa: {{ getUser.company }}</p>
            <p v-if="getUser.public_repos">
              Repositórios públicos: {{ getUser.public_repos }}
            </p>
            <p v-if="getUser.followers">Seguidores: {{ getUser.followers }}</p>
            <p v-if="getUser.following">Seguindo: {{ getUser.following }}</p>
          </div>
          <div class="card-action user__card-actions">
            <a @click="listRepos(getUser.login)">Repos</a>
            <a @click="listStarred(getUser.login)">Starred</a>
          </div>
          <div
            v-if="showRepos === getUser.login || showStarred === getUser.login"
            class="card-content"
          >
            <div v-if="loadingDetails" class="preloader-wrapper active">
              <div class="spinner-layer">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div>
                <div class="gap-patch">
                  <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
            <div v-if="getUserRepos.length > 0 && !loadingDetails && showRepos">
              <div
                class="user__repos-list"
                v-for="item in getUserRepos"
                :key="item.id"
              >
                <p>Nome: {{ item.full_name }}</p>
                <p>
                  Link:
                  <a :href="item.html_url" target="_blank">{{
                    item.html_url
                  }}</a>
                </p>
              </div>
            </div>
            <div
              v-if="getUserStarred.length > 0 && !loadingDetails && showStarred"
            >
              <div
                class="user__starred-list"
                v-for="item in getUserStarred"
                :key="item.id"
              >
                <p>Nome: {{ item.full_name }}</p>
                <p>
                  Link:
                  <a :href="item.html_url" target="_blank">{{
                    item.html_url
                  }}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user__loading {
  margin: 0 auto;
  display: flex;
  margin-top: 5rem;
}
.user__main-col {
  float: none;
  margin: 0px auto;
}
.user__card p {
  margin: 0.6rem 0;
  font-size: 1.1rem;
}
.user__card-actions a {
  cursor: pointer;
}
.user__repos-list {
  margin: 0.8rem 0;
}

.user__starred-list {
  margin: 0.8rem 0;
}
</style>
