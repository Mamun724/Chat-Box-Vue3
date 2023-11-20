<template>
  <div class="game-area text-center overflow-y-auto">
    <GameStartCountDownComponent v-if="showStartCountDown" @counter-ended="startGame"/>
    <div v-if="!showStartCountDown">
      <v-container v-if="gameEnded">
        <span v-if="winner !== 'D'">Winner is "{{ winner }}"</span>
        <span v-else>Game Drawn</span>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="6">
            Player: {{ lastGameState?.playerTurn }}
          </v-col>
          <v-col cols="6" v-if="timeoutRemaining">
            Timer: {{ timeoutRemaining }}s
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <GameBoard
                :gameState="lastGameState"
                @turnChanged="turnChanged"/>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <GameStateList @stateReset="startGame"/>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import GameBoard from "@/components/tic-tac-toe/GameBoardComponent.vue";
import {computed, onBeforeUnmount, ref, watch} from "vue";
import {useStore} from "vuex";
import GameStartCountDownComponent from "@/components/tic-tac-toe/GameStartCountDownComponent.vue";
import GameStateList from "@/components/tic-tac-toe/GameStateList.vue";
import {winningStrategy} from "@/components/tic-tac-toe/winningStrategy";
import {constants} from "@/constants";

const store = useStore();

const opponent = computed(() => store.state.receiverUser);
const lastGameState = computed(() => store.getters.getLatestGameState(opponent.value.email));
const gameEnded = computed(() => store.getters.IsGameEnded);

const showStartCountDown = ref(true);
const timeoutRemaining = ref(null);
const intervalId = ref(null);
const winner = ref(false);

onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});

function startGame() {
  store.commit("setGameEnd", false);
  showStartCountDown.value = false;
  checkIfWin();
}

function turnChanged() {
  if (!opponent.value) {
    return;
  }
  checkIfWin();
}

function checkIfWin() {
  winner.value = winningStrategy(
      lastGameState.value.board,
      store.state.boardSize
  );

  if (winner.value) {
    store.commit("setGameEnd", true);
    timeoutRemaining.value = 0;
    clearInterval(intervalId.value);
  } else {
    resetTimer();
  }
}

function resetTimer() {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }

  timeoutRemaining.value = store.state.timeoutDuration;
  intervalId.value = setInterval(() => {
    timeoutRemaining.value = timeoutRemaining.value - 1;
    if (timeoutRemaining.value <= 0) {
      winner.value = lastGameState.value.playerTurn === constants.ownSymbol
          ? constants.opponentSymbol
          : constants.ownSymbol;
      store.commit("setGameEnd", true);
      clearInterval(intervalId.value);
    }
  }, 1000);
}
</script>

<style scoped lang="scss">
$appBarHeight: 64px;
.game-area {
  width: 100%;
  height: calc(100vh - #{$appBarHeight});
}
</style>
