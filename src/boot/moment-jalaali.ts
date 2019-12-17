import Vue from 'vue';
import * as moment from 'moment-jalaali';

moment.loadPersian({
  dialect: 'persian-modern',
  usePersianDigits: true
});

Vue.filter('jalaalianNameDate', (gregorian: Date) => {
  return moment(gregorian).format('jDo jMMMM jYYYY');
});

Vue.filter('jalaalianDate', (gregorian: Date) => {
  return moment(gregorian).format('jYYYY/jMM/jDD');
});

Vue.filter('agoDate', (gregorian: Date) => {
  return moment(gregorian)
    .startOf('minutes')
    .fromNow();
});
