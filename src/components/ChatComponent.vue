<template>
  <div class="fill-height">
    <AppBar/>

    <v-main class="fill-height main-content">
      <div class="left-sidebar pt-16">
        <friend-list-component/>
      </div>
      <div class="chat-area">
        <div class="message-list-wrapper pl-2">
          <v-alert v-if="!receiver" class="text-center" outlined type="info">
            Please select friend from left sidebar to start Chat.
          </v-alert>
          <div v-else class="message-list py-2" ref="message-list">
            <message-component v-for="message in messages" :key="message.randId" :message="message"/>
          </div>
        </div>
        <div class="send-box-area d-flex align-center">
          <v-text-field
              v-model="message"
              append-icon="mdi-send"
              append-outer-icon="mdi-attachment"
              text
              class="mx-3"
              placeholder="Write message here..."
              :disabled="!receiver"
              @click:append="sendMessage"
              @click:append-outer="sendAttachment"/>
        </div>
      </div>
    </v-main>
  </div>
</template>

<script>
import MessageComponent from "@/components/MessageComponent.vue";
import {mapActions, mapGetters} from "vuex";
import AppBar from "@/components/AppBar.vue";
import FriendListComponent from "@/components/FriendListComponent.vue";

export default {
  name: "ChatComponent",
  components: {
    FriendListComponent,
    AppBar,
    "message-component": MessageComponent
  },
  data() {
    return {
      message: '',
      intervalId: null
    };
  },
  created() {
    this.intervalId = setInterval(() => this.simulateReceiver(), 5000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    async simulateReceiver() {
      if(!this.receiver) {
        return;
      }
      let message = `Simulating receiver message at ${new Date().toLocaleTimeString()}`;
      const msg = {
        content: message,
        sender: this.receiver.username,
        receiver: this.authUser.username,
        timestamp: new Date(),
        randId: Math.random()
      };

      await this.sendMessageAsync(msg);
      this.$nextTick(() => this.scrollToEnd());
    },
    async sendMessage() {
      if (!this.message) {
        return;
      }

      const msg = {
        content: this.message,
        sender: this.authUser.username,
        receiver: this.receiver.username,
        timestamp: new Date(),
        randId: Math.random()
      };

      await this.sendMessageAsync(msg);
      this.message = '';
      this.$nextTick(() => this.scrollToEnd());
    },
    sendAttachment() {
      console.log('send attachment');
    },
    scrollToEnd() {
      let messageListContainer = this.$refs["message-list"];
      messageListContainer?.lastElementChild?.scrollIntoView({behavior: "smooth"});
    },
    ...mapActions(["sendMessageAsync"])
  },
  computed: {
    ...mapGetters({
      getMessages: "getMessages",
      authUser: "getAuthenticatedUser",
      receiver: "getReceiver"
    }),
    messages() {
      return this.getMessages.filter(
          message =>
              (
                  message.receiver === this.receiver.username &&
                  message.sender === this.authUser.username
              ) ||
              (
                  message.sender === this.receiver.username &&
                  message.receiver === this.authUser.username
              )
      );
    }
  }
}
</script>

<style scoped lang="scss">
.main-content {
  $sendBoxHeight: 64px;
  $appBarHeight: 64px;
  $leftSideBarWidth: 33%;
  position: relative;

  .left-sidebar {
    width: $leftSideBarWidth;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    border-right: 1px solid black;
  }

  .chat-area {
    height: calc(100vh - #{$appBarHeight});
    width: 67%;
    margin-left: $leftSideBarWidth;

    .message-list-wrapper {
      height: calc(100% - #{$sendBoxHeight});
      display: flex;
      flex-direction: column;
      justify-content: end;

      .message-list {
        max-height: 100%;
        overflow-y: auto;
      }
    }

    .send-box-area {
      height: $sendBoxHeight;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 5;
      box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.1);
      background-color: white;
    }
  }
}
</style>
