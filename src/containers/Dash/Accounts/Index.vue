<template>
  <div>
    <!-- Main content-->
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
            <GoodTable :columns="tbHeader" :rows="accounts">
              <template slot="table-row" slot-scope="{props}">
                <span v-if="props.column.field == 'control'">
                  <div class="btn-group">
                    <button type="button" @click="openEditForm(props.row)" class="btn btn-success btn-sm" ><i class="fa fa-pencil"></i></button>
                    <button type="button" @click="openTranferForm(props.row)" class="btn btn-info btn-sm" ><i class="fa fa-exchange"></i></button>
                    <!--<button type="button" @click="confirmModal = true; deleteData = props.row" class="btn btn-danger ">Delete</button>-->
                  </div>
                </span>
                <span v-else>
                  {{props.formattedRow[props.column.field]}}
                </span>
              </template>
            </GoodTable>
            <Modal v-if="confirmModal" @cancel="confirmModal=false" @confirm='deleteTag(deleteData);confirmModal=false'></Modal>
          </div>
        </div>
      </div>
    </div>
    <!-- End Main content-->
    <!-- Modal transfer-->
    <Modal v-if="tranferModal" @cancel="tranferModal=!tranferModal" @confirm='doTransfer(dataForm)' :loading="isLoading" >
      <template slot="header">
        <h4>Chuyển khoản</h4>
      </template>
      <template slot="body">
        <TransferForm v-model="dataForm"></TransferForm>
      </template>
    </Modal>
    <!-- modal update-->
    <Modal v-if="editModal" @cancel="editModal=!editModal" @confirm='update(dataForm)' :loading="isLoading" >
      <template slot="header">
        <h4 v-if="dataForm.id">Cập nhật tài khoản:#{{dataForm.id}}</h4>
        <h4 v-else="dataForm.id">Thêm tài khoản mới</h4>
      </template>
      <template slot="body">
        <EditForm v-model="dataForm"></EditForm>
      </template>
    </Modal>
  </div>
</template>
<script>
  import {GoodTable, Modal} from '@/components'
  import EditForm from './Form.vue'
  import TransferForm from './TranferForm'
  import { mapState, mapActions, mapGetters } from 'vuex'

  export default{
    components: {
      GoodTable,
      Modal,
      EditForm,
      TransferForm
    },
    data() {
      return {
        confirmModal:false,
        editModal:false,
        tranferModal:false,
        deleteData: '',
        dataForm:{},
        tbHeader: [
          {
            label: 'Tên tài khoản',
            field: 'name',
            sortable:false
          },
          {
            label: 'Số tiền ban đầu(VNĐ)',
            field: 'start_amount',
            type: 'number',
            width: '200px',
            formatFn:this.$options.filters.formatPrice
          },
          {
            label: 'Số tiền hiện  tại(VNĐ)',
            field: 'amount',
            type: 'number',
            width: '200px',
            formatFn:this.$options.filters.formatPrice
          },
          {
            label: '',
            field: 'control',
            sortable:false,
            width:'100px'
          }
        ],
      }
    },
    computed: {
      ...mapState({
        accounts: state => state.accounts.items
      }),
      ...mapGetters(['isLoading'])
    },

    methods: {
      ...mapActions({
        // deleteTag : 'tags/delete'
      }),
      openEditForm(data){
        this.dataForm = data || {start_amount:0}
        this.editModal = true
      },
      openTranferForm(data){
        this.dataForm = {transfer_amount:0, ...data}
        this.tranferModal = true
      },
      async update(data){
        let errors = []
        if (!data.name) {
          errors.push('Bạn chưa nhập tên tài khoản!');
        }
        if(errors.length>0){
          this.showNotifError(errors)
        }else{
          let {vgt_id, originalIndex,vgtSelected, ...props} = data
          await this.$store.dispatch('accounts/update',props)
          this.editModal = false
          this.showNotifSuccess('Hệ thống đã xử lý!')
        }
      },
      async doTransfer(data){
        let errors = []

        if (!data.targetID) {
          errors.push('Bạn chưa chọn tài khoản chuyển đến!');
        }
        if(errors.length>0){
          this.showNotifError(errors)
        }else{
          await this.$store.dispatch('accounts/transfer',data)
          this.tranferModal = false
          this.showNotifSuccess('Hệ thống đã xử lý!')
        }
      }
    }
  }
</script>