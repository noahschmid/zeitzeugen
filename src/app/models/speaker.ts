import { Agent } from 'http';

export class Speaker {
    constructor(firstName, lastName, action, profession, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.action = action;
        this.age = age;
        this.profession = profession;
    }

    getName():String {
        return this.lastName.toUpperCase() + " " + this.firstName.toUpperCase();
    }

    firstName:String;
    lastName:String;
    action:String;
    profession:String;
    age:Number;
}