<template>
  <signup-login-layout>
    <v-card>
      <v-card-title class="pb-0">Login</v-card-title>
      <v-form @submit.prevent="login" v-model="validForm">
        <v-container class="px-4">
          <v-alert
              v-if="!validForm && submittedOnce"
              type="error"
              variant="outlined"
              density="compact"
              class="mb-2">
            Form is not valid.
          </v-alert>
          <v-alert
              v-if="authFailed"
              type="error"
              variant="outlined"
              density="compact"
              class="mb-2">
            Email or Password is not correct.
          </v-alert>
          <v-alert
              v-if="errorRedirect"
              type="warning"
              variant="outlined"
              density="compact"
              class="mb-2">
            Please login first to access the route.
          </v-alert>

          <v-text-field
              v-model="loginData.email"
              label="Email*"
              type="email"
              :rules="[rules.required, rules.minLength, rules.email, rules.maxLength]"/>
          <v-text-field
              v-model="loginData.password"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="Password*"
              :type="showPassword ? 'text' : 'password'"
              :rules="[rules.required, rules.minimumPasswordLength, rules.maxLength]"
              @click:append-inner="togglePasswordVisibility"/>
          <v-row justify="end" align="center" class="px-3 pb-3 pt-1">
            <span>Not registered? <router-link to="/signup">Sign Up</router-link></span>
            <v-btn class="ml-auto" color="primary" type="submit">Login</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </signup-login-layout>
</template>

<script setup>
import SignupLoginLayout from "@/components/SignupLoginLayout.vue";
import {ref} from "vue";
import {constants} from "@/constants";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";

const store = useStore();
const router = useRouter();
const route = useRoute();

const validForm = ref(false);
const submittedOnce = ref(false);
const authFailed = ref(false);
const loginData = ref({
  email: '',
  password: ''
});

const rules = {
  required: value => !!value || 'Required.',
  minimumPasswordLength: value => value.length >= 6 || "Password should be at least 6 characters.",
  minLength: value => value.length >= 2 || "At least 2 characters required.",
  maxLength: value => value.length <= 255 || "At most 255 characters allowed.",
  email: value => constants.validEmailRegex.test(value) || "Email is not valid."
};

const showPassword = ref(false);
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

const errorRedirect = !!route.query["errorRedirect"];

async function login() {
  submittedOnce.value = true;
  if (!validForm.value) {
    return;
  }

  const loggedInUser = await store.dispatch("loginUser", loginData.value);
  if (!loggedInUser) {
    authFailed.value = true;
    return;
  }

  await router.push({path: "/"});
}
</script>
