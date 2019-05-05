<template>
  <div style="width: 100%; height: 100%">
    <div v-if="index !== 0" class="divider"></div>
    <div class="turnover-group">{{ dateFormatted }}</div>
    <turnover-group-item
    v-for="item in group.items"
    :item = "item"
    :key="item.id"
    >
    </turnover-group-item>
  </div>
</template>

<script>
import moment from 'moment';
import TurnoverGroupItem from './TurnoverGroupItem';


export default {
  components: {
    TurnoverGroupItem
  },
  props: [
    'group',
    'index'
  ],
  computed: {
    dateFormatted() {
      const dateParts = this.group.date.split('.');
      return moment(new Date(dateParts[2], dateParts[1] - 1, dateParts[0])).format('MMMM DD, YYYY');
    }
  }
};
</script>
