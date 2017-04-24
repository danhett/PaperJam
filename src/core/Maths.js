class Maths {

  static randRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  static randIntRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  static flip() {
    return Math.random() < 0.5;
  }
}

export default Maths;
