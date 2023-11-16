<template>
  <div class="chat-area">
    <div class="message-list-wrapper pl-2">
      <v-alert
          v-if="!receiver"
          class="text-center mr-2 flex-0-0 mb-3"
          variant="outlined"
          density="compact"
          type="info">
        Please select friend from left sidebar to start Chat.
      </v-alert>
      <div v-else class="message-list py-2" ref="message-list">
        <message-component v-for="message in messages" :key="message.randId" :message="message"/>
      </div>
    </div>
    <message-send-box-component @messageSent="messageSent"/>
  </div>
</template>

<script>
import MessageComponent from "@/components/MessageComponent.vue";
import {mapActions, mapGetters} from "vuex";
import MessageSendBoxComponent from "@/components/MessageSendBoxComponent.vue";

export default {
  name: "ChatAreaComponent",
  components: {MessageSendBoxComponent, MessageComponent},
  data() {
    return {
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
      if (!this.receiver) {
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

      await this.sendMessage(msg);
      this.messageSent();
    },
    messageSent() {
      this.$nextTick(() => this.scrollToEnd());
    },
    scrollToEnd() {
      let messageListContainer = this.$refs["message-list"];
      messageListContainer?.lastElementChild?.scrollIntoView({behavior: "smooth"});
    },
    ...mapActions(["sendMessage"])
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
$sendBoxHeight: 64px;
$appBarHeight: 64px;
.chat-area {
  height: calc(100vh - #{$appBarHeight});
  width: 100%;

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
}
</style>