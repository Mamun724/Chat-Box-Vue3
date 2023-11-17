<template>
  <div class="fill-height">
    <AppBar/>

    <v-main class="fill-height main-content">
      <div class="left-sidebar pt-16">
        <friend-list-component/>
      </div>
      <router-view>
        <div class="content-area d-md-flex">
          <div class="chat-box v-col-md-6 pa-0">
            <chat-area-component/>
          </div>
          <div class="v-col-md-6 pa-0">
            <game-area-component/>
          </div>
        </div>
      </router-view>
    </v-main>
  </div>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import ChatAreaComponent from "@/components/chat/ChatAreaComponent.vue";
import FriendListComponent from "@/components/chat/FriendListComponent.vue";
import GameAreaComponent from "@/components/tic-tac-toe/GameAreaComponent.vue";
</script>

<style scoped lang="scss">
.main-content {
  $leftSideBarWidth: 25%;
  position: relative;

  .left-sidebar {
    width: $leftSideBarWidth;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    border-right: 1px solid #ddd;
  }

  .content-area {
    width: calc(100% - #{$leftSideBarWidth});
    margin-left: $leftSideBarWidth;

    .chat-box {
      border-right: 1px solid #ddd;
    }
  }
}
</style>
