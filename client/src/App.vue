<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  components: {
    //
  },
  computed: {
    ...mapGetters([
      'user',
      'budgetId',
      'budgetDate'
    ]),
  },
  async created() {
    if (this.user) {
      await this.$store.dispatch('getBudgetId', this.user);
      this.$store.dispatch('getAccounts');
      this.$store.dispatch('getBudgetList', this.budgetDate);
      this.$store.dispatch('getToBeBudgeted', this.budgetDate);
      this.$store.dispatch('getPayees');
      this.$store.dispatch('getCategories');
    }
  }
};
</script>
