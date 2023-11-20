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
      <div v-else class="message-list py-2" ref="messageListContainer">
        <message-component v-for="message in messages" :key="message.randId" :message="message"/>
      </div>
    </div>
    <message-send-box-component @messageSent="moveToBottom"/>
  </div>
</template>

<script setup>
import MessageComponent from "@/components/chat/MessageComponent.vue";
import {useStore} from "vuex";
import MessageSendBoxComponent from "@/components/chat/MessageSendBoxComponent.vue";
import {computed, nextTick, onBeforeUnmount, ref} from "vue";

const intervalId = setInterval(() => simulateReceiver(), 5000);
onBeforeUnmount(() => clearInterval(intervalId));

moveToBottom();

const store = useStore();
const authUser = computed(() => store.state.authenticatedUser);
const receiver = computed(() => store.state.receiverUser);
const messages = computed(() => store.state.messages.filter(
    message =>
        (
            message.receiver === receiver.value.username &&
            message.sender === authUser.value.username
        ) ||
        (
            message.sender === receiver.value.username &&
            message.receiver === authUser.value.username
        )
));

async function simulateReceiver() {
  if (!receiver.value) {
    return;
  }

  let message = `Simulating receiver message at ${new Date().toLocaleTimeString()}`;
  const msg = {
    content: message,
    sender: receiver.value.username,
    receiver: authUser.value.username,
    timestamp: new Date(),
    randId: Math.random()
  };

  await store.dispatch("sendMessage", msg);
  moveToBottom();
}

const messageListContainer = ref(null);

function moveToBottom() {
  nextTick(() =>
      messageListContainer.value?.lastElementChild?.scrollIntoView({behavior: "smooth"}));
}
</script>

<style scoped lang="scss">
$sendBoxHeight: 56px;
$appBarHeight: 64px;
.chat-area {
  height: calc(100vh - #{$appBarHeight});
  width: 100%;

  .message-list-wrapper {
    height: calc(100% - #{$sendBoxHeight});
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .message-list {
      max-height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
