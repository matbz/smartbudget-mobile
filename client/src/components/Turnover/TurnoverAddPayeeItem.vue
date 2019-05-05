<template>
  <button class="pure-u-1" @click="select()">
    <span class="fl">{{ item.payee }}</span>
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
      turnover.payee = this.item.payee;
      this.$store.dispatch('setTurnover', turnover);
      this.$router.push({ name: 'turnoverAdd' });
    }
  }
};
</script>
