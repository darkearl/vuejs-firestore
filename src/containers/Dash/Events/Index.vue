<template>
  <div>
      <Modal v-if="editModal" @cancel="editModal=!editModal" @confirm='updateEvent(dataForm)' :loading="isLoading" >
        <template slot="header">
          <h4 v-if="dataForm.id">Cập nhật sự kiện:#{{dataForm.id}}</h4>
          <h4 v-else>Thêm mới</h4>
        </template>
        <template slot="body">
          <EventForm v-model="dataForm"></EventForm>
        </template>
      </Modal>

      <div class="box box-primary table-result">
        <div class="box-header">
          <h3 class="box-title">Bảng dữ liệu</h3>
          <div class="box-tools pull-right">
            <router-link tag="button" class="btn btn-default" to="/borrow"><i class="fa fa-share"></i> Vay/Mượn</router-link>
            <button type="button" @click="openEditForm()" class="btn btn-info">Thêm mới</button>
          </div>
        </div>
        <div class="box-body">
          <div class="dataTables_wrapper form-inline dt-bootstrap" <div class="row">
            <div class="col-sm-12 table-responsive">
              <GoodTable :columns="tbHeader" :rows="events" :rowStyleClass="test">
                <template slot="table-row" slot-scope="{props}">
                  <span v-if="props.column.field == 'control'">
                    <div class="btn-group">
                      <button type="button" @click="openEditForm(props.row)" class="btn btn-success btn-sm" ><i class="fa fa-pencil"></i></button>
                      <button type="button" @click="confirmModal = true; deleteId = props.row.id" class="btn btn-danger btn-sm" ><i class="fa fa-close"></i></button>
                    </div>
                  </span>
                  <span v-else>
                    {{props.formattedRow[props.column.field]}}
                  </span>
                </template>
              </GoodTable>
              <Modal v-if="confirmModal" @cancel="confirmModal=false" @confirm='delEvent(deleteId)' :loading="isLoading"></Modal>
            </div>
          </div>
        </div>
      </div>
  </div>

</template>

<script>
  import {GoodTable, Modal} from '@/components'
  import EventForm from './Form.vue'
  import {FormatDisplayDate, FormatDBDate} from '@/common'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import _ from 'lodash'
  export default {
    components: {
      GoodTable,
      Modal,
      EventForm
    },
    data() {
      return {
        confirmModal: false,
        deleteId: '',
        isUpdate: false,
        editModal: false,
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
            field: 'accountID',
            formatFn: this.$store.getters['accounts/getName'],
            width: '150px'
          },
          {
            label: 'Danh mục',
            field: 'tagID',
            formatFn: this.$store.getters['tags/getName'],
            width: '200px'
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
            width:'100px'
          }
        ],
        dataForm: {},
      }
    },
    computed: {
      ...mapState({
        events: state => state.events.items
      }),
      ...mapGetters(['isLoading'])
    },
    mounted() {
      this.loadAll()
    },
    methods: {
      ...mapActions({
        loadAll: 'events/loadAll',
        deleteEvent : 'events/delete'
      }),
      test(row){
        // console.log(row)
        return 'red'
      },
      async delEvent(deleteId){
        await this.deleteEvent(deleteId)
        this.confirmModal=false
        this.showNotifSuccess('Hệ thống đã xử lý!')
      },
      async updateEvent(data) {
        let errors = []
        if (!data.accountID) {
          errors.push('Bạn chưa chọn tài khoản!');
        }

        if (!data.tagID) {
          errors.push('Bạn chưa chọn danh mục!');
        }


        if(errors.length>0){
          this.showNotifError(errors)
        }else{
          data.date = this.$options.filters.getDBDate(data.date)
          let {vgt_id, originalIndex, ...props} = data
          await this.$store.dispatch('events/update',props)
          this.editModal = false
          this.showNotifSuccess('Hệ thống đã xử lý!')
        }
      },
      openEditForm(eventData) {
        if(eventData){
          let {date, ...props} = eventData
          date = this.$options.filters.getDateFromDBDate(eventData.date)
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
      }
    }
  }
</script>
