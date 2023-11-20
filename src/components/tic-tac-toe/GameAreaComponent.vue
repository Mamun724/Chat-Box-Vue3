<template>
  <div class="game-area text-center fill-height">
    <GameStartCountDownComponent v-if="showStartCountDown" @counter-ended="startGame"/>
    <div v-if="!showStartCountDown">
      <v-container v-if="gameEnded">
        Winner is TBD
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
        <GameStateList/>
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

const store = useStore();

const opponent = computed(() => store.state.receiverUser);
const lastGameState = computed(() => store.getters.getLatestGameState(opponent.value.email));
const gameEnded = computed(() => store.getters.IsGameEnded);

const showStartCountDown = ref(true);
const timeoutRemaining = ref(null);
const intervalId = ref(null);

onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});

function startGame() {
  store.commit("setGameEnd", false);
  showStartCountDown.value = false;
  resetTimer();
}

function turnChanged() {
  if (!opponent.value) {
    return;
  }

  resetTimer();
}

watch(lastGameState, (gs) => console.log(gs));

function resetTimer() {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }

  timeoutRemaining.value = store.state.timeoutDuration;
  intervalId.value = setInterval(() => {
    timeoutRemaining.value = timeoutRemaining.value - 1;
    if (timeoutRemaining.value <= 0) {
      store.commit("setGameEnd", true);
      clearInterval(intervalId.value);
    }
  }, 1000);
}
</script>

<style scoped>
.game-area {
  width: 100%;
}
</style>
