<template>
  <div class="friends-list py-2">
    <!-- eslint-disable-next-line -->
    <template v-for="friend of friendUsers" :key="friend.username">
      <FriendComponent
          :class="{selected: friend.username === receiver?.username}"
          :friend="friend"/>
      <v-divider/>
    </template>
  </div>
</template>

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
