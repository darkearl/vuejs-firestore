var config = {}
if(process.env.NODE_ENV == 'development'){
  config = {
    apiKey: "AIzaSyBIcVCFUkmxAOU0rsprqAJGiYNm7hO_yZM",
    authDomain: "save-money-dev.firebaseapp.com",
    databaseURL: "https://save-money-dev.firebaseio.com",
    projectId: "save-money-dev",
    storageBucket: "save-money-dev.appspot.com",
    messagingSenderId: "278861574495"
  }
}else{
  config = {
    apiKey: "AIzaSyCd297EhIrqdQGJxk--7hPkPF6LTqx21QQ",
    authDomain: "save-money-ccd7c.firebaseapp.com",
    databaseURL: "https://save-money-ccd7c.firebaseio.com",
    projectId: "save-money-ccd7c",
    storageBucket: "save-money-ccd7c.appspot.com",
    messagingSenderId: "804795309960"
  }
}

export default config
