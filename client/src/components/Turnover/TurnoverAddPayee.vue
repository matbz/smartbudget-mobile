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
        Payee
      </div>
      <div class="pure-u-1-3"></div>
    </div>
    <div class="content">
      <div class="pure-g add-list">
        <button class="pure-u-1">
          <span class="fl">New:</span>
          <span class="fr">
            <input class="note-input" placeholder="Name" v-model="name" type="text" @change="savePayee()"/>
          </span>
        </button>
        <turnover-add-payee-item
        v-for="item in payees"
        :item = "item"
        :key="item.id"
        >
        </turnover-add-payee-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TurnoverAddPayeeItem from './TurnoverAddPayeeItem';

export default {
  components: {
    TurnoverAddPayeeItem
  },
  data() {
    return {
      name: '',
      aTurnover: {}
    };
  },
  computed: {
    ...mapGetters([
      'payees',
      'turnover'
    ])
  },
  methods: {
    savePayee() {
      this.$store.dispatch('setTurnover', this.aTurnover);
    },
    goTo(routeName) {
      this.aTurnover.payee = this.name;
      this.$router.push({ name: routeName });
    }
  },
  created() {
    this.name = '';
    this.aTurnover = this.turnover;
  }
};
</script>
