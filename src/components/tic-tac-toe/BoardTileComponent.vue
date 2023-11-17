<template>
  <v-btn
      variant="plain"
      class="board-tile-btn pa-0"
      @click="played">
    {{ playerSymbol }}
  </v-btn>
</template>

<script setup>
const props = defineProps({
  stateIndex: {
    type: Number,
    required: true
  },
  playerSymbol: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['tileClicked']);

function played() {
  if (!props.playerSymbol) {
    emit("tileClicked", props.stateIndex);
  }
}
</script>

<style scoped>
.board-tile-btn {
  min-width: 36px;
  border-radius: 0;
  border: 1px solid #dddddd;
}
</style>
