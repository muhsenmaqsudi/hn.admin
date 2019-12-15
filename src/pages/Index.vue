<template>
  <div class="row">
    <div class="col">
      <div class="auth-logo"></div>
    </div>
    <div class="col-4 justify-end text-center">
      <q-card class="column q-pa-xl" style="padding-bottom: 4rem; height: 100%">
        <div class="justify-center q-gutter-lg q-pt-xl">
          <img
            class="ehealth-logo self-center q-pr-lg"
            src="~assets/logo.png"
            alt="electronic health logo"
          />
          <h5 class="q-mb-lg">{{ $t('pages.login.pageTitle') }}</h5>
          <p>{{ $t('pages.login.pageSubtitle') }}</p>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md col-8">
            <q-input
              dir="ltr"
              filled
              v-model="loginDTO.username"
              :label="$t('forms.login.username')"
              :hint="$t('forms.login.hint.username')"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0 && val.match(/^(09\d{9})|(\S+@\S+.\S+)$/i)) ||
                  $t('validations.login.username')
              ]"
            />

            <q-input
              dir="ltr"
              filled
              type="password"
              v-model="loginDTO.password"
              :label="$t('forms.login.password')"
              lazy-rules
              :rules="[
                val => (val !== null && val !== '') || $t('validations.login.password')
              ]"
            />

            <div>
              <q-btn :label="$t('forms.loginBtn')" type="submit" color="primary" />
              <q-btn
                :label="$t('forms.resetBtn')"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import { AuthStore } from '../store/modules';
import { LoginDTO } from '../types';

@Component
export default class Index extends Vue {
  store = getModule(AuthStore);

  get loginDTO() {
    return this.store.loginDTO;
  }

  set loginDTO(data: LoginDTO) {
    this.store.SET_LOGIN_DTO(data);
  }

  async onSubmit() {
    await this.store.verifyAuthentication();
    if (this.store.isAuthenticated) {
      this.$router.push({ name: 'panel' });
    }
  }

  onReset() {
    this.loginDTO.username = null;
    this.loginDTO.password = null;
  }
}
</script>

<style scoped>
.ehealth-logo {
  width: 140px;
  height: 90px;
}
.auth-logo {
  background-image: url('~assets/Medical3.jpg');
  background-size: 100% 100%;
  height: 100vh;
  background-repeat: no-repeat;
}
</style>
