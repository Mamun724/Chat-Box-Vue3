<template>
  <v-btn variant="text" @click="logout">
    <span class="mr-1">Logout</span>
    <v-icon>mdi-logout</v-icon>
  </v-btn>
</template>

<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

async function logout() {
  await store.dispatch("logoutUser");
  await router.push("/login");
}
</script>
