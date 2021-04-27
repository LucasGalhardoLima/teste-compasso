<script>
export default {
  name: "RepoInfoCard",
  props: [
    "showRepos",
    "showStarred",
    "loadingDetails",
    "starredList",
    "reposList",
    "repo",
  ],
};
</script>

<template>
  <div class="card repoInfo__card">
    <div class="card-content">
      <span class="card-title">
        <div class="row valign-wrapper">
          <div class="col s2">
            <img :src="repo.owner.avatar_url" class="circle responsive-img" />
          </div>
          <div class="col s10">
            <span class="black-text" v-if="repo.owner.name || repo.owner.login">
              {{ repo.owner.name || repo.owner.login }}
            </span>
          </div>
        </div>
      </span>
      <p v-if="repo.owner.login">Usuário: {{ repo.owner.login }}</p>
      <p v-if="repo.html_url">
        Link:
        <a :href="repo.html_url" target="_blank">{{ repo.html_url }}</a>
      </p>
    </div>
    <div class="card-action repoInfo__card-actions">
      <a @click="$emit('list-repos', repo.owner.login)">Repos</a>
      <a @click="$emit('list-starred', repo.owner.login)">Starred</a>
    </div>
    <div
      v-if="showRepos === repo.owner.login || showStarred === repo.owner.login"
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
.repoInfo__card-actions a {
  cursor: pointer;
}

.repoInfo__card p {
  overflow-wrap: break-word;
}

.repoInfo__repos-list {
  margin: 0.8rem 0;
}

.repoInfo__starred-list {
  margin: 0.8rem 0;
}
</style>
