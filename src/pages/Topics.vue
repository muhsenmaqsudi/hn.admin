<template>
  <q-page padding>
    <!-- content -->
    <q-card class="my-card">
      <q-card-section class="flex justify-between">
        <div class="text-h6">{{ $t('pages.topics.pageTitle') }}</div>
      </q-card-section>
      <div class="q-pa-md">
        <q-table
          :data="topics"
          :columns="topicsColumns"
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
              :options="topicsColumns"
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
              <q-td key="author" :props="props">
                {{ `${props.row.author.data.firstName} ${props.row.author.data.lastName}` }}
              </q-td>
              <q-td key="type" :props="props">
                {{ $t(`labels.enums.${props.row.topicCategory.data.type}`) }}
              </q-td>
              <q-td key="category" :props="props">
                {{ props.row.topicCategory.data.title }}
              </q-td>
              <q-td key="body" :props="props">
                <q-btn icon="far fa-file-alt" color="info" @click="icon = true" />
                <q-dialog v-model="icon">
                  <q-card>
                    <q-card-section class="row items-center">
                      <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
                    <q-card-section>
                      {{ props.row.body }}
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </q-td>
              <q-td key="age" :props="props">{{ props.row.age_id }}</q-td>
              <q-td key="gender" :props="props">{{ $t(`labels.enums.${props.row.gender}`) }}</q-td>
              <q-td key="status" :props="props">{{ $t(`labels.enums.${props.row.status}`) }}</q-td>
              <q-td key="created_at" :props="props">
                {{ props.row.created_at.date | jalaalianNameDate }}
              </q-td>
              <q-td key="action" :props="props">
                <q-btn-group push>
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
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import { SpecialtyStore, TopicStore } from '../store/modules';
import { SpecialtyDTO, SpecialtyProps, REQUEST_STATUS, TopicProps } from '../types';

@Component({
  created() {
    this.$data.store.getAll();
  }
})
export default class Topics extends Vue {
  store = getModule(TopicStore);

  icon: boolean = false;

  grid: boolean = false;
  filter: string = '';

  deleteConfirmDialog = false;

  visibleColumns: string[] = [
    'id',
    'author',
    'type',
    'category',
    'body',
    'age',
    'gender',
    'status',
    'created_at',
    'action'
  ];

  topicsColumns = [
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
      name: 'author',
      align: 'center',
      label: 'نام نویسنده',
      sortable: true
    },
    {
      name: 'type',
      align: 'center',
      label: 'نوع مطالب',
      sortable: true
    },
    {
      name: 'category',
      align: 'center',
      label: 'دسته بندی',
      sortable: true
    },
    {
      name: 'body',
      align: 'center',
      label: 'مشاهده محتوا',
      field: 'body',
      sortable: true
    },
    {
      name: 'age',
      align: 'center',
      label: 'رده سنی',
      sortable: true
    },
    {
      name: 'gender',
      align: 'center',
      label: 'جنسیت',
      field: 'gender',
      sortable: true
    },
    {
      name: 'status',
      align: 'center',
      label: 'وضعیت نمایش',
      field: 'status',
      sortable: true
    },
    {
      name: 'created_at',
      align: 'center',
      label: 'تاریخ درج',
      field: 'created_at',
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

  get topics(): TopicProps[] {
    return this.store.data;
  }
}
</script>
