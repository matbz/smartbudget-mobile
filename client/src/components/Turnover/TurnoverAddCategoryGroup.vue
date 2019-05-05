<template>
  <div style="width: 100%; height: 100%">
    <div class="cg">{{ group.header.categorygroup_name }}</div>
    <turnover-add-category-group-item
    v-for="item in group.items"
    :item = "item"
    :key="item.category_id"
    >
    </turnover-add-category-group-item>
  </div>
</template>

<script>
import TurnoverAddCategoryGroupItem from './TurnoverAddCategoryGroupItem';

export default {
  components: {
    TurnoverAddCategoryGroupItem
  },
  props: [
    'group'
  ]
};
</script>
