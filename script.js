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
    const vibrations = [];
    if(data.breathingIn){
      data.breatheTime = parseInt(data.breatheIn);
      data.wholeTime = parseInt(data.breatheIn) + parseInt(data.holdIn);
      for(let i = 0; i < data.breatheIn; i += .2){
        const vibTime = map(i, 0, data.breatheIn, 0, 200);
        vibrations.push(vibTime);
        vibrations.push(200 - vibTime);
      }
      vibrations.push(data.holdIn * 1000)
    } else {
      data.breatheTime = parseInt(data.breatheOut);
      data.wholeTime = parseInt(data.breatheOut) + parseInt(data.holdOut);
      for(let i = 0; i < data.breatheOut; i += .2){
        const vibTime = map(i, 0, data.breatheOut, 0, 200);
        vibrations.push(200 - vibTime);
        vibrations.push(vibTime);
      }
      vibrations.push(data.holdOut * 1000)
    }
    window.navigator.vibrate(vibrations);
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
