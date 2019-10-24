export default class Variable {
  static NextId = 0;
  readonly id = "Variable-" + Variable.NextId++;
}
