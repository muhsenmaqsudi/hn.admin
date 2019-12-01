<template>
  <q-page padding>
    <!-- content -->
    <q-card class="my-card">
      <q-card-section class="flex justify-between">
        <div class="text-h6">مدیریت کاربران</div>
        <!-- <div class="text-subtitle2">by John Doe</div> -->
        <q-btn
          label="افزودن کاربر"
          color="primary"
          @click="fullHeight = true"
        />
      </q-card-section>
      <div class="q-pa-md">
        <q-table
          title="Treats"
          :data="data"
          :columns="columns"
          row-key="name"
        />
      </div>
    </q-card>

    <q-dialog v-model="fullHeight" full-height>
      <q-card class="column full-height" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Full Height</div>
        </q-card-section>

        <q-card-section class="col">
          Click/Tap on the backdrop.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import UsersProps from '../../interfaces/UsersProps.interface';

@Component({
  created() {
    this.$axios
      .get('/v1/users')
      .then(res => {
        this.$data.users = res.data.data;
        console.log(this.$data.users);
      })
      .catch(error => {
        console.log(error);
      });
  }
})
export default class UsersIndex extends Vue {
  users: UsersProps | [] = [];
  fullHeight = false;
  data = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      sodium: 87,
      calcium: '14%',
      iron: '1%'
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      sodium: 129,
      calcium: '8%',
      iron: '1%'
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      sodium: 337,
      calcium: '6%',
      iron: '7%'
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      sodium: 413,
      calcium: '3%',
      iron: '8%'
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      sodium: 327,
      calcium: '7%',
      iron: '16%'
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      sodium: 50,
      calcium: '0%',
      iron: '0%'
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      sodium: 38,
      calcium: '0%',
      iron: '2%'
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      sodium: 562,
      calcium: '0%',
      iron: '45%'
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      sodium: 326,
      calcium: '2%',
      iron: '22%'
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      sodium: 54,
      calcium: '12%',
      iron: '6%'
    }
  ];

  columns = [
    {
      name: 'name',
      required: true,
      label: 'Dessert (100g serving)',
      align: 'left',
      // @ts-ignore
      field: row => row.name,
      // @ts-ignore
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'calories',
      align: 'center',
      label: 'Calories',
      field: 'calories',
      sortable: true
    },
    { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
    { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
    { name: 'protein', label: 'Protein (g)', field: 'protein' },
    { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
    {
      name: 'calcium',
      label: 'Calcium (%)',
      field: 'calcium',
      sortable: true,
      // @ts-ignore
      sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
    },
    {
      name: 'iron',
      label: 'Iron (%)',
      field: 'iron',
      sortable: true,
      // @ts-ignore
      sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
    }
  ];
}
</script>
