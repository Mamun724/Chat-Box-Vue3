<template>
  <signup-login-layout>
    <v-card>
      <v-card-title class="pb-0">Sign Up</v-card-title>
      <v-form @submit.prevent="createUser" v-model="validForm">
        <v-container class="px-4">
          <v-alert v-if="!validForm && submittedOnce" type="error" outlined dense>
            Form is not valid.
          </v-alert>
          <v-alert v-if="passwordMismatch" type="error" outlined dense>
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
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="Password*"
              :type="showPassword ? 'text' : 'password'"
              :rules="[rules.required, rules.minimumPasswordLength, rules.maxLength]"
              @click:append="togglePasswordVisibility"/>
          <v-text-field
              v-model="signUpData.confirmedPassword"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="Confirm Password*"
              :type="showPassword ? 'text' : 'password'"
              :rules="[rules.required, rules.minimumPasswordLength, rules.maxLength]"
              @click:append="togglePasswordVisibility"/>
          <v-file-input
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

<script>
import SignupLoginLayout from './SignupLoginLayout.vue';
import {constants} from "@/constants";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SignupComponent",
  components: {
    'signup-login-layout': SignupLoginLayout
  },
  data() {
    return {
      validForm: false,
      showPassword: false,
      passwordMismatch: false,
      submittedOnce: false,
      signUpData: {
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmedPassword: '',
        profilePicture: null
      },
      rules: {
        required: value => !!value || 'Required.',
        minimumPasswordLength: value => value.length >= 6 || "Password should be at least 6 characters.",
        minLength: value => value.length >= 2 || "At least 2 characters required.",
        maxLength: value => value.length <= 255 || "At most 255 characters allowed.",
        email: value => constants.validEmailRegex.test(value) || "Email is not valid.",
        emailUnique: value => this.findUser(value) == null || "User with the email already exists."
      }
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async createUser() {
      this.submittedOnce = true;
      if (!this.validForm) {
        return;
      }

      if (this.signUpData.password !== this.signUpData.confirmedPassword) {
        this.passwordMismatch = true;
        return;
      } else {
        this.passwordMismatch = false;
      }

      const profilePicturePath = this.signUpData?.profilePicture ? "@/assets/user-profile-pic.jpg" : null;

      const userData = {
        ...this.signUpData,
        profilePicture: profilePicturePath,
        confirmedPassword: undefined,
      };

      await this.registerUserAsync(userData);
      await this.$router.push({path: "/login"});
    },
    ...mapActions(["registerUserAsync"])
  },
  computed: {
    ...mapGetters(["findUser"])
  }
}
</script>
