<template>
  <div class="state-overview text-left d-flex justify-space-between">
    <ol class="state-list">
      <li v-for="(gameState, index) of gameStates"
          @click="selectState(index)"
          class="game-state-list-item px-2 py-0"
          :class="{selected: index === selectedStateIndex}"
          title="See the game state">
        Player Was: {{ gameState.playerTurn }}
      </li>
    </ol>
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
          variant="tonal"
          size="small"
          class="mt-2"
          @click="restartAtIndex">
        Restart from This State
      </v-btn>
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

    .game-state-list-item {
      cursor: pointer;
    }

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
      border: 1px solid #dddddd;
    }
  }
}
</style>
