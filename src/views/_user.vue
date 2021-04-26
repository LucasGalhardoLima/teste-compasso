<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "User",
  computed: {
    ...mapGetters(["getUser"]),
  },
  async mounted() {
    await this.listUser(this.$route.params.user);
  },
  methods: {
    ...mapActions(["listUser"]),
  },
};
</script>

<template>
  <div>{{ getUser }}</div>
</template>
