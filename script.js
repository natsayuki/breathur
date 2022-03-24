const data = {
  bubbleColor: 'blue',
  bubbleOpen: false,
  breatheIn: 3,
  holdIn: 2,
  breatheOut: 5,
  holdOut: 2,
  breatheTime: 0,
  wholeTime: 0,
  breathingIn: false,
  breathing: false,
}

const methods = {
  startBreathing(){
    data.breathing = true;
    methods.breathe();
  },
  breathe(){
    data.breathingIn = !data.breathingIn;
    if(data.breathingIn){
      data.breatheTime = parseInt(data.breatheIn);
      data.wholeTime = parseInt(data.breatheIn) + parseInt(data.holdIn);
    } else {
      data.breatheTime = parseInt(data.breatheOut);
      data.wholeTime = parseInt(data.breatheOut) + parseInt(data.holdOut);
    }
    if(data.breathing || (!data.breathing && data.breathingIn)){
      setTimeout(function(){
        methods.breathe()
      }, 1000 * data.wholeTime);
    }

  }
}


Vue.use(VueMaterial.default);
Vue.config.productionTip = false;

const vm = new Vue({
  el: '#app',
  data: data,
  methods: methods,
});
