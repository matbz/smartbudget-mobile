<template>
<div>
  <div class="pure-g budget-item">
    <div class="pure-u-11-24 budget-item-name">
      {{ item.category_name }}
    </div>
    <div class="pure-u-7-24 budgeted" @click="editBudget()">
      {{ item.budgeted | currency }}
    </div>
    <div class="pure-u-6-24">
      <span class="available fr" :class="availableClass">{{ item.available | currency}}</span>
    </div>
  </div>
      <modal-edit-budget :name="modalNameEditCategory" :item="item"></modal-edit-budget>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import ModalEditBudget from './ModalEditBudget';

export default {
  components: {
    ModalEditBudget
  },
  props: [
    'item'
  ],
  computed: {
    ...mapGetters([
      'turnover',
      'budgetDate'
    ]),
    availableClass() {
      return {
        'a-positive': this.item.available > 0,
        'a-negative': this.item.available < 0,
        'a-zero': Number(this.item.available) === 0 && !this.goalNotOnTrack,
        'a-cautious': this.goalNotOnTrack
      };
    },
    modalNameEditCategory() {
      return `edit-cat-${this.item.category_id}`;
    },
    modalNameShowTransaction() {
      return `transactions-cat-${this.item.category_id}`;
    },
    goalNotOnTrack() {
      const monthsDifference = moment(this.item.goal_enddate).diff(moment(this.budgetDate).toDate(), 'month', true) + 1;
      const amountLeft = Number(this.item.goal_amount) - Number(this.item.available);
      const amountToStayOnTrack = Number((amountLeft + Number(this.item.budgeted)) / monthsDifference).toFixed(2);

      if (this.item.goal_enddate && amountToStayOnTrack && amountToStayOnTrack > 0 && amountToStayOnTrack > Number(this.item.budgeted)) {
        return true;
      }
      return false;
    }
  },
  methods: {
    editBudget() {
      this.$modal.show(this.modalNameEditCategory);
    }
  }
};
</script>
