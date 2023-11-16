<template>
  <v-main>
    <v-container :fluid="true" class="fill-height">
      <v-row align-content="center">
        <v-spacer/>
        <v-col cols="8" md="4"><slot></slot></v-col>
        <v-spacer/>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "SignupLoginPageLayout",
};
</script>
