import { Deserializable } from './deserializable.model';

export class User implements Deserializable {

    id:string;
    email:string;
    firstName:string;
    lastName:string;
    address:string;
    telephone:string;

    getFullName() {
      return this.firstName + ' ' + this.lastName;
    }

    deserialize(input:any) {
        Object.assign(this, input);
        return this;
    }
}
