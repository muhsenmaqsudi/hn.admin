import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.DEV === 'false'
});

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// export default function(/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     modules: {
//       auth
//     },

//     // enable strict mode (adds overhead!)
//     // for dev mode only
//     // strict: process.env.DEV
//     strict: false
//   });

//   return Store;
// }
