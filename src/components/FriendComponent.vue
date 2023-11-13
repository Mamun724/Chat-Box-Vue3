<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: "FriendComponent",
  props: {
    friend: {}
  },
  methods: {
    friendClicked() {
      this.setReceiver(this.friend);
    },
    async unfriendAction() {
      await this.unfriend(this.friend);
    },
    ...mapMutations(["setReceiver"]),
    ...mapActions(["unfriend"])
  }
}
</script>

<template>
  <v-list-item @click="friendClicked">
    <v-list-item-avatar>
      <v-img :src="friend.profilePicture"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-html="friend.username"></v-list-item-title>
      <v-list-item-subtitle v-html="friend.email"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click.stop="unfriendAction">
        <v-icon color="grey lighten-1">mdi-close</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<style scoped>

</style>
