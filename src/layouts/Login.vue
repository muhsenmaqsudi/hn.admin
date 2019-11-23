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
          <h5 class="q-mb-lg">ورود به پنل ادمین</h5>
          <p>شبکه سلامت</p>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md col-8">
            <q-input
              dir="ltr"
              filled
              v-model="email"
              label="ایمیل یا موبایل"
              hint="ایمیل یا موبایل شما برای ورود به پنل"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0 && val.match(/^(09\d{9})|(\[a-z]\w*\@\w+\.\w+)$/i)) ||
                  'لطفا ایمیل یا موبایل خود را وارد نمائید'
              ]"
            />

            <q-input
              dir="ltr"
              filled
              type="password"
              v-model="password"
              label="گذرواژه"
              lazy-rules
              :rules="[
                val =>
                  (val !== null && val !== '') ||
                  'لطفا گذرواژه خود را وارد نمائید'
              ]"
            />

            <!-- <q-toggle
                v-model="accept"
                label="I accept the license and terms"
              /> -->

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

@Component
export default class Login extends Vue {
  email = null;
  mobile = null;
  password = null;
  accept = false;

  onSubmit() {
    if (this.accept !== true) {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'You need to accept the license and terms first'
      });
    } else {
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Submitted'
      });
    }
  }

  onReset() {
    this.email = null;
    this.mobile = null;
    this.password = null;
    this.accept = false;
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
