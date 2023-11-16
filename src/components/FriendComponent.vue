<template>
  <v-list-item
      @click="friendClicked"
      :title="friend.fullName"
      :subtitle="friend.username">
    <template v-slot:prepend>
      <v-avatar>
        <v-img :src="friend.profilePicture"></v-img>
      </v-avatar>
    </template>

    <template v-slot:append>
      <ConfirmationDialogComponent
          title="Are you sure?"
          :message="`Are you sure to unfriend '${friend.username}'?`"
          :activatorButtonIcon="true"
          @confirmed="unfriendConfirmed">
        <template v-slot:activatorBtnContent>
          <v-icon color="grey lighten-1">mdi-close</v-icon>
        </template>
      </ConfirmationDialogComponent>
    </template>
  </v-list-item>
</template>

<script setup>
import {useStore} from "vuex";
import ConfirmationDialogComponent from "@/components/ConfirmationDialogComponent.vue";

const store = useStore();

const props = defineProps({
  friend: {}
});

function friendClicked() {
  store.commit("setReceiver", props.friend);
}

async function unfriendConfirmed(event) {
  event.stopPropagation();
  await store.dispatch("unfriend", props.friend);
}
</script>

<style scoped>

</style>
