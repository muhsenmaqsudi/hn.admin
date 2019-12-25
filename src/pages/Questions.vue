<template>
  <q-page padding>
    <!-- content -->
    <q-card class="my-card">
      <q-card-section class="flex justify-between">
        <div class="text-h6">{{ $t('pages.questions.pageTitle') }}</div>
        <q-btn @click="addDialog = true" push>
          <q-icon left size="2em" name="add" />
          <div>{{ $t('pages.questions.addBtnLabel') }}</div>
        </q-btn>
      </q-card-section>
      <div class="q-pa-md">
        <q-table
          :data="questions"
          :columns="categoryColumns"
          row-key="id"
          :filter="filter"
          :visible-columns="visibleColumns"
          :loading="loading"
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
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-show="!$q.screen.xs"
            />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">{{ props.row.id }}</q-td>
              <q-td key="title" :props="props">
                {{ props.row.title }}
              </q-td>
              <q-td key="action" :props="props">
                <q-btn-group push>
                  <q-btn
                    push
                    color="primary"
                    :icon="!props.expand ? 'visibility' : 'visibility_off'"
                    @click="
                      props.expand = !props.expand;
                      onQReset();
                    "
                  >
                    <q-tooltip transition-show="scale" transition-hide="scale">
                      <span v-show="!props.expand">نمایش اطلاعات بیشتر</span>
                      <span v-show="props.expand">پنهان کردن</span>
                    </q-tooltip>
                  </q-btn>
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
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <q-item-label header>سوالات</q-item-label>
                <q-scroll-area
                  :bar-style="barStyle"
                  :style="scrollAreaStyle(props.row.questions.data.length)"
                >
                  <q-list
                    v-for="(question, index) in props.row.questions.data"
                    :key="index"
                    bordered
                    class="rounded-borders"
                  >
                    <q-item>
                      <q-item-section top>
                        <q-item-label>
                          <span class="text-weight-medium">نسبت های فامیلی: </span>
                          <span
                            class="text-grey-8"
                            v-for="(rel, index) in question.rel"
                            :key="index"
                          >
                            {{ $t(`labels.enums.familyRelations[${rel}]`) }}
                          </span>
                        </q-item-label>
                        <q-item-label caption>{{ question.name_fa }}</q-item-label>
                      </q-item-section>
                      <q-item-section top side>
                        <div class="text-grey-8 q-gutter-xs">
                          <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                          <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
                          <q-btn size="12px" flat dense round icon="more_vert" />
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                  </q-list>
                </q-scroll-area>

                <q-form @submit="onQSubmit(props.row.id)" class="q-gutter-xl q-my-md">
                  <div class="row">
                    <q-input
                      class="col-10 q-mx-auto"
                      rounded
                      outlined
                      v-model="questionDTO.name_fa"
                      label="عنوان سوال جدید"
                    >
                      <template v-slot:prepend>
                        <q-icon name="fas fa-question" />
                      </template>
                      <template v-slot:append>
                        <q-icon
                          name="close"
                          @click="questionDTO.name_fa = ''"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-input>
                  </div>
                  <div class="row justify-between q-px-xl">
                    <q-checkbox
                      v-model="familyRelations"
                      color="primary"
                      label="آیا این سوال نسبت فامیلی دارد؟"
                      left-label
                    />
                    <q-btn :label="$t('forms.submitBtn')" type="submit" color="primary" />
                  </div>
                  <div class="row">
                    <q-option-group
                      v-show="familyRelations"
                      v-model="questionDTO.rel"
                      :options="familyRelationOptions"
                      color="primary"
                      type="toggle"
                      left-label
                      inline
                      class="q-mx-auto"
                    />
                  </div>
                </q-form>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </q-card>

    <q-dialog v-model="addDialog" no-backdrop-dismiss ref="addDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('pages.questions.addModalTitle') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-lg">
            <q-form @submit="onQCSubmit" @reset="onQCReset" class="q-gutter-md">
              <div class="row">
                <q-input
                  :label="$t('forms.categories.title')"
                  class="col q-mx-sm"
                  v-model="questionCategoryDTO.title"
                  filled
                  type="text"
                  ref="name"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || $t('validations.categories.title')]"
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
import { QuestionStore } from '../store/modules';
import { REQUEST_STATUS, FAMILY_RELATIONS, QuestionCategoryDTO, QuestionDTO } from '../types';

@Component({
  created() {
    this.$data.store.getAll();
  }
})
export default class Questions extends Vue {
  store = getModule(QuestionStore);

  filter: string = '';

  addDialog: boolean = false;
  deleteConfirmDialog: boolean = false;
  familyRelations: boolean = false;

  visibleColumns: string[] = ['id', 'title', 'action'];

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
      name: 'title',
      align: 'center',
      label: 'عنوان گروه سوالی',
      field: 'title',
      sortable: true
    },
    {
      name: 'action',
      align: 'center',
      label: 'عملیات'
    }
  ];

  familyRelationOptions = [
    {
      label: 'خودم',
      value: FAMILY_RELATIONS.SELF
    },
    {
      label: 'پدر',
      value: FAMILY_RELATIONS.FATHER
    },
    {
      label: 'مادر',
      value: FAMILY_RELATIONS.MOTHER
    },
    {
      label: 'خواهر',
      value: FAMILY_RELATIONS.SISTER
    },
    {
      label: 'برادر',
      value: FAMILY_RELATIONS.BROTHER
    },
    {
      label: 'عمو/دایی',
      value: FAMILY_RELATIONS.UNCLE
    },
    {
      label: 'عمه/خاله',
      value: FAMILY_RELATIONS.AUNT
    },
    {
      label: 'پدر بزرگ',
      value: FAMILY_RELATIONS.GRANDFATHER
    },
    {
      label: 'مادر بزرگ',
      value: FAMILY_RELATIONS.GRANDMOTHER
    }
  ];

  scrollAreaStyle(length: number) {
    if (length) {
      return 'height: 200px';
    }
  }

  barStyle = {
    right: '2px',
    borderRadius: '9px',
    backgroundColor: '#027be3',
    width: '9px',
    opacity: 0.2
  };

  get loading(): boolean {
    return this.store.loading;
  }

  get status(): keyof typeof REQUEST_STATUS {
    return this.store.status;
  }

  get questions() {
    return this.store.data;
  }

  get questionCategoryDTO() {
    return this.store.dto;
  }

  set questionCategoryDTO(data: QuestionCategoryDTO) {
    this.store.SET_DTO(data);
  }

  questionDTO: QuestionDTO = {
    name_fa: '',
    category_id: '',
    rel: []
  };

  async onQCSubmit(): Promise<void> {
    await this.store.create();
    if (this.status === 'SUCCESS') {
      this.onQCReset();
      this.addDialog = false;
      this.store.SET_STATUS('IDLE');
    }
  }

  onQCReset(): void {
    this.questionCategoryDTO.title = '';
  }

  async onQSubmit(categoryId: number): Promise<void> {
    this.questionDTO.category_id = categoryId;
    await this.$axios
      .post('/v1/specialities/question', this.questionDTO)
      .then(res => {
        this.store.SET_STATUS('SUCCESS');
        this.store.PUSH_NEW_QUESTION_TO_DATA(res.data.data);
        this.onQReset();
      })
      .catch(error => {
        this.store.SET_STATUS('FAILED');
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'error',
          message: error.message
        });
      });
  }

  onQReset(): void {
    this.questionDTO.name_fa = '';
    this.questionDTO.category_id = '';
    this.questionDTO.rel = [];
  }
}
</script>
