<template>
  <v-btn
      variant="plain"
      class="board-tile-btn pa-0"
      @click="played"
      :disabled="gameEnded">
    {{ playerSymbol }}
  </v-btn>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

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
const store = useStore();
const gameEnded = computed(() => store.getters.IsGameEnded);

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
