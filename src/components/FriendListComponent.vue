<script>
import FriendComponent from "@/components/FriendComponent.vue";
import {mapGetters} from "vuex";

export default {
  name: "FriendListComponent",
  components: {FriendComponent},
  computed: {
    ...mapGetters({
      findUser: "findUser",
      friends: "getFriends",
      receiver: "getReceiver",
      authUser: "getAuthenticatedUser"
    }),
    friendUsers () {
      return this.friends(this.authUser.email)
          .map(email => this.findUser(email));
    }
  }
}
</script>

<template>
  <div class="friends-list py-2">
    <template v-for="friend of friendUsers">
      <FriendComponent
          :class="{selected: friend.username === receiver?.username}"
          :friend="friend"
          :key="friend.username"/>
      <v-divider :key="friend.username + friend.username"/>
    </template>
  </div>
</template>

<style scoped lang="scss">
$appBarHeight: 64px;
.friends-list {
  height: calc(100vh - #{$appBarHeight});
  overflow-y: auto;

  .selected {
    background-color: #ddd;
  }
}
</style>
