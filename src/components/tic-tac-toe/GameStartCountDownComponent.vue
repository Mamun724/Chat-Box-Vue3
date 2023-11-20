<template>
  <div class="d-flex flex-column fill-height justify-center">
    <h2>Game Starting in</h2>
    <p class="counter">{{ counter }}</p>
    <h3>Seconds</h3>
  </div>
</template>

<script setup>
import {onBeforeUnmount, ref} from "vue";

const emit = defineEmits(["counterEnded"]);

const counter = ref(3);
const intervalId = ref(null);

onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
});

intervalId.value = setInterval(() => {
  counter.value = counter.value - 1;
  if (counter.value <= 0) {
    emit("counterEnded");
  }
}, 1000);
</script>

<style scoped>
.counter {
  font-size: 8em;
}
</style>
