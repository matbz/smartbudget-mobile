<template>
  <div style="height: 100%">
    <div class="pure-g header">
      <div class="pure-u-1-3 header-cancel" @click="goTo('turnoverAdd')">
        <button class="button-cancel" >
          <i class="fa fa-chevron-left"></i>
          Turnover
        </button>
      </div>
      <div class="pure-u-1-3 header-text">
        Category
      </div>
      <div class="pure-u-1-3"></div>
    </div>
    <div class="content">
      <div class="pure-g add-list">
        <turnover-add-category-group
        v-for="group in budgetListAdded"
        :group = "group"
        :key="group.header.categorygroup_id"
        >
        </turnover-add-category-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TurnoverAddCategoryGroup from './TurnoverAddCategoryGroup';

export default {
  components: {
    TurnoverAddCategoryGroup
  },
  computed: {
    ...mapGetters([
      'budgetList',
      'categories',
      'toBeBudgeted'
    ]),
    budgetListAdded() {
      const data = [...this.budgetList];
      const toBeBudgetedItem = this.categories.filter(e => e.name === 'To be Budgeted');

      data.unshift({
        header: {
          categorygroup_name: 'Inflow'
        },
        items: [{
          category_id: toBeBudgetedItem[0].id,
          category_name: toBeBudgetedItem[0].name,
          available: this.toBeBudgeted
        }]
      });

      return data;
    }
  },
  methods: {
    goTo(routeName) {
      this.$router.push({ name: routeName });
    }
  }
};
</script>
