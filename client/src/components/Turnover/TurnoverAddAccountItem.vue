<template>
  <button class="pure-u-1" @click="select()">
    <span class="fl">{{ item.name }}</span>
    <span class="fr bold"
          :class="Number(item.balance) >= 0 ? 'positive' : 'negative'"
    >
      {{ item.balance | currency }}
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
    select() {
      const turnover = this.turnover;
      turnover.accountId = this.item.id;
      turnover.accountName = this.item.name;
      this.$store.dispatch('setTurnover', turnover);
      this.$router.push({ name: 'turnoverAdd' });
    }
  }
};
</script>
