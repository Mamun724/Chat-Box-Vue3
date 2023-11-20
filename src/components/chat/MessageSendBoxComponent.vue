<template>
  <div class="send-box-area d-flex align-center">
    <v-text-field
        v-model="message"
        append-inner-icon="mdi-send"
        class="mx-3"
        variant="underlined"
        placeholder="Write message here..."
        :disabled="!receiver"
        hide-details
        @click:append-inner="sendMessageHandler"
        @keyup.enter="sendMessageHandler">
      <template v-slot:append>
          <v-icon class="append-icons" @click="sendAttachment">mdi-attachment</v-icon>
          <v-icon class="ml-4 append-icons" @click="playGame">mdi-gamepad-variant</v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";

const store = useStore();
const emit = defineEmits(["messageSent"]);

const message = ref("");

const authUser = computed(() => store.state.authenticatedUser);
const receiver = computed(() => store.state.receiverUser);

async function sendMessageHandler() {
  if (!message.value) {
    return;
  }

  const msg = {
    content: message.value,
    sender: authUser.value.username,
    receiver: receiver.value.username,
    timestamp: new Date(),
    randId: Math.random()
  };

  await store.dispatch("sendMessage", msg);
  message.value = "";
  emit("messageSent");
}

function sendAttachment() {
  console.log('send attachment');
}

async function playGame() {
  store.commit("setPlayGame", !store.state.playGame);
}
</script>

<style scoped lang="scss">
.send-box-area {
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
}
</style>