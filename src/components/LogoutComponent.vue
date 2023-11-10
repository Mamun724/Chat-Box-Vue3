<template>
  <v-btn text @click="logout">
    <span class="mr-1">Logout</span>
    <v-icon>mdi-logout</v-icon>
  </v-btn>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "LogoutComponent",
  methods: {
    logout() {
      this.logoutUser();
      this.$router.push("/login");
    },
    ...mapActions(["logoutUser"])
  }
}
</script>
