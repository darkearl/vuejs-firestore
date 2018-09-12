<template>
	<transition name="appear">
		<div class="wrap-modal">
			<div class="modal-window" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
			  <div class="modal-container">
  				<div class="modal-header">
  					<button type="button" class="close" @click="onCancel" aria-label="Close modal"><span aria-hidden="true">×</span></button>
  					<slot name="header"></slot>
  				</div>
  				<div class="modal-body">
  					<slot name="body">
  						<p>Are you sure?</p>
  					</slot>
  				</div>
  				<div class="modal-footer">
  					<slot name="footer">
  							<button type="button" class="btn btn-default pull-left" @click="onCancel" aria-label="Close modal">Close</button>
  							<button type="button" class="btn btn-primary" @click="onConfirm" aria-label="Submit modal">Save</button>
  					</slot>
  				</div>
  				<div class="overlay" v-if="loading">
            <i class="fa fa-refresh fa-spin"></i>
          </div>
        </div>
			</div>
		</div>
	</transition>
</template>

<script>

  export default {
    props: ["loading"],
    methods: {
      onConfirm() {
        this.$emit("confirm");
      },
      onCancel() {
        this.$emit("cancel");
      }
    }
  };
</script>

<style>
  .wrap-modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 4999;
  }

  .modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    transition: .5s;
    width: 100%;
    max-width: 450px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
    transform: translate(-50%, -50%);
    color: black;
    text-align: center;
  }

  .appear-enter {
    opacity: 0;
  }

  .appear-enter .modal-window {
    transform: translate(-75%, -50%);
  }

  .appear-enter-active {
    transition: .5s;
  }

  .appear-leave-active .modal-window {
    transform: translate(0, -50%);
  }

  .appear-leave-active {
    opacity: 0;
    transition: .5s;
  }

  .modal-container{
    position: relative;
  }

  .modal-container .overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.7);
    z-index: 50;
  }
  .overlay .fa{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
    color: #000;
    font-size: 30px;
  }
</style>
