<template>
  <v-dialog
      v-model="showDialog"
      width="500">
    <template v-slot:activator="{on, attrs}">
      <v-btn
          :icon="activatorButtonIcon"
          v-bind="attrs"
          v-on="on">
        <slot name="activatorBtnContent">
          Open Confirmation Dialog
        </slot>
      </v-btn>
    </template>

    <template v-slot:default>
      <v-card>
        <v-card-title>
          {{ title }}
        </v-card-title>

        <v-card-text>
          {{ message }}
        </v-card-text>

        <v-divider/>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              v-if="showCancelBtn"
              color="secondary"
              text
              @click="cancel"
          >
            {{ cancelBtnText }}
          </v-btn>
          <v-btn
              color="primary"
              text
              @click="confirm"
          >
            {{ confirmBtnText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmationDialogComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    showCancelBtn: {
      type: Boolean,
      default: true,
    },
    confirmBtnText: {
      type: String,
      default: "Yes",
    },
    cancelBtnText: {
      type: String,
      default: "No",
    },
    activatorButtonIcon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    confirm(event) {
      this.showDialog = false;
      this.$emit('confirmed', event);
    },
    cancel(event) {
      this.showDialog = false;
      this.$emit('canceled', event);
    }
  }
}
</script>

<style scoped>

</style>
