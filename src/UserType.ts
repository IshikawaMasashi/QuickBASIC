import { ScalarVariable } from './ScalarVariable';

/** @constructor */
export class UserType {
  constructor(public name: string, public members: any) {
    // this.name = name;
    // Members: A mapping of names to types.
    // this.members = members;
  }

  createInstance() {
    let user: any = {};

    for (let name in this.members) {
      user[name] = new ScalarVariable(
        this.members[name],
        this.members[name].createInstance()
      );
    }

    return user;
  }

  copy(value: any) {
    let newValue: any = {};
    for (let key in value) {
      newValue[key] = value[key].copy();
    }

    return newValue;
  }
}
