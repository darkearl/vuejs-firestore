<template>
    <div class="eventform-container">
      <form class="form-horizontal" @submit.prevent>
      <div class="box-body">
        <div class="form-group">
          <label class="col-xs-2 control-label">Tên:</label>
          <div class="input-group col-xs-10">
            <input type="text" class="form-control" v-model="value.name">
          </div>
        </div>

          <div class="form-group">
            <label class="col-xs-2 control-label">Nhóm:</label>
            <div class="input-group col-xs-10">
              <select class="form-control" v-model="value.groupID">
                <option v-for="option in groupOptions" v-bind:value="option.id" >{{ option.name }}</option>
              </select>
            </div>
          </div>
        </div>
      </form>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props:['value'],
    computed: {
      ...mapState({
        groupOptions: state => state.groups.items
      })
    }
  }
</script>
