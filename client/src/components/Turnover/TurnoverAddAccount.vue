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
        Account
      </div>
      <div class="pure-u-1-3"></div>
    </div>
    <div class="content">
      <div class="pure-g add-list">
        <turnover-add-account-item
        v-for="item in accounts"
        :item = "item"
        :key="item.id"
        >
        </turnover-add-account-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TurnoverAddAccountItem from './TurnoverAddAccountItem';

export default {
  components: {
    TurnoverAddAccountItem
  },
  computed: {
    ...mapGetters([
      'accounts'
    ])
  },
  methods: {
    goTo(routeName) {
      this.$router.push({ name: routeName });
    }
  }
};
</script>
