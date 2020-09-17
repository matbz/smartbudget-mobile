<template>
  <div style="height: 100%">
    <div class="pure-g header">
      <div class="pure-u-1-3 header-cancel">
        <i class="fa fa-chevron-circle-left budget-header-icon budget-left" @click="goToLastMonth()"></i>
      </div>
      <div class="pure-u-1-3 header-text" @click="switchBudget()">
        {{ budgetDateFormatted }}
      </div>
      <div class="pure-u-1-3 header-logout">
        <span><i class="fa fa-chevron-circle-right budget-header-icon budget-right" @click="goToNextMonth()">
        </i></span>
      </div>
    </div>
    <div class="pure-g to-be-budgeted" :class="Number(toBeBudgeted) >= 0 ? 'a-positive' : 'a-negative'">
      <div class="pure-u-1-2">
        <div style="line-height: 0.85 !important">TO BE BUDGETED</div>
        <!-- <div>BUDGETED</div> -->
      </div>
      <div style="line-height: 0.5 !important" class="pure-u-1-2 to-be-budgeted-amount">{{ toBeBudgeted | currency }}</div>
    </div>
    <div class="content3">
      <div class="pure-g add-list">
        <budget-group
        v-for="(group, index) in budgetListFiltered"
        :group = "group"
        :index = "index"
        :key="group.header.categorygroup_id"
        >
        </budget-group>
      </div>
    </div>
    <div class="pure-g footer">
      <button class="pure-u-1-3 active" @click="goTo('budget')">
        <div><i class="fa fa-envelope footer-icon"></i></div>
        <div class="footer-text">Budget</div>
      </button>
      <button class="pure-u-1-3" @click="goTo('turnover')">
        <div><i class="fa fa-university footer-icon"></i></div>
        <div class="footer-text">Account</div>
      </button>
      <button class="pure-u-1-3" @click="goTo('turnoverAddAmount')">
        <div><i class="fa fa-plus-circle footer-icon"></i></div>
        <div class="footer-text">Transaction</div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { HTTP } from '@/common/utilities';
import moment from 'moment';
import BudgetGroup from './BudgetGroup';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default {
  components: {
    BudgetGroup
  },
  computed: {
    ...mapGetters([
      'budgetDate',
      'budgetList',
      'toBeBudgeted',
      'user'
    ]),
    budgetListFiltered() {
      const data = [];
      let items = [];

      this.budgetList.forEach(e => {
        if (e.header.categorygroup_is_hidden) {
          return;
        }

        items = e.items.filter(item => !item.category_is_hidden);

        data.push({
          header: e.header,
          items
        });
      });

      return data;
    },
    budgetDateFormatted() {
      return moment(this.budgetDate).format('MMM YYYY');
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
        this.$store.dispatch('getAccounts');
        this.$store.dispatch('getTurnovers');
        this.$store.dispatch('getToBeBudgeted', this.budgetDate);
        this.$store.dispatch('getBudgetList', this.budgetDate);
        // this.$toasted.success('Budget switched.');
      } else {
        this.$toasted.show('No other budget found.');
      }
    },
    goToLastMonth() {
      const date = moment(this.budgetDate).subtract(1, 'months').format('YYYYMM01');
      this.$store.dispatch('setBudgetDate', date);
      this.getBudget();
    },
    goToNextMonth() {
      const date = moment(this.budgetDate).add(1, 'months').format('YYYYMM01');
      this.$store.dispatch('setBudgetDate', date);
      this.getBudget();
    },
    async logout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push({ name: 'login' });
      } catch (error) {
        throw new Error(error);
      }
    },
    getBudget() {
      this.$store.dispatch('getBudgetList', this.budgetDate);
      this.$store.dispatch('getToBeBudgeted', this.budgetDate);
    }
  },
  created() {
    this.getBudget();
  }
};
</script>

