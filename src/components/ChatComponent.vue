<template>
  <div class="fill-height">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
            alt="Site Logo"
            class="shrink mr-2"
            contain
            src="@/assets/logo.png"
            transition="scale-transition"
            width="40"
        />
      </div>

      <v-spacer></v-spacer>
      <logout-component/>
    </v-app-bar>

    <v-main class="fill-height main-content">
      <div class="messages-area px-2 py-2">
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
import LogoutComponent from "@/components/LogoutComponent.vue";
import MessageComponent from "@/components/MessageComponent.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ChatComponent",
  components: {
    "message-component": MessageComponent,
    "logout-component": LogoutComponent
  },
  data() {
    return {
      message: ''
    };
  },
  methods: {
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
    },
    sendAttachment() {
      console.log('send attachment');
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
  }
}
</style>
