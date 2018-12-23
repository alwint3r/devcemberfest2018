D15.mode('output');
let state = HIGH;

setInterval(() => {
  state = !state;
  D15.write(state);
}, 500);