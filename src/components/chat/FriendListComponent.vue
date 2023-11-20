<template>
  <div class="friends-list py-2">
    <template v-for="friend of friendUsers" :key="friend.username">
      <FriendComponent
          :class="{selected: friend.username === receiver?.username}"
          :friend="friend"/>
      <v-divider/>
    </template>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import FriendComponent from "@/components/chat/FriendComponent.vue";

const store = useStore();

const authUser = computed(() => store.state.authenticatedUser);
const receiver = computed(() => store.state.receiverUser);
const friends = computed(() => store.getters.getFriends(authUser.value?.email));
const friendUsers = computed(() => friends.value?.map(email => store.getters.findUser(email)));
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
