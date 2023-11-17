<template>
  <div class="game-board my-3 overflow-auto">
    <div class="d-flex flex-column">
      <div v-for="row in boardSize"
           class="d-flex flex-row justify-center">
        <BoardTileComponent v-for="col in boardSize"
                            @tile-clicked="tileClicked"
                            :playerSymbol="gameState.board[(row-1)*boardSize + col-1]"
                            :stateIndex="(row-1)*boardSize + col-1"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import {constants} from "@/constants";
import BoardTileComponent from "@/components/tic-tac-toe/BoardTileComponent.vue";

const store = useStore();
const props = defineProps(["gameState"]);
const emit = defineEmits(["turnChanged"]);

const boardSize = store.state.boardSize;
const opponent = computed(() => store.state.receiverUser);

function tileClicked(index) {
  const gameState = store.getters.getLatestGameState(opponent.value.email);
  const board = [...gameState.board];
  const currentPlayerSymbol = gameState.playerTurn;

  board[index] = currentPlayerSymbol;
  const nextPlayer = currentPlayerSymbol === constants.ownSymbol ?
      constants.opponentSymbol :
      constants.ownSymbol;

  const gameStatePayload = {
    opponentEmail: opponent.value.email,
    gameState: {
      playerTurn: nextPlayer,
      board
    }
  };

  store.commit("addGameState", gameStatePayload);
  emit("turnChanged");
}
</script>

<style scoped>

</style>
