<template>
  <div>
    <Modal v-if="editModal" @cancel="editModal=false" @confirm='update(dataForm)' :loading="isLoading" >
      <template slot="header">
        <h4 v-if="dataForm.id">Cập nhật sự kiện:#{{dataForm.id}}</h4>
        <h4 v-else>Thêm mới</h4>
      </template>
      <template slot="body">
        <BorrowForm v-model="dataForm"></BorrowForm>
      </template>
    </Modal>
    <Modal v-if="confirmModal" @cancel="confirmModal=false" @confirm='delEvent(deleteId)' :loading="isLoading"></Modal>
    <Modal v-if="paidModal" @cancel="paidModal=false" @confirm='paid(dataForm)' :loading="isLoading">
      <template slot="header">
        Chọn tài khoản nhận
      </template>
      <template slot="body">
        <PaidForm v-model="dataForm"></PaidForm>
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
            <GoodTable :columns="tbHeader" :rows="borrows" >
              <template slot="table-row" slot-scope="{props}">
                <span v-if="props.column.field == 'control'">
                  <div class="btn-group" v-if="!props.row.paid">
                    <button type="button" @click="openEditForm(props.row)" class="btn btn-success btn-sm" ><i class="fa fa-pencil"></i></button>
                    <button type="button" @click="openPaidForm(props.row)" class="btn btn-warning btn-sm" ><i class="fa fa-check"></i></button>
                    <button type="button" @click="confirmModal = true; deleteId = props.row.id" class="btn btn-danger btn-sm" ><i class="fa fa-close"></i></button>
                  </div>
                </span>
                <span v-if="props.column.field == 'note'">
                  {{props.formattedRow[props.column.field]}}
                  <div v-if="props.row.accountIDPay != ''">
                    Tài khoản nhận: {{props.row.accountIDPay | accountNameById}}
                  </div>
                </span>
                <span v-else>
                  {{props.formattedRow[props.column.field]}}
                </span>
              </template>
            </GoodTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {GoodTable, Modal} from '@/components'
import BorrowForm from './Form.vue'
import PaidForm from './PaidForm.vue'
import {FormatDisplayDate, FormatDBDate} from '@/common'
import { mapState, mapActions, mapGetters } from 'vuex'
import store from '@/store'
export default {
  data() {
    return {
      paidModal:false,
      confirmModal: false,
      deleteId: '',
      editModal:false,
      dataForm: {},
      tbHeader: [{
            label: 'Ngày',
            field: 'date',
            type: 'date',
            dateInputFormat: FormatDBDate,
            dateOutputFormat: FormatDisplayDate,
            width:'100px'
          },
          {
            label: 'Số tiền (VNĐ)',
            field: 'amount',
            type: 'number',
            formatFn:this.$options.filters.formatPrice,
            width: '150px'
          },
          {
            label: 'Tài khoản',
            field: 'accountIDGet',
            formatFn: this.$store.getters['accounts/getName'],
            width: '150px'
          },
          {
            label: 'Trạng thái',
            field: 'paid',
            formatFn: this.fmStatus,
            width: '150px'
          },
          {
            label: 'Ghi chú',
            field: 'note',
            sortable:false,
          },
          {
            label: '',
            field: 'control',
            sortable:false,
            width:'150px'
          }
        ],
    }
  },
  components: {
    GoodTable,
    Modal,
    BorrowForm,
    PaidForm
  },
  computed: {
    ...mapState({
      borrows: state => state.borrow.items
    }),
    ...mapGetters(['isLoading'])
  },
  mounted() {
    this.loadAll()
  },
  filters: {
    accountNameById: function (id) {
      return store.getters['accounts/getName'](id)
    }
  },
  methods: {
    ...mapActions({
        loadAll: 'borrow/loadAll',
        deleteEvent : 'borrow/delete'
    }),
    async delEvent(deleteId){
      await this.deleteEvent(deleteId)
      this.confirmModal=false
      this.showNotifSuccess('Hệ thống đã xử lý!')
    },
    async update(data) {
      let errors = []
      if (!data.accountIDGet) {
        errors.push('Bạn chưa chọn tài khoản!');
      }

      if(errors.length>0){
        this.showNotifError(errors)
      }else{
        data.date = this.$options.filters.getDBDate(data.date)
        let {vgt_id, originalIndex, ...props} = data
        await this.$store.dispatch('borrow/update',props)
        this.editModal = false
        this.showNotifSuccess('Hệ thống đã xử lý!')
      }
    },
    openEditForm(data) {
      if(data){
          let {date, ...props} = data
          date = this.$options.filters.getDateFromDBDate(data.date)
          this.dataForm = {
            date,
            ...props
          }
        }else{
          this.dataForm = {
            date: new Date(),
            amount: 0,
            note: ''
          }
        }
        this.editModal = true
    },
    openPaidForm(data) {
      let {accountIDPay, accountIDGet, ...props} = data
      this.dataForm = {
        accountIDPay: accountIDGet,
        accountIDGet,
        ...props
      }
      this.paidModal = true;
    },
    async paid(data) {
      let errors = []
      if (!data.accountIDPay) {
        errors.push('Bạn chưa chọn tài khoản!');
      }

      if(errors.length>0){
        this.showNotifError(errors)
      }else{
        let {vgt_id, originalIndex, ...props} = data
        await this.$store.dispatch('borrow/paid',props)
        this.paidModal = false
        this.showNotifSuccess('Hệ thống đã xử lý!')
      }
    },
    fmStatus(val){
      return val && 'Đã trả' || 'Chưa trả'
    }
  }
}
</script>
