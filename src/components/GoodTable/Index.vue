<template>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :pagination-options="{
        enabled: true,
        perPage: 10,
        perPageDropdown: [10, 20, 50]
      }"
      :rowStyleClass="rowStyleClass"
      >
      <template slot="table-actions">
        <slot name="table-actions"></slot>
      </template>
      <template slot="table-row" slot-scope="props">
        <slot name="table-row" :props="props"></slot>
      </template>
    </vue-good-table>
</template>

<script>
export default {
  props: ['rows','columns','rowStyleClass']
};
</script>