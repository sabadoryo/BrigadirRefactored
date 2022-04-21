class FlagObj {
  name;
  value;

  constructor(name, value = null) {
    this.name = name;
    this.value = value;
  }
}

module.exports = FlagObj;