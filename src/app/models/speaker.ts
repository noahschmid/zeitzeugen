import { Agent } from 'http';

export class Speaker {
    constructor(firstName, lastName, description, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.description = description;
    }

    getName():String {
        return this.lastName.toUpperCase() + " " + this.firstName.toUpperCase();
    }

    firstName:String;
    lastName:String;
    description:String;
    age:Number;
}