<template>
  <div>
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
      </div>

      <v-spacer></v-spacer>
      <logout-component/>
    </v-app-bar>

    <v-main>
      Chat Area
    </v-main>
  </div>
</template>

<script>
import LogoutComponent from "@/components/LogoutComponent.vue";

export default {
  name: "ChatComponent",
  components: {"logout-component": LogoutComponent}
}
</script>
