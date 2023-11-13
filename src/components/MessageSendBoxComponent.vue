<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MessageSendBoxComponent",
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
      this.$emit("messageSent");
    },
    sendAttachment() {
      console.log('send attachment');
    },
    ...mapActions(["sendMessageAsync"])
  },
  computed: {
    ...mapGetters({
      authUser: "getAuthenticatedUser",
      receiver: "getReceiver"
    })
  },
}
</script>

<template>
  <div class="send-box-area d-flex align-center">
    <v-text-field
        v-model="message"
        append-icon="mdi-send"
        append-outer-icon="mdi-attachment"
        text
        class="mx-3"
        placeholder="Write message here..."
        :disabled="!receiver"
        @keyup.enter="sendMessage"
        @click:append="sendMessage"
        @click:append-outer="sendAttachment"/>
  </div>
</template>

<style scoped lang="scss">
$sendBoxHeight: 64px;
.send-box-area {
  height: $sendBoxHeight;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
}
</style>