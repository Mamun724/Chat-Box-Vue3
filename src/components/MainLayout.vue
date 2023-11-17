<template>
  <div class="fill-height">
    <AppBar/>

    <v-main class="fill-height main-content">
      <div class="left-sidebar pt-16">
        <friend-list-component/>
      </div>
      <router-view>
        <div class="content-area">
          <chat-area-component/>
        </div>
      </router-view>
    </v-main>
  </div>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import ChatAreaComponent from "@/components/chat/ChatAreaComponent.vue";
import FriendListComponent from "@/components/chat/FriendListComponent.vue";
</script>

<style scoped lang="scss">
.main-content {
  $leftSideBarWidth: 33%;
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
    width: 67%;
    margin-left: $leftSideBarWidth;
  }
}
</style>
