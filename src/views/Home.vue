<script>
import { mapActions, mapGetters } from "vuex";
import UserInfoCard from "@/components/UserInfoCard";
import RepoInfoCard from "@/components/RepoInfoCard";

export default {
  name: "Home",
  components: {
    UserInfoCard,
    RepoInfoCard,
  },
  data: () => ({
    search: "",
    loading: false,
    loadingDetails: false,
    showRepos: false,
    showStarred: false,
    typeSelect: null,
  }),
  computed: {
    ...mapGetters(["getUsers", "getUserRepos", "getUserStarred", "getRepos"]),
  },
  methods: {
    ...mapActions([
      "listUsers",
      "listUserRepos",
      "listUserStarred",
      "listReposSearch",
    ]),
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
    debounce(func, wait) {
      let timer = null;
      return function() {
        clearTimeout(timer);
        timer = setTimeout(func, wait);
      };
    },
  },
  watch: {
    async search() {
      this.loading = true;
      this.showRepos = false;
      this.showStarred = false;
      this.search = this.search.replace(/[^a-zA-Z ]/g, "");
      this.search = this.search.replace(" ", "");
      if (this.typeSelect === "user") {
        await this.listUsers();
        await this.listUsers(this.search);
        await this.listReposSearch();
      } else if (this.typeSelect === "repo") {
        await this.listReposSearch();
        await this.listReposSearch(this.search);
        await this.listUsers();
      }
      await this.listUserStarred();
      await this.listUserRepos();
      this.loading = false;
    },
  },
};
</script>

<template>
  <div class="home">
    <div class="container">
      <div class="row home__search-container">
        <div class="col s12 m6 l5 xl4">
          <select v-model="typeSelect" class="browser-default">
            <option value="null" disabled selected
              >Selecione o tipo de pesquisa</option
            >
            <option value="user">Usuário</option>
            <option value="repo">Repositório</option>
          </select>
        </div>
        <form class="col s12 m6 l7 xl8">
          <div class="row">
            <div class="input-field col s12 home__search-input" disabled>
              <i class="material-icons prefix">search</i>
              <input
                v-model="search"
                id="search"
                type="tel"
                class="validate"
                :disabled="!typeSelect"
              />
              <label for="search"
                >Digite sua busca (Ex: usuário, repositório, mais vistos,
                etc...)</label
              >
            </div>
          </div>
        </form>
      </div>
      <div class="row">
        <div v-if="loading" class="preloader-wrapper active home__loading">
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
        <div v-for="item in getRepos" :key="item.id" class="col s12 xl6">
          <RepoInfoCard
            :repo="item"
            :reposList="getUserRepos"
            :starredList="getUserStarred"
            :showRepos="showRepos"
            :showStarred="showStarred"
            :loadingDetails="loadingDetails"
            @list-repos="listRepos"
            @list-starred="listStarred"
          />
        </div>
        <div v-for="item in getUsers" :key="item.id" class="col s12 m6 l6 xl4">
          <UserInfoCard
            :user="item"
            :reposList="getUserRepos"
            :starredList="getUserStarred"
            :showRepos="showRepos"
            :showStarred="showStarred"
            :loadingDetails="loadingDetails"
            @list-repos="listRepos"
            @list-starred="listStarred"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 0.8rem;
}

.home__loading {
  margin: 0 auto;
  display: flex;
}

.home__search-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.home__search-input {
  margin-top: 2rem;
}
</style>
