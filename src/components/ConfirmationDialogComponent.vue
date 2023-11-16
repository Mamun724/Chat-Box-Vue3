<template>
  <v-dialog
      v-model="showDialog"
      width="500">
    <template v-slot:activator="{props}">
      <v-btn
          :icon="activatorButtonIcon"
          variant="text"
          v-bind="props">
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
              variant="text"
              @click="cancel">
            {{ cancelBtnText }}
          </v-btn>
          <v-btn
              color="primary"
              variant="text"
              @click="confirm">
            {{ confirmBtnText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";

defineProps({
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
});
const emit = defineEmits(["confirmed", "canceled"]);

const showDialog = ref(false);

function confirm(event) {
  showDialog.value = false;
  emit('confirmed', event);
}

function cancel(event) {
  showDialog.value = false;
  emit('canceled', event);
}
</script>

<style scoped>

</style>
