<template>
  <div style="height: 100%">
    <div class="pure-g header">
      <div class="pure-u-1-3 header-cancel" @click="cancel()">
        <button class="button-cancel" >Cancel</button>
      </div>
      <div class="pure-u-1-3 header-text">
        Add Turnover
      </div>
      <div class="pure-u-1-3 header-logout">
        <button v-if="aTurnover.id" class="button-logout" @click="deleteTurnover()">Delete</button>
      </div>
    </div>
    <div class="content">
      <div class="pure-g amount-display" @click="goTo('turnoverAddAmount')">
        <div class="pure-u-1 amount-text">
          <span :class="aTurnover.amount <= 0 ? 'negative' : 'positive'">{{ aTurnover.amount | currency}}</span>
        </div>
      </div>
      <div class="pure-g add-list">
        <button class="pure-u-1" @click="goTo('turnoverAddPayee')">
          <span class="fl">Payee:</span>
          <i class="fa fa-angle-right angle-right-icon fr"></i>
          <span class="fr">
            <button v-if="!aTurnover.payee" class="placeholder">Choose a payee</button>
            <button v-else>{{ aTurnover.payee }}</button>
          </span>
        </button>
        <button class="pure-u-1" @click="goTo('turnoverAddCategory')">
          <span class="fl">Category:</span>
          <i class="fa fa-angle-right angle-right-icon fr"></i>
          <span class="fr">
            <button v-if="!aTurnover.categoryName" class="placeholder">Choose a category</button>
            <button v-else>{{ aTurnover.categoryName }}</button>
          </span>
        </button>
        <button class="pure-u-1" @click="goTo('turnoverAddAccount')">
          <span class="fl">Account:</span>
          <i class="fa fa-angle-right angle-right-icon fr"></i>
          <span class="fr">
            <button v-if="!aTurnover.accountName" class="placeholder">Choose an account</button>
            <button v-else>{{ aTurnover.accountName }}</button>
          </span>
        </button>
        <button class="pure-u-1">
          <span class="fl">Date:</span>
          <i class="fa fa-angle-right angle-right-icon fr"></i>
          <span class="fr">
            <datepicker v-model="aTurnover.turnoverDate"></datepicker>
            <button>{{ formattedDate }}</button>
          </span>
        </button>
        <button class="pure-u-1">
          <span class="fl">Note:</span>
          <span class="fr">
            <input class="note-input" v-model="aTurnover.note" type="text" @change="saveNote()"/>
          </span>
        </button>
      </div>
      <div class="pure-g save">
        <button class="pure-u-1 button-primary button-save" @click="saveTurnover()">
          <i class="fa fa-check-circle-o"></i>
          Save Turnover
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      aTurnover: {}
    };
  },
  computed: {
    ...mapGetters([
      'turnover',
      'accounts',
      'user',
      'budgetId',
      'budgetDate'
    ]),
    formattedDate() {
      return moment(this.aTurnover.turnoverDate).format('DD.MM.YYYY');
    }
  },
  methods: {
    goTo(routeName) {
      this.$router.push({ name: routeName });
    },
    cancel() {
      this.$store.dispatch('setTurnover', {});
      this.$router.push({ name: 'turnover' });
    },
    saveNote() {
      this.$store.dispatch('setTurnover', this.aTurnover);
    },
    async saveTurnover() {
      if (this.aTurnover.accountId && this.aTurnover.turnoverDate) {
        this.aTurnover.turnoverDate = moment(this.aTurnover.turnoverDate).format('YYYY-MM-DD');

        if (this.aTurnover.id === null) {
          try {
            await this.$store.dispatch('createTurnovers', this.aTurnover);
            this.reload();
            this.$toasted.success('Turnover created.');
            this.$store.dispatch('setTurnover', {});
            this.$router.push({ name: 'turnover' });
          } catch (error) {
            this.$toasted.error('Error creating a turnover.');
          }
        } else {
          try {
            await this.$store.dispatch('updateTurnover', this.aTurnover);
            this.reload();
            this.$toasted.success('Turnover updated.');
            this.$store.dispatch('setTurnover', {});
            this.$router.push({ name: 'turnover' });
          } catch (error) {
            this.$toasted.error('Error updating a turnover.');
          }
        }
      } else {
        this.$toasted.error('Account and date is required.');
      }
    },
    async deleteTurnover() {
      try {
        await this.$store.dispatch('deleteTurnovers', [this.aTurnover.id]);
        this.reload();
        this.$toasted.success('Turnover deleted.');
        this.$store.dispatch('setTurnover', {});
        this.$router.push({ name: 'turnover' });
      } catch (error) {
        this.$toasted.error('Error deleting a turnover.');
      }
    },
    reload() {
      this.$store.dispatch('getAccounts');
      this.$store.dispatch('getBudgetList', this.budgetDate);
      this.$store.dispatch('getToBeBudgeted', this.budgetDate);
    },
    async init() {
      if (!this.budgetId) {
        await this.$store.dispatch('getBudgetId', this.user);
        await this.$store.dispatch('getAccounts');
        this.$store.dispatch('getBudgetList', this.budgetDate);
        this.$store.dispatch('getToBeBudgeted', this.budgetDate);
        this.$store.dispatch('getPayees');
      }
    }
  },
  async created() {
    await this.init();
    this.aTurnover = this.turnover;

    if (!this.aTurnover.accountId && this.accounts[0]) {
      this.aTurnover.accountId = this.accounts[0].id;
      this.aTurnover.accountName = this.accounts[0].name;
    }
  }
};
</script>

