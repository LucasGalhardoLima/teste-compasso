<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-wrapper navbar__container">
        <a href="#" class="brand-logo navbar__logo">{{
          $route.params.user
            ? `Detalhes do usuário ${$route.params.user}`
            : "Busca Github"
        }}</a>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.navbar {
  background-color: #4db6ac;
  box-shadow: none !important;
}

.navbar__container {
  margin: 0 12px;
}

.navbar__logo {
  font-size: 1.6rem;
}
</style>
