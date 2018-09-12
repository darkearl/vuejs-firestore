<template>
  <div>
    <Modal v-if="editModal" @cancel="editModal=!editModal" @confirm='updateTag(dataForm)' :loading="isLoading" >
      <template slot="header">
        <h4 v-if="dataForm.id">Cập nhật danh mục:#{{dataForm.id}}</h4>
        <h4 v-else="dataForm.id">Thêm danh mục mới</h4>
      </template>
      <template slot="body">
        <TagForm v-model="dataForm"></TagForm>
      </template>
    </Modal>
    <div class="box box-primary table-result">
      <div class="box-header">
        <h3 class="box-title">Bảng dữ liệu</h3>
        <div class="box-tools pull-right">
          <button type="button" @click="openEditForm()" class="btn btn-block btn-info">Thêm mới</button>
        </div>
      </div>
      <div class="box-body">
        <div class="dataTables_wrapper form-inline dt-bootstrap" <div class="row">
          <div class="col-sm-12 table-responsive">
            <GoodTable :columns="tbHeader" :rows="tags">
              <template slot="table-row" slot-scope="{props}">
                <span v-if="props.column.field == 'control'">
                  <div class="btn-group">
                    <button type="button" @click="openEditForm(props.row)" class="btn btn-success btn-sm" ><i class="fa fa-pencil"></i></button>
                  </div>
                </span>
                <span v-else>
                  {{props.formattedRow[props.column.field]}}
                </span>
              </template>
            </GoodTable>
            <Modal v-if="confirmModal" @cancel="confirmModal=false" @confirm='deleteTag(deleteData);confirmModal=false' :loading="isLoading"></Modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {GoodTable, Modal} from '@/components'
  import TagForm from './Form.vue'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import _ from 'lodash'
  export default{
    components: {
      GoodTable,
      Modal,
      TagForm
    },
    data() {
      return {
        confirmModal:false,
        editModal:false,
        deleteData: '',
        dataForm:{},
        tbHeader: [
          {
            label: 'Tên',
            field: 'name',
            sortable:false
          },
          {
            label: 'Nhóm',
            field: 'groupID',
            formatFn: this.$store.getters['groups/getName'],
            width: '100px'
          },
          {
            label: 'Số tiền (VNĐ)',
            field: 'amount',
            type: 'number',
            width: '200px',
            formatFn:this.$options.filters.formatPrice
          },
          {
            label: '',
            field: 'control',
            sortable:false,
            width: '100px'
          }
        ],
      }
    },
    computed: {
      ...mapState({
        tags: state => state.tags.items,
      }),
      ...mapGetters(['isLoading'])
    },

    methods: {
      ...mapActions({
        deleteTag : 'tags/delete'
      }),
      openEditForm(data){
        this.dataForm = data || {}
        this.editModal = true
      },
      async updateTag(data){
        let errors = []
        if (!data.name) {
          errors.push('Bạn chưa nhập tên danh mục!');
        }

        if (!data.groupID) {
          errors.push('Bạn chưa chọn nhóm!');
        }

        if(errors.length>0){
          this.showNotifError(errors)
        }else{
          let {vgt_id, originalIndex, ...props} = data
          await this.$store.dispatch('tags/update',props)
          this.editModal = false
          this.showNotifSuccess('Hệ thống đã xử lý!')
        }
      }
    }
  }
</script>