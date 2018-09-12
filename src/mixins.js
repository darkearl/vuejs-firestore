export default {
  methods:{
    showNotifSuccess(msg,title=''){
      this.showNotif(msg,title,'')
    },
    showNotifError(msg,title=''){
      this.showNotif(msg,title,'error')
    },
    showNotif(msg,title='',type = '') {
      let message = ''
      if (typeof msg === 'string') {
        message = msg
      }

      if(Array.isArray(msg)){
        message = msg.join("<br/>")
      }

      if(title == ''){
        switch(type) {
            case 'error':
                title='Error!'
                break;
            default:
                title='Success!'
        }
      }

      this.$notify({
        group: 'alert',
        title,
        text: message,
        type //warn error
      });

    }
  }
};