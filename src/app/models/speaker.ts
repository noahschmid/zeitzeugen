import { Agent } from 'http';

export class Speaker {
    constructor(firstName, lastName, action, description, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.action = action;
        this.age = age;
        this.description = description;
    }

    getName():String {
        return this.lastName.toUpperCase() + " " + this.firstName.toUpperCase();
    }

    firstName:String;
    lastName:String;
    action:String;
    description:String;
    age:Number;
}