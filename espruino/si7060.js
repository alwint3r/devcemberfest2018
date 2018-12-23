class SI7060 {
  constructor(i2c, addr) {
    this._i2c = i2c;
    this._addr = addr;
  }

  _readValue(registerAddr) {
    this._i2c.writeTo(this._addr, registerAddr);
    const result = this._i2c.readFrom(this._addr, 1);

    return result[0];
  }

  _writeValue(registerAddr, value) {
    this._i2c.writeTo(this._addr, registerAddr, value);
  }

  readTemperature() {
    this._prepare();

    let temp;
    let ret;

    ret = this._readValue(0xC1);
    const dspSigm = (ret & 0x7F);

    ret = this._readValue(0xC2);
    const dspSigl = ret;

    temp = 55.0 + (parseFloat(256*dspSigm)+parseFloat(dspSigl-16384))/160.0;
    
    return temp;
  }

  _prepare() {
    this._readValue(0xC0);
    this._readValue(0xC4);

    this._writeValue(0xC4, 0x04);

    this._readValue(0xC4);

    this._writeValue(0xC6, 0x4E);
    this._writeValue(0xC7, 0x1C);
  }

  sleep() {
    this._writeValue(0xC4, 0x01);
  }
}

const i2c = new I2C();
i2c.setup({ sda: D21, scl: D22 });

const si = new SI7060(i2c, 0x31);

setInterval(() => {
  console.log(`tempreature: ${si.readTemperature()}`);
}, 1000);