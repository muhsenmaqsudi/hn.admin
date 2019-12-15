<template>
  <q-page padding>
    <!-- content -->
    <q-card class="my-card">
      <q-card-section class="flex justify-between">
        <div class="text-h6">{{ $t('pages.categories.pageTitle') }}</div>
        <q-btn @click="addDialog = true" push>
          <q-icon left size="2em" name="add" />
          <div>{{ $t('pages.categories.addBtnLabel') }}</div>
        </q-btn>
      </q-card-section>
      <div class="q-pa-md">
        <q-table
          :data="categories"
          :columns="categoryColumns"
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
              :options="categoryColumns"
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
              <q-td key="type" :props="props">
                <p>{{ $t(`labels.enums.${props.row.type}`) }}</p>
              </q-td>
              <q-td key="title" :props="props">
                {{ props.row.title }}
              </q-td>
              <q-td key="action" :props="props">
                <q-btn-group push>
                  <q-btn push color="info" icon="edit">
                    <q-tooltip transition-show="scale" transition-hide="scale">
                      <span>{{ $t('labels.tooltips.editBtn') }}</span>
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    push
                    color="red"
                    icon="delete"
                    @click="deleteConfirmDialog = true"
                  >
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
          <div class="text-h6">{{ $t('pages.categories.addModalTitle') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-lg">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <div class="row">
                <q-input
                  :label="$t('forms.categories.title')"
                  class="col q-mx-sm"
                  v-model="categoryDTO.title"
                  filled
                  type="text"
                  ref="name"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || $t('validations.categories.title')
                  ]"
                />
                <label>{{ $t('forms.categories.type') }}</label>
                <q-option-group
                  v-model="categoryDTO.type"
                  :options="categoryType"
                  color="primary"
                  inline
                  dense
                  left-label
                  class="col q-mx-sm q-mt-md"
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
import { CategoryStore } from '../store/modules';
import { REQUEST_STATUS, CategoryProps, CategoryDTO, CATEGORY_TYPE } from '../types';

@Component({
  created() {
    this.$data.store.getAll();
  }
})
export default class Categories extends Vue {
  store = getModule(CategoryStore);

  grid: boolean = false;
  filter: string = '';

  addDialog: boolean = false;
  deleteConfirmDialog = false;

  visibleColumns: string[] = ['id', 'type', 'title', 'action'];

  categoryColumns = [
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
      name: 'type',
      align: 'center',
      label: 'نوع',
      field: 'type',
      sortable: true
    },
    {
      name: 'title',
      align: 'center',
      label: 'عنوان',
      field: 'title',
      sortable: true
    },
    {
      name: 'action',
      align: 'center',
      label: 'عملیات'
    }
  ];

  categoryType = [
    {
      label: 'مقاله',
      value: CATEGORY_TYPE.ARTICLE
    },
    {
      label: 'اخبار',
      value: CATEGORY_TYPE.NEWS
    },
    {
      label: 'کتاب',
      value: CATEGORY_TYPE.BOOK
    }
  ];

  get loading(): boolean {
    return this.store.loading;
  }

  get status(): keyof typeof REQUEST_STATUS {
    return this.store.status;
  }

  get categories() {
    return this.store.data;
  }

  get categoryDTO() {
    return this.store.dto;
  }

  set categoryDTO(data: CategoryDTO) {
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
    this.categoryDTO.title = '';
    this.categoryDTO.type = CATEGORY_TYPE.ARTICLE;
  }
}
</script>
