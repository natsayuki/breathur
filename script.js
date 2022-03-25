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
  landscape: window.width > window.height,
  breatheTimeout: null,
  vibrating: false,
  vibratingReverse: false,
  elapsed: 0,
  timer: null,
  holdingIn: false,
  takeBPM: false,
  showTime: false,
  bpm: [],
}

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

const methods = {
  startBreathing(){
    data.breathing = true;
    data.bpm = [];
    data.elapsed = 0;
    methods.breathe();
    data.timer = setInterval(function(){
      data.elapsed++;
    }, 1000)
  },
  stopBreathing(){
    data.breathing = false;
    data.breathingIn = false;
    data.bubbleOpen = false;
    clearInterval(data.timer)
    clearTimeout(data.breatheTimeout);
  },
  breathe(){
    data.breathingIn = !data.breathingIn;
    const vibrations = [];
    if(data.breathingIn){
      data.breatheTime = parseInt(data.breatheIn);
      data.wholeTime = parseInt(data.breatheIn) + parseInt(data.holdIn);
      setTimeout(function(){
        data.holdingIn = true;
      }, 1000 * parseInt(data.breatheIn));
      for(let i = 0; i < data.breatheIn; i += .2){
        const vibTime = map(i, 0, data.breatheIn, 0, 200);
        if(!data.vibratingReverse){
          vibrations.push(vibTime);
          vibrations.push(200 - vibTime);
        } else {
          vibrations.push(200 - vibTime);
          vibrations.push(vibTime);
        }
      }
      vibrations.push(data.holdIn * 1000)
    } else {
      data.breatheTime = parseInt(data.breatheOut);
      data.wholeTime = parseInt(data.breatheOut) + parseInt(data.holdOut);
      setTimeout(function(){
        data.holdingIn = false;
      }, 1000 * parseInt(data.breatheOut));
      for(let i = 0; i < data.breatheOut; i += .2){
        const vibTime = map(i, 0, data.breatheOut, 0, 200);
        if(!data.vibratingReverse){
          vibrations.push(200 - vibTime);
          vibrations.push(vibTime);
        } else {
          vibrations.push(vibTime);
          vibrations.push(200 - vibTime);
        }
      }
      vibrations.push(0)
      vibrations.push(data.holdOut * 1000)
    }
    if(data.vibrating) window.navigator.vibrate(vibrations);
    if(data.breathing || (!data.breathing && data.breathingIn)){
      data.breatheTimeout = setTimeout(function(){
        methods.breathe()
      }, 1000 * data.wholeTime);
    }

  }
}

const computed = {
  averageBPM: function() {
    const bpm = {};
    data.bpm.forEach(beat => {
      if(bpm[beat]) bpm[beat]++
      else bpm[beat] = 1
    });

    let total = 0;
    Object.keys(bpm).forEach(second => {
      bpm[second] *= 60;
      total += bpm[second];
    });

    return Math.round(total / data.elapsed);
  }
}

document.addEventListener('mousedown', e => {
  if(data.takeBPM){
    data.bpm.push(data.elapsed);
  }
});


Vue.use(VueMaterial.default);
Vue.config.productionTip = false;

const vm = new Vue({
  el: '#app',
  data: data,
  methods: methods,
  computed: computed,
});
