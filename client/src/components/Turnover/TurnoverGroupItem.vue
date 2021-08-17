<template>
  <button class="pure-u-1" @click="edit()">
    <span class="fl">
      {{ item.category_name || 'No Category' }}
      <span v-if="item.note" class="payee-text">{{`(${item.note}) `}}</span>
    </span>
    <span class="fr bold"
          :class="Number(item.amount) >= 0 ? '' : 'negative'"
    >
      {{ item.amount | currency }}
    </span>
  </button>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: [
    'item'
  ],
  computed: {
    ...mapGetters([
      'turnover'
    ])
  },
  methods: {
    edit() {
      const dateParts = this.item.turnover_date.split('.');

      const turnover = {
        id: this.item.id,
        accountId: this.item.account_id,
        accountName: this.item.account_name,
        amount: this.item.amount,
        turnoverDate: new Date(dateParts[2], dateParts[1] - 1, dateParts[0]),
        payee: this.item.payee,
        categoryId: this.item.category_id,
        categoryName: this.item.category_name,
        note: this.item.note,
        source: this.item.source
      };

      this.$store.dispatch('setTurnover', turnover);
      this.$router.push({ name: 'turnoverAdd' });
    }
  }
};
</script>
