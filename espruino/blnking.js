
const ledPin = 15;
let state = HIGH;

pinMode(ledPin, `output`);

setInterval(() => {
  digitalWrite(ledPin, state);
  state = !state;
}, 1000);


