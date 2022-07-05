<template>
  <div style="height: 100%">
    <div class="pure-g header">
      <div class="pure-u-1-3 header-cancel" @click="goTo('turnoverAdd')">
        <button class="button-cancel" >
          <i class="fa fa-chevron-left"></i>
          Transaction
        </button>
      </div>
      <div class="pure-u-1-3 header-text">
        Category
      </div>
      <div class="pure-u-1-3 header-logout">
        <button class="button-logout" @click="switchBudget()">Switch</button>
      </div>
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
import { HTTP } from '@/common/utilities';
import { mapGetters } from 'vuex';
import TurnoverAddCategoryGroup from './TurnoverAddCategoryGroup';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default {
  components: {
    TurnoverAddCategoryGroup
  },
  computed: {
    ...mapGetters([
      'budgetList',
      'categories',
      'toBeBudgeted',
      'budgetDate',
      'user'
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

      for (let index = 0; index < data.length; index++) {
        if (index > 0) {
          data[index].items = data[index].items.filter(c => !c.category_is_hidden);
        }
      }

      return data;
    }
  },
  methods: {
    goTo(routeName) {
      this.$router.push({ name: routeName });
    },
    async switchBudget() {
      const response = await HTTP.get(`/api/budgets?userid=${this.user.id}`);
      if (response.data.length === 2) {
        await asyncForEach(response.data, async (o) => {
          await HTTP.put(`/api/budgets/${o.id}`, {
            active: !o.active
          });
        });

        await this.$store.dispatch('getBudgetId', this.$store.getters.user);
        this.$store.dispatch('getBudgetName', this.$store.getters.user);
        await this.$store.dispatch('getAccounts');
        this.$store.dispatch('getTurnovers');
        this.$store.dispatch('getToBeBudgeted', this.budgetDate);
        this.$store.dispatch('getBudgetList', this.budgetDate);
        // this.$toasted.success('Budget switched.');
      } else {
        this.$toasted.show('No other budget found.');
      }
    }
  }
};
</script>
