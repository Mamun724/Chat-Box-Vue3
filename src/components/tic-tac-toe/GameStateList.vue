<template>
  <div class="state-overview text-left d-flex justify-space-between">
    <div>
      <h4>Game State History</h4>
      <ol class="state-list">
        <li v-for="(gameState, index) of gameStates"
            class="game-state-list-item pl-2 py-0"
            :class="{selected: index === selectedStateIndex}">
          <span>Player: "{{ gameState.playerTurn }}"</span>
          <v-btn
              class="pa-0"
              size="x-small"
              variant="plain"
              @click="selectState(index)"
              icon
              title="See the game state">
            <v-icon>mdi-restore</v-icon>
          </v-btn>
        </li>
      </ol>
    </div>
    <div>
      <div v-if="selectedStateIndex !== null" class="state-preview pa-2">
        <h4 class="overview-head"><em>Selected State Overview</em></h4>
        <div class="d-flex flex-column">
          Player: {{ gameStates[selectedStateIndex].playerTurn }}
          <div v-for="row in boardSize" class="d-flex justify-center">
            <div v-for="col in boardSize" class="d-inline-block cell text-center">
              {{ gameStates[selectedStateIndex].board[(row - 1) * boardSize + col - 1] }}
            </div>
          </div>
        </div>
        <v-btn
            prepend-icon="mdi-restore"
            variant="tonal"
            size="x-small"
            class="mt-2"
            @click="restartAtIndex">
          Restart from This State
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";

const store = useStore();

const emit = defineEmits(["stateReset"]);

const boardSize = store.state.boardSize;
const opponent = computed(() => store.state.receiverUser);
const gameStates = computed(() => store.getters.getGameStates(opponent.value.email));

const selectedStateIndex = ref(null);

function selectState(gameStateIndex) {
  selectedStateIndex.value = gameStateIndex;
}

async function restartAtIndex() {
  await store.dispatch("restartGameAtIndex", {
    opponentEmail: opponent.value.email,
    index: selectedStateIndex.value
  });
  selectedStateIndex.value = null;
  emit("stateReset");
}
</script>

<style scoped>
.state-overview {
  .state-list {
    padding-left: 20px;

    .game-state-list-item.selected {
      background-color: #dddddd;
      border-radius: 5px;
    }
  }

  .state-preview {
    border: 1px solid grey;

    .cell {
      width: 24px;
      height: 24px;
      min-width: 24px;
      border: 1px solid #dddddd;
    }
  }
}
</style>
