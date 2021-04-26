<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data: () => ({
    search: "",
    loading: false,
  }),
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapActions(["listUser"]),
  },
  watch: {
    async search() {
      this.loading = true;
      this.search = this.search.replace(" ", "");
      await this.listUser(this.search);
      this.loading = false;
    },
  },
};
</script>

<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12 home__search-input">
              <i class="material-icons prefix">search</i>
              <input v-model="search" id="search" type="tel" class="validate" />
              <label for="search"
                >Digite sua busca (Ex: usuário, repositório, mais vistos,
                etc...)</label
              >
            </div>
          </div>
        </form>
      </div>
      <div class="row">
        <div v-if="loading" class="preloader-wrapper active">
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
        <div v-if="'avatar_url' in getUser && !loading" class="col s12 m6 l4">
          <div class="card">
            <div class="card-image">
              <img class="responsive-img" :src="getUser.avatar_url" />
            </div>
            <div class="card-content">
              <p v-if="'name' in getUser">Nome: {{ getUser.name }}</p>
              <p>
                I am a very simple card. I am good at containing small bits of
                information. I am convenient because I require little markup to
                use effectively.
              </p>
            </div>
            <div class="card-action">
              <a href="#">Repos</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
      {{ getUser }}
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 0.8rem;
}

.home__search-input {
  margin-top: 2rem;
}
</style>
