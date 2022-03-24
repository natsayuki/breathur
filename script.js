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

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

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
        const vibrations = []
        if(data.breathingIn){
          for(let i = 0; i < data.breatheIn; i++){
            const vibTime = map(i, 0, data.breatheIn, 0, 1000);
            vibrations.push(vibTime);
            vibrations.push(1000 - vibTime);
          }
        }
        window.navigator.vibrate(vibrations);
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
