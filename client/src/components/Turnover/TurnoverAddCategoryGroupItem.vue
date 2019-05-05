<template>
  <button class="pure-u-1" @click="select()">
    <span class="fl">{{ item.category_name }}</span>
    <span class="fr bold"
          :class="Number(item.available) >= 0 ? 'positive' : 'negative'"
    >
      {{ item.available | currency }}
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
      turnover.categoryId = this.item.category_id;
      turnover.categoryName = this.item.category_name;
      this.$store.dispatch('setTurnover', turnover);
      this.$router.push({ name: 'turnoverAdd' });
    }
  }
};
</script>
