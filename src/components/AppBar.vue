<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
          alt="Site Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
      />
      <div>
        <small>Chatting with:</small>
        <br>
        <span>{{ receiver?.username || "Please select on the left sidebar." }}</span>
      </div>
    </div>

    <v-spacer></v-spacer>
    <logout-component/>
  </v-app-bar>
</template>
<script setup>
import LogoutComponent from "@/components/LogoutComponent.vue"
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const receiver = computed(() => store.state.receiverUser);
</script>
