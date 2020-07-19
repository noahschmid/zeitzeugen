import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  characters = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];

  constructor() { 
    this.characters.sort(() => 0.02 - 0.5);

    for(let i = 0; i < 24; ++i) {
     // console.log(i +  ": " + this.encode(i));
    }
  }

  encode(index) {
    let digit2 = index%35;
    let digit1 = (Math.floor(index/35))%35;
    let digit0 = (Math.floor(Math.floor(index/35)/35))%35;

    digit0 = (digit0 + digit2 + 17)%35;
    digit1 = (digit1 + digit2 + 5)%35;

    return this.characters[digit0] + this.characters[digit1] + this.characters[digit2];
  }

  getDigitFromChar(char) : number {
    for(let i in this.characters) {
        if(this.characters[i] == char)
            return parseInt(i);
    }
    return -1;
  }

  decode(code) {
      let chars = Array.from(code);

      let digits = [
          this.getDigitFromChar(chars[0]),
          this.getDigitFromChar(chars[1]),
          this.getDigitFromChar(chars[2])
      ]

      digits[0] = (digits[0] - digits[2] - 17)%35;
      digits[1] = (digits[1] - digits[2] - 5)%35;

      digits[1] *= 35;
      digits[0] *= Math.pow(35, 2);

      let decoded = digits[0] + digits[1] + digits[2];

      return decoded;
  }
}
