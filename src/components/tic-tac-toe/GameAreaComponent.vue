<template>
  <div class="game-area">
    <v-container v-if="!opponent">
      <v-alert variant="outlined" type="info">
        Start Chat and play game
      </v-alert>
    </v-container>
    <v-container v-else class="text-center">
      <v-btn @click="startOrPauseGame">
        <span v-if="!gameStarted">Start/Resume Play</span>
        <span v-if="gameStarted">Pause Game</span>
      </v-btn>
      <v-container v-if="!gameStarted">
        Start a game with {{ opponent.fullName }}!!
      </v-container>
      <v-container v-if="gameStarted">
        <v-row>
          <v-col>
            Player {{ lastGameState?.playerTurn }}
          </v-col>
          <v-col>
            Timer
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
    </v-container>
  </div>
</template>

<script setup>
import GameBoard from "@/components/tic-tac-toe/GameBoardComponent.vue";
import {computed, ref, watch} from "vue";
import {useStore} from "vuex";

const store = useStore();

const opponent = computed(() => store.state.receiverUser);

const gameStarted = ref(false);
const lastGameState = ref(null);

watch(opponent, async (opponentNewValue) => {
  await store.dispatch("initGame", opponentNewValue);
  gameStarted.value = false;
  lastGameState.value = store.getters.getLatestGameState(opponentNewValue.email);
});

function startOrPauseGame() {
  gameStarted.value = !gameStarted.value;
}

function turnChanged() {
  if (!opponent.value) {
    return;
  }
  lastGameState.value = store.getters.getLatestGameState(opponent.value.email);
}
</script>

<style scoped>
.game-area {
  width: 100%;
}
</style>
