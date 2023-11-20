<template>
  <div class="state-overview text-left d-flex justify-space-between">
    <ol class="state-list">
      <li v-for="gameState of gameStates"
          @click="selectState(gameState)"
          class="game-state-list-item px-2 py-0"
          :class="{selected: gameState===selectedState}"
          title="See the game state">
        Player Was: {{ gameState.playerTurn }}
      </li>
    </ol>
    <div v-if="selectedState" class="state-preview pa-2">
      <h4 class="overview-head"><em>Selected State Overview</em></h4>
      <div class="d-flex flex-column">
        Player: {{ selectedState.playerTurn }}
        <div v-for="row in boardSize" class="d-flex justify-center">
          <div v-for="col in boardSize" class="d-inline-block cell text-center">
            {{ selectedState.board[(row - 1) * boardSize + col - 1] }}
          </div>
        </div>
      </div>
      <v-btn variant="tonal" size="small" class="mt-2">
        Reset To this state
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";

const store = useStore();

const boardSize = store.state.boardSize;
const opponent = computed(() => store.state.receiverUser);
const gameStates = computed(() => store.getters.getGameStates(opponent.value.email));

const selectedState = ref(null);

function selectState(gameState) {
  selectedState.value = gameState;
  console.log(selectedState.value);
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
