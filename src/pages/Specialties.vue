<template>
  <q-page padding>
    <!-- content -->
    <q-card class="my-card">
      <q-card-section class="flex justify-between">
        <div class="text-h6">{{ $t('pages.specialties.pageTitle') }}</div>
        <q-btn @click="addDialog = true" push>
          <q-icon left size="2em" name="add" />
          <div>{{ $t('pages.specialties.addBtnLabel') }}</div>
        </q-btn>
      </q-card-section>
      <div class="q-pa-md">
        <q-table
          :data="specialties"
          :columns="specialtiesColumns"
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
              :options="specialtiesColumns"
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
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="sum_consultation" :props="props">
                {{ props.row.sum_consultation }}
              </q-td>
              <q-td key="action" :props="props">
                <q-btn-group push>
                  <q-btn push color="info" icon="edit">
                    <q-tooltip transition-show="scale" transition-hide="scale">
                      <span>{{ $t('labels.tooltips.editBtn') }}</span>
                    </q-tooltip>
                  </q-btn>
                  <q-btn push color="red" icon="delete" @click="deleteConfirmDialog = true">
                    <q-tooltip transition-show="scale" transition-hide="scale">
                      <span>{{ $t('labels.tooltips.removeBtn') }}</span>
                    </q-tooltip>
                  </q-btn>
                </q-btn-group>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </q-card>

    <q-dialog v-model="addDialog" no-backdrop-dismiss ref="addDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('pages.specialties.addModalTitle') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-lg">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <div class="row">
                <q-input
                  :label="$t('forms.specialties.name')"
                  class="col q-mx-sm"
                  v-model="specialtyDTO.name"
                  filled
                  type="text"
                  ref="name"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || $t('validations.specialties.name')]"
                />
                <q-input
                  class="col q-mx-sm"
                  v-model="specialtyDTO.img"
                  filled
                  type="file"
                  :hint="$t('forms.specialties.img')"
                  ref="img"
                  lazy-rules
                  :rules="[
                    val => (val !== null && val !== '') || $t('validations.specialties.img')
                  ]"
                />
              </div>
              <div>
                <q-btn :label="$t('forms.submitBtn')" type="submit" color="primary" />
                <q-btn
                  :label="$t('forms.resetBtn')"
                  type="reset"
                  color="red"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import { SpecialtyStore } from '../store/modules';
import { SpecialtyDTO, SpecialtyProps, REQUEST_STATUS } from '../types';

@Component({
  created() {
    this.$data.store.getAll();
  }
})
export default class Specialties extends Vue {
  store = getModule(SpecialtyStore);

  grid: boolean = false;
  filter: string = '';

  addDialog: boolean = false;
  deleteConfirmDialog = false;

  visibleColumns: string[] = ['id', 'name', 'sum_consultation', 'action'];

  specialtiesColumns = [
    {
      name: 'id',
      required: true,
      label: 'شناسه',
      align: 'center',
      field: 'id',
      sortable: true,
      headerClasses: 'bg-primary text-white'
    },
    {
      name: 'name',
      align: 'center',
      label: 'نام تخصص',
      field: 'name',
      sortable: true
    },
    {
      name: 'sum_consultation',
      align: 'center',
      label: 'تعداد مشاور',
      field: 'sum_consultation',
      sortable: true
    },
    {
      name: 'action',
      align: 'center',
      label: 'عملیات'
    }
  ];

  get loading(): boolean {
    return this.store.loading;
  }

  get status(): keyof typeof REQUEST_STATUS {
    return this.store.status;
  }

  get specialties(): SpecialtyProps[] {
    return this.store.data;
  }

  get specialtyDTO() {
    return this.store.dto;
  }

  set specialtyDTO(data: SpecialtyDTO) {
    this.store.SET_DTO(data);
  }

  async onSubmit(): Promise<void> {
    await this.store.create();

    if (this.status === 'SUCCESS') {
      this.onReset();
      this.addDialog = false;
      this.store.SET_STATUS('IDLE');
    }
  }

  onReset(): void {
    this.specialtyDTO.name = '';
    this.specialtyDTO.img = '';
  }
}
</script>
