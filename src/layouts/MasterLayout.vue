<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>شبکه تندرستی</q-toolbar-title>

        <q-btn flat round dense icon="supervised_user_circle">
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">تنظیمات</div>
                <q-toggle
                  v-model="dark"
                  @input="toggleThemeMode"
                  label="قالب تیره"
                />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">Admin</div>

                <q-btn
                  color="primary"
                  icon="fas fa-sign-out-alt"
                  push
                  size="sm"
                  v-close-popup
                  @click="logOut()"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
        <!-- <div class="roboto-font">v{{ appVersion }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>پنل مدیریت</q-item-label>
        <q-item clickable tag="a" :to="{ name: 'users-index' }">
          <q-item-section avatar>
            <q-icon name="fas fa-users-cog" />
          </q-item-section>
          <q-item-section>
            <q-item-label>مدیریت کاربران</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>داکیومنت</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AuthStore from '../store/modules/AuthStore';
import { getModule } from 'vuex-module-decorators';

@Component
export default class MasterLayout extends Vue {
  store = getModule(AuthStore);
  dark: boolean = false;
  appVersion: string = '1.0.0';
  leftDrawerOpen: boolean = false;

  toggleThemeMode() {
    this.$q.dark.toggle();
  }

  async logOut() {
    await this.store.revokeAuthentication();
    // @ts-ignore
    this.$router.go('/');
  }
}
</script>
