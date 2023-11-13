<script>
import {mapMutations} from "vuex";

export default {
  name: "FriendComponent",
  props: {
    friend: {}
  },
  methods: {
    friendClicked () {
      this.setReceiver(this.friend);
    },
    ...mapMutations(["setReceiver"])
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
      <!--TODO add unfriend button-->
    </v-list-item-content>
  </v-list-item>
</template>

<style scoped>

</style>
