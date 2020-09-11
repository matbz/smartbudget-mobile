<template>
  <div style="height: 100%">
    <div class="pure-g header">
      <div class="pure-u-1-3 header-cancel" @click="cancel()">
        <button class="button-cancel" >Cancel</button>
      </div>
      <div class="pure-u-1-3 header-text">
        Add Transaction<br/>(Budget: {{ budgetId }})
      </div>
      <div class="pure-u-1-3 header-logout">
        <button v-if="!aTurnover.id" class="button-logout" @click="switchBudget()">Switch</button>
      </div>
    </div>
    <div class="content">
      <div class="pure-g amount-display">
        <div class="pure-u-1 amount-text">
          <span :class="expense ? 'negative' : 'positive'">{{ aTurnover.amount | currency}}</span>
        </div>
      </div>
      <div class="pure-g expense-income">
        <button class="pure-u-1-2 button-expense" @click="setExpense()">
          Expense
        </button>
        <button class="pure-u-1-2 button-income" @click="setIncome()">
          Income
        </button>
      </div>
      <div class="pure-g number-pad">
        <div class="pure-u-3-4" style="height: 100%">
          <div class="pure-g">
            <button class="pure-u-1-3 amount-number nbt" @click="addNumber(1)">1</button>
            <button class="pure-u-1-3 amount-number nbt" @click="addNumber(2)">2</button>
            <button class="pure-u-1-3 amount-number nbr nbt" @click="addNumber(3)">3</button>
          </div>
          <div class="pure-g">
            <button class="pure-u-1-3 amount-number" @click="addNumber(4)">4</button>
            <button class="pure-u-1-3 amount-number" @click="addNumber(5)">5</button>
            <button class="pure-u-1-3 amount-number nbr" @click="addNumber(6)">6</button>
          </div>
          <div class="pure-g">
            <button class="pure-u-1-3 amount-number" @click="addNumber(7)">7</button>
            <button class="pure-u-1-3 amount-number" @click="addNumber(8)">8</button>
            <button class="pure-u-1-3 amount-number nbr" @click="addNumber(9)">9</button>
          </div>
          <div class="pure-g">
            <button class="pure-u-1 amount-number amount-number-zero nbr" @click="addNumber(0)">0</button>
          </div>
        </div>
        <div class="pure-u-1-4 amount-actions">
          <button class="pure-u-1 amount-remove" @click="removeNumber()">
            <i class="fa fa-caret-square-o-left"></i>
          </button>
          <button class="pure-u-1 amount-next" @click="next()">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { HTTP } from '@/common/utilities';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default {
  data() {
    return {
      expense: true,
      strAmount: '',
      aTurnover: {
        amount: 0
      }
    };
  },
  computed: {
    ...mapGetters([
      'turnover',
      'budgetId',
      'budgetDate',
      'budgetList',
      'toBeBudgeted',
      'user'
    ])
  },
  watch: {
    strAmount: function () {
      this.aTurnover.amount = parseInt(this.strAmount).toFixed(2);
      this.aTurnover.amount /= 100;

      if (this.expense && this.aTurnover.amount > 0) {
        this.aTurnover.amount *= -1;
      }

      if (!this.expense && this.aTurnover.amount < 0) {
        this.aTurnover.amount *= -1;
      }

      if (!this.aTurnover.amount) {
        this.aTurnover.amount = 0;
      }
    }
  },
  methods: {
    setExpense() {
      if (this.aTurnover.amount > 0) {
        this.aTurnover.amount *= -1;
      }

      this.expense = true;
    },
    setIncome() {
      if (this.aTurnover.amount < 0) {
        this.aTurnover.amount *= -1;
      }

      this.expense = false;
    },
    async logout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push({ name: 'login' });
      } catch (error) {
        throw new Error(error);
      }
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
    addNumber(number) {
      const strNumber = number.toString();
      this.strAmount += strNumber;
    },
    removeNumber() {
      this.strAmount = this.strAmount.slice(0, -1);
    },
    next() {
      this.$store.dispatch('setTurnover', this.aTurnover);
      this.$router.push({ name: 'turnoverAdd' });
    },
    cancel() {
      this.aTurnover = {};
      this.$store.dispatch('setTurnover', this.aTurnover);
      this.$router.push({ name: 'turnover' });
    }
  },
  created() {
    this.aTurnover = this.turnover;
    this.strAmount = this.turnover.amount.toString();
    this.strAmount = this.strAmount.replace(/[.-]/g, '');
    if (this.aTurnover.amount > 0) {
      this.expense = false;
    }
  },
};
</script>

