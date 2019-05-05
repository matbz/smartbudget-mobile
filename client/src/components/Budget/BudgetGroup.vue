<template>
  <div style="width: 100%; height: 100%">
    <div v-if="index !== 0" class="divider"></div>
    <div class="pure-g budget-group">
      <div class="pure-u-12-24 budget-header-name">
        {{ group.header.categorygroup_name }}
      </div>
      <div class="pure-u-6-24 budget-header budget-header-budgeted">
        <div>Budgeted</div>
        <div>{{ group.header.budgeted | currency }}</div>
      </div>
      <div class="pure-u-6-24 budget-header budget-header-available">
        <div>Available</div>
        <div>{{ group.header.available | currency }}</div>
      </div>
    </div>
    <budget-group-item
    v-for="item in group.items"
    :item = "item"
    :key="item.id"
    >
    </budget-group-item>
  </div>
</template>

<script>
import BudgetGroupItem from './BudgetGroupItem';

export default {
  components: {
    BudgetGroupItem
  },
  props: [
    'group',
    'index'
  ]
};
</script>
