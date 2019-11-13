<template>
  <div class="q-pa-md">
    <div class="row justify-center text-center q-mt-xl">
      <div class="column">
        <img
          class="ehealth-logo"
          src="~assets/logo.png"
          alt="electronic health logo"
        />
        <h5 class="q-mb-lg">ورود به پنل ادمین</h5>
        <p>شبکه سلامت</p>
      </div>
    </div>

    <q-card class="column">
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </q-card-section>
    </q-card>

    <div class="row justify-center">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md col-md-5">
        <q-input
          filled
          v-model="name"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="number"
          v-model="age"
          label="Your age *"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your age',
            val => (val > 0 && val < 100) || 'Please type a real age'
          ]"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      name: null,
      age: null,

      accept: false
    };
  },

  methods: {
    /**
     * @this {Vue}
     */
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
    },
    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    }
  }
});
</script>

<style scoped>
.ehealth-logo {
  width: 200px;
  height: 200px;
}
</style>
