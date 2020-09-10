<template>
  <modal class="modal-popup" :name="name" :width="300" height="auto" :pivot-y="0.3" @opened="opened">
    <div class="modal-content">
      <div class="fieldset">
        <label>{{ item.category_name }}:</label>
        <div>
          <div>
            <vue-numeric
              class="input-primary"
              currency="€"
              currency-symbol-position="suffix"
              separator="."
              v-model="amount"
              :minus="true"
              :precision="2"
              ></vue-numeric>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button class="button button-primary" @click="save()">
          Save
      </button>
      <button class="button btn-cancel" @click="close()">
          Cancel
      </button>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: [
    'name',
    'item'
  ],
  data() {
    return {
      amount: 0,
    };
  },
  computed: {
    ...mapGetters([
      'budgetDate'
    ]),
    budgetedData() {
      return {
        categoryId: Number(this.item.category_id),
        budgetedDate: this.budgetDate,
        amount: this.amount
      };
    },
  },
  methods: {
    opened() {
      this.amount = '';
    },
    close() {
      this.$modal.hide(this.name);
    },
    async save() {
      try {
        await this.$store.dispatch('updateBudgeted', this.budgetedData);
        await this.getBudget();
        this.$toasted.success('Budgeted updated.');
        this.close();
      } catch (error) {
        this.$toasted.error('There was an error updating the budget.');
      }
    },
    async getBudget() {
      try {
        await this.$store.dispatch('getToBeBudgeted', this.budgetDate);
        await this.$store.dispatch('getBudgetList', this.budgetDate);
      } catch (error) {
        this.$toasted.error('There was an error getting the budget list.');
      }
    }
  }
};
</script>

