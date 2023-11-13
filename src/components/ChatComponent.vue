<template>
  <div class="fill-height">
    <AppBar/>

    <v-main class="fill-height main-content">
      <div class="messages-area px-2 py-2" ref="message-list">
        <message-component v-for="message in messages" :key="message.randId" :message="message"/>
      </div>
      <div class="send-box-area d-flex align-center">
        <v-text-field
            v-model="message"
            append-icon="mdi-send"
            append-outer-icon="mdi-attachment"
            text
            class="mx-3"
            placeholder="Write message here..."
            @click:append="sendMessage"
            @click:append-outer="sendAttachment"/>
      </div>
    </v-main>
  </div>
</template>

<script>
import MessageComponent from "@/components/MessageComponent.vue";
import {mapActions, mapGetters} from "vuex";
import AppBar from "@/components/AppBar.vue";

export default {
  name: "ChatComponent",
  components: {
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
      messageListContainer.lastElementChild.scrollIntoView({behavior: "smooth"});
    },
    ...mapActions(["sendMessageAsync"])
  },
  computed: {
    ...mapGetters({
      messages: "getMessages",
      authUser: "getAuthenticatedUser",
      receiver: "getReceiver"
    })
  }
}
</script>

<style scoped lang="scss">
.main-content {
  $sendBoxHeight: 64px;
  position: relative;

  .messages-area {
    display: flex;
    flex-direction: column;
    justify-content: end;
    height: calc(100% - #{$sendBoxHeight});
    padding-top: $sendBoxHeight;
  }

  .send-box-area {
    height: $sendBoxHeight;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.1);
    background-color: white;
  }
}
</style>
