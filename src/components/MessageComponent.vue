<template>
  <v-container class="mt-1">
    <v-row v-if="sender.username !== message.sender">
      <v-col cols="10">
        <div class="d-flex align-start">
          <v-avatar size="36" class="mr-2 avatar">
            <v-img :src="receiver.profilePicture" :alt="receiver.username"/>
          </v-avatar>
          <div class="message-content" :title="messageTime">
            {{ message.content }}
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-spacer/>
      <v-col class="text-right" cols="10">
        <div class="d-flex align-start justify-end">
          <div class="message-content" :title="messageTime">
            {{ message.content }}
          </div>
          <v-avatar size="36" class="ml-2 avatar">
            <v-img :src="sender.profilePicture" :alt="sender.username"/>
          </v-avatar>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const props = defineProps({
  message: {
    type: Object,
    required: true
  }
});

const sender = computed(() => store.state.authenticatedUser);
const receiver = computed(() => store.state.receiverUser);
const messageTime = computed(() => props.message.timestamp.toString());
</script>

<style scoped>
.message-content {
  border-radius: 8px;
  padding: 8px;
  background-color: azure;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
}

.avatar {
  border: 1px solid darkgrey;
}
</style>
