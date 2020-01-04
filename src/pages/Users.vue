<template>
  <q-page padding>
    <q-card>
      <q-tabs v-model="tab" dense class="bg-grey-3" align="justify" narrow-indicator>
        <q-tab name="doctors" label="مشاوران و پزشکان" />
        <q-tab name="authors" label="نویسندگان" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="doctors" class="q-pt-none">
          <q-card-section class="flex justify-between q-px-none">
            <div class="text-h6">{{ $t('pages.users.doctors.tabTitle') }}</div>
            <q-btn @click="addDialog = true" push>
              <q-icon left size="2em" name="add" />
              <div>{{ $t('pages.users.doctors.addBtnLabel') }}</div>
            </q-btn>
          </q-card-section>
          <div class="q-pt-md">
            <q-table
              :data="doctors"
              :columns="usersColumns"
              row-key="id"
              :filter="filter"
              :visible-columns="visibleColumns"
              :loading="loading"
              :grid="grid || $q.screen.xs"
              :card-class="{ 'bg-primary text-white': grid }"
              color="gray-8"
            >
              <template v-slot:top="props">
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  :placeholder="$t('labels.search')"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-space />
                <q-select
                  v-model="visibleColumns"
                  multiple
                  borderless
                  dense
                  options-dense
                  :display-value="$q.lang.table.columns"
                  emit-value
                  map-options
                  :options="usersColumns"
                  option-value="name"
                  style="min-width: 150px"
                />
                <q-btn
                  push
                  round
                  class="q-mx-sm"
                  color="white"
                  text-color="black"
                  :icon="grid ? 'grid_off' : 'grid_on'"
                  @click="grid = !grid"
                  v-show="!$q.screen.xs"
                  :disable="props.inFullscreen"
                />
                <q-btn
                  flat
                  round
                  dense
                  :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="props.toggleFullscreen"
                  v-show="!$q.screen.xs"
                  :disable="grid"
                />
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                  <q-td key="fullname" :props="props">
                    {{
                      props.row.profile.data.length
                        ? `${props.row.profile.data[0].firstName} ${props.row.profile.data[0].lastName}`
                        : ''
                    }}
                  </q-td>
                  <q-td key="email" :props="props">
                    {{ props.row.email }}
                  </q-td>
                  <q-td key="mobile" :props="props">
                    <q-badge color="light-blue-6">{{ props.row.mobile.replace(/\S/, '') }}</q-badge>
                  </q-td>
                  <q-td key="action" :props="props">
                    <q-btn-group push>
                      <q-btn
                        push
                        color="primary"
                        :icon="!props.expand ? 'visibility' : 'visibility_off'"
                        @click="props.expand = !props.expand"
                      >
                        <q-tooltip transition-show="scale" transition-hide="scale">
                          <span v-show="!props.expand">نمایش اطلاعات بیشتر</span>
                          <span v-show="props.expand">پنهان کردن</span>
                        </q-tooltip>
                      </q-btn>
                      <q-btn push color="info" icon="edit">
                        <q-tooltip transition-show="scale" transition-hide="scale">
                          <span>ویرایش</span>
                        </q-tooltip>
                      </q-btn>
                      <q-btn push color="red" icon="delete" @click="deleteConfirmDialog = true">
                        <q-tooltip transition-show="scale" transition-hide="scale">
                          <span>حذف</span>
                        </q-tooltip>
                      </q-btn>
                    </q-btn-group>
                  </q-td>
                </q-tr>
                <q-tr v-show="props.expand" :props="props">
                  <q-td colspan="100%">
                    <div class="text-left">
                      <q-table
                        :data="props.row.profile.data"
                        :columns="profileColumns"
                        row-key="id"
                        hide-bottom
                        grid
                        hide-header
                      />
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-tab-panel>

        <q-tab-panel name="authors" class="q-pt-none">
          <q-card-section class="flex justify-between q-px-none">
            <div class="text-h6">{{ $t('pages.users.authors.tabTitle') }}</div>
            <q-btn @click="addDialog = true" push>
              <q-icon left size="2em" name="add" />
              <div>{{ $t('pages.users.authors.addBtnLabel') }}</div>
            </q-btn>
          </q-card-section>
          <div class="q-pt-md">
            <q-table
              :data="authors"
              :columns="usersColumns"
              row-key="id"
              :filter="filter"
              :visible-columns="visibleColumns"
              :loading="loading"
              :grid="grid || $q.screen.xs"
              :card-class="{ 'bg-primary text-white': grid }"
              color="gray-8"
            >
              <template v-slot:top="props">
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  :placeholder="$t('labels.search')"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-space />
                <q-select
                  v-model="visibleColumns"
                  multiple
                  borderless
                  dense
                  options-dense
                  :display-value="$q.lang.table.columns"
                  emit-value
                  map-options
                  :options="usersColumns"
                  option-value="name"
                  style="min-width: 150px"
                />
                <q-btn
                  push
                  round
                  class="q-mx-sm"
                  color="white"
                  text-color="black"
                  :icon="grid ? 'grid_off' : 'grid_on'"
                  @click="grid = !grid"
                  v-show="!$q.screen.xs"
                  :disable="props.inFullscreen"
                />
                <q-btn
                  flat
                  round
                  dense
                  :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="props.toggleFullscreen"
                  v-show="!$q.screen.xs"
                  :disable="grid"
                />
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                  <q-td key="fullname" :props="props">
                    {{
                      props.row.profile.data.length
                        ? `${props.row.profile.data[0].firstName} ${props.row.profile.data[0].lastName}`
                        : ''
                    }}
                  </q-td>
                  <q-td key="email" :props="props">
                    {{ props.row.email }}
                  </q-td>
                  <q-td key="mobile" :props="props">
                    <q-badge color="light-blue-6">{{ props.row.mobile.replace(/\S/, '') }}</q-badge>
                  </q-td>
                  <q-td key="action" :props="props">
                    <q-btn-group push>
                      <q-btn
                        push
                        color="primary"
                        :icon="!props.expand ? 'visibility' : 'visibility_off'"
                        @click="props.expand = !props.expand"
                      >
                        <q-tooltip transition-show="scale" transition-hide="scale">
                          <span v-show="!props.expand">نمایش اطلاعات بیشتر</span>
                          <span v-show="props.expand">پنهان کردن</span>
                        </q-tooltip>
                      </q-btn>
                      <q-btn push color="info" icon="edit">
                        <q-tooltip transition-show="scale" transition-hide="scale">
                          <span>ویرایش</span>
                        </q-tooltip>
                      </q-btn>
                      <q-btn push color="red" icon="delete" @click="deleteConfirmDialog = true">
                        <q-tooltip transition-show="scale" transition-hide="scale">
                          <span>حذف</span>
                        </q-tooltip>
                      </q-btn>
                    </q-btn-group>
                  </q-td>
                </q-tr>
                <q-tr v-show="props.expand" :props="props">
                  <q-td colspan="100%">
                    <div class="text-left">
                      <q-table
                        :data="props.row.profile.data"
                        :columns="profileColumns"
                        row-key="id"
                        hide-bottom
                        grid
                        hide-header
                      />
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <!-- <q-dialog v-model="addDialog" no-backdrop-dismiss>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">افزودن کاربر جدید</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-lg">
            <div class="row">
              <q-input
                dir="ltr"
                class="col q-mx-sm"
                v-model="email"
                filled
                type="email"
                hint="Email"
              />
              <q-input
                v-model="tel"
                class="col q-mx-sm"
                filled
                type="tel"
                hint="Telephone number"
              />
            </div>
            <div class="row">
              <q-input
                class="col q-mx-sm"
                v-model="email"
                filled
                type="email"
                hint="Email"
              />
              <q-input
                v-model="tel"
                class="col q-mx-sm"
                filled
                type="tel"
                hint="Telephone number"
              />
            </div>
            <div class="row">
              <q-input
                class="col q-ma-sm"
                v-model="email"
                filled
                type="email"
                hint="Email"
                label="ایمیل"
              />
              <q-input
                v-model="tel"
                class="col q-ma-sm"
                filled
                type="tel"
                hint="Telephone number"
              />
            </div>

            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
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

              <q-toggle
                v-model="accept"
                label="I accept the license and terms"
              />

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
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteConfirmDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >You are currently not connected to any network.</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import { DoctorStore, AuthorStore } from '../store/modules';
import { UserProps, REQUEST_STATUS } from '../types';
import { i18n } from '../boot/i18n';

