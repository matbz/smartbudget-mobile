<template>
  <div style="height: 100%">
    <div class="pure-g header">
      <div class="pure-u-1-3 header-cancel" @click="getThisYear()">
        <button class="button-cancel" >This Year</button>
      </div>
      <div class="pure-u-1-3 header-text">Account</div>
      <div class="pure-u-1-3 header-logout" @click="getAllDates()">
        <button class="button-logout" >All Dates</button>
      </div>
    </div>
    <div class="content2">
      <div class="pure-g add-list">
        <turnover-group
        v-for="(group, index) in turnoversByDate"
        :group = "group"
        :index = "index"
        :key="group.date"
        >
        </turnover-group>
      </div>
    </div>
    <div class="pure-g footer">
      <button class="pure-u-1-3" @click="goTo('budget')">
        <div><i class="fa fa-envelope footer-icon"></i></div>
        <div class="footer-text">Budget</div>
      </button>
      <button class="pure-u-1-3 active" @click="goTo('turnover')">
        <div><i class="fa fa-university footer-icon"></i></div>
        <div class="footer-text">Account</div>
      </button>
      <button class="pure-u-1-3" @click="goTo('turnoverAddAmount')">
        <div><i class="fa fa-plus-circle footer-icon"></i></div>
        <div class="footer-text">Transaction</div>
      </button>
      <!-- <button class="pure-u-1-4" @click="switchBudget()">
        <div><i class="fa fa-exchange footer-icon"></i></div>
        <div class="footer-text">Switch</div>
      </button> -->
      <!-- <button class="pure-u-1-4" @click="logout()">
        <div><i class="fa fa-sign-out footer-icon"></i></div>
        <div class="footer-text">Logout</div>
      </button> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { HTTP } from '@/common/utilities';
import moment from 'moment';
import TurnoverGroup from './TurnoverGroup';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default {
  components: {
    TurnoverGroup
  },
  computed: {
    ...mapGetters([
      'turnovers',
      'user',
      'budgetId',
      'budgetDate'
    ]),
    turnoversByDate() {
      const data = {};
      const returnData = [];

      this.turnovers.forEach(t => {
        if (data[t.turnover_date] === undefined) {
          data[t.turnover_date] = {
            date: t.turnover_date,
            items: []
          };
        }
        data[t.turnover_date].items.push(t);
      });

      Object.keys(data).forEach(key => {
        const item = data[key];
        returnData.push(item);
      });

      return returnData;
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
        this.$store.dispatch('getAccounts');
        this.$store.dispatch('getTurnovers');
        this.$store.dispatch('getToBeBudgeted', this.budgetDate);
        this.$store.dispatch('getBudgetList', this.budgetDate);
        this.$toasted.success('Budget switched.');
      } else {
        this.$toasted.show('No other budget found.');
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push({ name: 'login' });
      } catch (error) {
        throw new Error(error);
      }
    },
    async getThisYear() {
      const end = moment(moment(new Date()).year().toString() + '1231').toDate();
      const start = moment(moment(new Date()).year().toString() + '0101').toDate();
      await this.getTurnovers(end, start);
    },
    async getAllDates() {
      const response = await HTTP.get(`/api/${this.budgetId}/turnovers/minmaxdate`);
      const end = moment(response.data.max).toDate();
      const start = moment(response.data.min).toDate();
      await this.getTurnovers(end, start);
    },
    async getTurnovers(end, start) {
      if (!this.budgetId) {
        await this.$store.dispatch('getBudgetId', this.user);
      }

      if (end && start) {
        const dates = [
          moment(start).format('YYYYMMDD'),
          moment(end).format('YYYYMMDD'),
        ];

        this.$store.dispatch('setTurnoverDate', dates);
      }
      this.$store.dispatch('getTurnovers');
    }
  },
  created() {
    this.getTurnovers();
  }
};
</script>

