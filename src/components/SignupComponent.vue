<template>
  <signup-login-layout>
    <v-card>
      <v-card-title class="pb-0">Sign Up</v-card-title>
      <v-form @submit.prevent="createUser" v-model="validForm">
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
              v-if="passwordMismatch"
              type="error"
              variant="outlined"
              density="compact"
              class="mb-2">
            Passwords don't match.
          </v-alert>
          <v-text-field
              v-model="signUpData.fullName"
              label="Full Name*"
              :rules="[rules.required, rules.minLength, rules.maxLength]"/>
          <v-text-field
              v-model="signUpData.username"
              label="Username*"
              :rules="[rules.required, rules.minLength, rules.maxLength]"/>
          <v-text-field
              v-model="signUpData.email"
              label="Email*"
              type="email"
              :rules="[rules.required, rules.minLength, rules.email, rules.emailUnique, rules.maxLength]"/>
          <v-text-field
              v-model="signUpData.password"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="Password*"
              :type="showPassword ? 'text' : 'password'"
              :rules="[rules.required, rules.minimumPasswordLength, rules.maxLength]"
              @click:append-inner="togglePasswordVisibility"/>
          <v-text-field
              v-model="signUpData.confirmedPassword"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="Confirm Password*"
              :type="showPassword ? 'text' : 'password'"
              :rules="[rules.required, rules.minimumPasswordLength, rules.maxLength]"
              @click:append-inner="togglePasswordVisibility"/>
          <v-file-input
              label="Profile Picture"
              v-model="signUpData.profilePicture" placeholder="Profile Picture"/>
          <v-row justify="end" align="center" class="px-3 pb-3 pt-1">
            <span>Already registered? <router-link to="/login">Login</router-link></span>
            <v-btn class="ml-auto" color="primary" type="submit">Sign Up</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </signup-login-layout>
</template>

<script setup>
import SignupLoginLayout from './SignupLoginLayout.vue';
import {constants} from "@/constants";
import {useStore} from "vuex";
import {ref} from "vue";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

const validForm = ref(false);
const showPassword = ref(false);
const passwordMismatch = ref(false);
const submittedOnce = ref(false);
const signUpData = ref({
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmedPassword: '',
  profilePicture: null
});

const rules = {
  required: value => !!value || 'Required.',
  minimumPasswordLength: value => value.length >= 6 || "Password should be at least 6 characters.",
  minLength: value => value.length >= 2 || "At least 2 characters required.",
  maxLength: value => value.length <= 255 || "At most 255 characters allowed.",
  email: value => constants.validEmailRegex.test(value) || "Email is not valid.",
  emailUnique: value => store.getters.findUser(value) == null || "User with the email already exists."
};

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

async function createUser() {
  submittedOnce.value = true;
  if (!validForm.value) {
    return;
  }

  if (signUpData.value.password !== signUpData.value.confirmedPassword) {
    passwordMismatch.value = true;
    return;
  } else {
    passwordMismatch.value = false;
  }

  const profilePicturePath = signUpData.value.profilePicture ? "/assets/user-profile-pic.jpg" : null;

  const userData = {
    ...signUpData.value,
    profilePicture: profilePicturePath,
    confirmedPassword: undefined,
  };

  await store.dispatch("registerUser", userData);
  await router.push({path: "/login"});
}
</script>
