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

<script>
import {mapActions, mapMutations} from "vuex";
import ConfirmationDialogComponent from "@/components/ConfirmationDialogComponent.vue";

export default {
  name: "FriendComponent",
  components: {ConfirmationDialogComponent},
  props: {
    friend: {}
  },
  data() {
    return {showDialog: false};
  },
  methods: {
    friendClicked() {
      this.setReceiver(this.friend);
    },
    async unfriendConfirmed(event) {
      event.stopPropagation();
      await this.unfriend(this.friend);
    },
    ...mapMutations(["setReceiver"]),
    ...mapActions(["unfriend"])
  }
}
</script>

<style scoped>

</style>
