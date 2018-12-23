
const phototransistorPin = D36;

setInterval(() => {
  const value = analogRead(phototransistorPin);
  console.log(value);

  const voltage = value * 3.3;
  console.log(`${voltage} Volt`);
}, 1000);
