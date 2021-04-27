<script>
export default {
  name: "UserInfoCard",
  props: [
    "showRepos",
    "showStarred",
    "loadingDetails",
    "starredList",
    "reposList",
    "user",
  ],
};
</script>

<template>
  <div class="card userInfo__card">
    <div class="card-content">
      <span class="card-title">
        <div class="row valign-wrapper">
          <div class="col s2">
            <img :src="user.avatar_url" class="circle responsive-img" />
          </div>
          <div class="col s10">
            <span class="black-text" v-if="user.name || user.login">
              {{ user.name || user.login }}
            </span>
          </div>
        </div>
      </span>
      <p v-if="user.login">Usuário: {{ user.login }}</p>
    </div>
    <div class="card-action userInfo__card-actions">
      <a @click="$emit('list-repos', user.login)">Repos</a>
      <a @click="$emit('list-starred', user.login)">Starred</a>
    </div>
    <div
      v-if="showRepos === user.login || showStarred === user.login"
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
      <div v-if="reposList.length > 0 && !loadingDetails && showRepos">
        <div class="home__repos-list" v-for="item in reposList" :key="item.id">
          <p>Nome: {{ item.full_name }}</p>
          <p>
            Link:
            <a :href="item.html_url" target="_blank">{{ item.html_url }}</a>
          </p>
        </div>
      </div>
      <div v-if="starredList.length > 0 && !loadingDetails && showStarred">
        <div
          class="home__starred-list"
          v-for="item in starredList"
          :key="item.id"
        >
          <p>Nome: {{ item.full_name }}</p>
          <p>
            Link:
            <a :href="item.html_url" target="_blank">{{ item.html_url }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.userInfo__card-actions a {
  cursor: pointer;
}

.userInfo__card p {
  overflow-wrap: break-word;
}

.userInfo__repos-list {
  margin: 0.8rem 0;
}

.userInfo__starred-list {
  margin: 0.8rem 0;
}
</style>