@Component
export default class Users extends Vue {
  doctorStore = getModule(DoctorStore);
  authorStore = getModule(AuthorStore);

  grid: boolean = false;
  filter: string = '';
  tab: string = 'doctors';
  addDialog: boolean = false;
  deleteConfirmDialog = false;

  visibleColumns: string[] = ['id', 'fullname', 'email', 'mobile', 'action'];

  usersColumns = [
    {
      name: 'id',
      required: true,
      label: 'شناسه',
      align: 'center',
      // @ts-ignore
      // field: 'id',
      field: row => row.id,
      // @ts-ignore
      format: val => `${val}`,
      sortable: true,
      // sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      // classes: 'bg-grey-2 ellipsis',
      headerClasses: 'bg-primary text-white'
    },
    {
      name: 'fullname',
      align: 'center',
      label: 'نام',
      // eslint-disable-next-line
      field: (row: any) => row.profile,
      // eslint-disable-next-line
      format: (val: any) =>
        val.data.length ? `${val.data[0].firstName} ${val.data[0].lastName}` : '',
      sortable: true
    },
    {
      name: 'email',
      align: 'center',
      label: 'ایمیل',
      field: 'email',
      sortable: true
    },
    {
      name: 'mobile',
      align: 'center',
      label: 'شماره همراه',
      field: 'mobile',
      format: (val: string) => val.replace(/\S/, ''),
      sortable: true
    },
    {
      name: 'action',
      align: 'center',
      label: 'عملیات'
    }
  ];

  profileColumns = [
    {
      name: 'id',
      align: 'center',
      label: '#',
      field: 'id'
    },
    {
      name: 'address',
      align: 'center',
      label: 'آدرس',
      field: 'address'
    },
    {
      name: 'brithdate',
      align: 'center',
      label: 'تاریخ تولد',
      field: 'brithdate'
    },
    {
      name: 'license_number',
      align: 'center',
      label: 'شماره پرونده',
      field: 'license_number'
    },
    {
      name: 'license_title',
      align: 'center',
      label: 'عنوان پرونده',
      field: 'license_title'
    },
    {
      name: 'state',
      align: 'center',
      label: 'وضعیت کاربر',
      field: 'state',
      format: (val: string) => i18n.t(`labels.enums.${val}`)
    },
    {
      name: 'tell',
      align: 'center',
      label: 'شماره ثابت',
      field: 'tell'
    },
    {
      name: 'type',
      align: 'center',
      label: 'نوع کاربری',
      field: 'type',
      format: (val: string) => i18n.t(`labels.enums.${val}`)
    }
  ];

  get loading(): boolean {
    return this.doctorStore.loading;
  }

  get status(): keyof typeof REQUEST_STATUS {
    return this.doctorStore.status;
  }

  get doctors(): UserProps[] {
    return this.doctorStore.data;
  }

  get authors(): UserProps[] {
    return this.authorStore.data;
  }

  created() {
    this.doctorStore.getAll();
    this.authorStore.getAll();
  }
}
</script>
