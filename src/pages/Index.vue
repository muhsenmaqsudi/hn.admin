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
          <h5 class="q-mb-lg">ورود به پنل مدیریت</h5>
          <p>شبکه تندرستی</p>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md col-8">
            <q-input
              dir="ltr"
              filled
              v-model="loginDTO.username"
              label="نام کاربری"
              hint="ایمیل یا شماره موبایل شما برای ورود به پنل"
              lazy-rules
              :rules="[
                val =>
                  (val &&
                    val.length > 0 &&
                    val.match(/^(09\d{9})|(\S+@\S+.\S+)$/i)) ||
                  'لطفا ایمیل یا شماره موبایل خود را وارد نمائید'
              ]"
            />

            <q-input
              dir="ltr"
              filled
              type="password"
              v-model="loginDTO.password"
              label="گذرواژه"
              lazy-rules
              :rules="[
                val =>
                  (val !== null && val !== '') ||
                  'لطفا گذرواژه خود را وارد نمائید'
              ]"
            />

            <div>
              <q-btn label="ورود" type="submit" color="primary" />
              <q-btn
                label="پاک کردن فرم"
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
import LoginDTO from '../interfaces/LoginDTO.interface';
import { getModule } from 'vuex-module-decorators';
import AuthStore from '../store/modules/AuthStore';

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
