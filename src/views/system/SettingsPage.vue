<!-- TEMPLATE BEGIN -->
<template>
  <div class="settings-page">
    <b-container class="content">
      <b-row>
        <b-col>
          <h1 class="page-title">Настройки</h1>
        </b-col>
      </b-row>
      <br>

      <b-row>
        <b-col>
          <b-form @submit.prevent="onSubmitEvent">
            <b-form-group horizontal label="Тема интерфейса:" abel-for="theme-input" class="noselect">
              <b-form-radio-group id="theme-input" v-model="theme" class="pt-2" :options="themes" />
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<!-- TEMPLATE END -->


<!-- SCRIPT BEGIN -->
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

import {
  PROFILE_SETTINGS_THEME_SET,
  PROFILE_SETTINGS_THEME_GET
} from '@/modules/profile';

@Component
export default class SettingsPage extends Vue {
  set theme(themeName: string) {
    this.$store.commit(PROFILE_SETTINGS_THEME_SET, themeName);
  }

  get theme(): string {
    return this.$store.getters[PROFILE_SETTINGS_THEME_GET];
  }

  get themes() {
    return {
      light: 'Светлая',
      dark: 'Тёмная'
    };
  }
}

export const settingsPageRoute: RouteConfig = {
  path: '/settings',
  name: 'Settings',
  component: SettingsPage
};
</script>
<!-- SCRIPT END -->


<!-- STYLE BEGIN -->
<style lang="scss">
</style>
<!-- STYLE END -->