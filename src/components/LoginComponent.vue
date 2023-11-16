<template>
  <signup-login-layout>
    <v-card>
      <v-card-title class="pb-0">Login</v-card-title>
      <v-form @submit.prevent="login" v-model="validForm">
        <v-container class="px-4">
          <v-alert v-if="!validForm && submittedOnce" type="error" outlined dense>
            Form is not valid.
          </v-alert>
          <v-alert v-if="authFailed" type="error" outlined dense>
            Email or Password is not correct.
          </v-alert>
          <v-alert v-if="errorRedirect" type="warning" outlined dense>
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

<script>
import SignupLoginLayout from './SignupLoginLayout.vue';
import {constants} from "@/constants";
import {mapActions} from "vuex";

export default {
  name: "SignupComponent",
  components: {
    'signup-login-layout': SignupLoginLayout
  },
  data() {
    return {
      validForm: false,
      showPassword: false,
      submittedOnce: false,
      authFailed: false,
      loginData: {
        email: '',
        password: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        minimumPasswordLength: value => value.length >= 6 || "Password should be at least 6 characters.",
        minLength: value => value.length >= 2 || "At least 2 characters required.",
        maxLength: value => value.length <= 255 || "At most 255 characters allowed.",
        email: value => constants.validEmailRegex.test(value) || "Email is not valid.",
      },
      errorRedirect: false
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      this.submittedOnce = true;
      if (!this.validForm) {
        return;
      }

      const loggedInUser = await this.loginUser(this.loginData);
      if (!loggedInUser) {
        this.authFailed = true;
        return;
      }

      await this.$router.push({path: "/"});
    },
    ...mapActions(["loginUser"])
  },
  created() {
    this.errorRedirect = !!this.$route.query["errorRedirect"];
  }
}
</script>
