import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
declare let Logger : any; // for class itself
declare let log : any; // for log() function
const FACT = 2.54;



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'assigment01-Camila';
  inch = "1"; //public prop
  cm = Math.round(1 * FACT * 100) / 100;
  
  //class var that turns the stupid ass checkbox off
  checkbox = false;
  // other stupid ass variables
  base = 16;
  simplified = false;

  //log thingy (holy shit i need to submit this fast lmao)
  ngOnInit()
  {
    log("===== toDecimal() =====")
    log(`toDecimal("1")     -> ${toDecimal("1")}`);
    log(`toDecimal("1.2")   -> ${toDecimal("1.2")}`);
    log(`toDecimal("1/2")   -> ${toDecimal("1/2")}`);
    log(`toDecimal("1/16")  -> ${toDecimal("1/16")}`);
    log(`toDecimal("3/2")   -> ${toDecimal("3/2")}`);
    log(`toDecimal("1 2/3") -> ${toDecimal("1 2/3")}`);
    log("")
    log("===== toFraction() =====")
    log(`toFraction(1)     -> ${toFraction(1)}`);
    log(`toFraction(0.1)   -> ${toFraction(0.1)}`);
    log(`toFraction(1.2)   -> ${toFraction(1.2)}`);
    log(`toFraction(1.5)   -> ${toFraction(1.5)}`);
    log(`toFraction(1.96)  -> ${toFraction(1.96)}`);
    log(`toFraction(1.97)  -> ${toFraction(1.97)}`);
  }


  //change later
  convertToCm() {
    this.cm = Math.round(toDecimal(this.inch) * FACT * 100) / 100;
  }
  
  convertToInch() {
    console.log(this.checkbox, toFraction(this.cm))
    if (this.checkbox == true)
      this.inch = toFraction((this.cm / FACT * 100) / 100, this.base, this.simplified);
    
      else
      this.inch = (Math.round(this.cm / FACT * 100) / 100).toString();
  }

} //closing for app component lol


function gcd(a: number, b: number) {
  a = Math.abs(a);
  b = Math.abs(b);
  if (b > a) {var temp = a; a = b; b = temp;}
  while (true) {
      if (b == 0) return a;
      a %= b;
      if (a == 0) return b;
      b %= a;
  }
}

//this is the thingy for converting fractions lol 
// Convert decimal number to fractional inch with base 16 as string
// The fraction number may have 3 parts: integer, numerator and denominator, “1 2/16”
function toFraction(number: number, base: number = 16, simplified : boolean = false): string {



  // Check if the number is NaN first using isNaN().
  // If so, do nothing and return “NaN”
  if (isNaN(number))
    return "NaN";
  // Extract the integer part using Math.trunc() to a local variable integer
  let integer = Math.trunc(number);

  // Extract the numerator from the decimal part, (number - integer)
  // by multiplying the base 16. The numerator should be an integer as well.


  let numerator = Math.round((number - integer) * base)  //wtf is this again lmao //wait nvm now i understand (kinda)
///

  // If the numerator is 16, then round up the integer by one and
  // set the numerator to 0
  if (numerator == base) {
    integer++;
    numerator = 0;
  }

  // If the numerator is 0, then return the integer only after converting it
  // to a string
  if (numerator == 0) {
    return integer.toString();
  }

  // If the numerator is not 0, then construct the fraction format below
  else {
    //what i dooooo

    // If the integer is 0, then the return string will be numerator + “/” + 16
    if (simplified == true) {
      let a = gcd(numerator, base); //no way is this literal lmao
      if (integer == 0){
        return (numerator + " / " + base) + " = " + (numerator / a + " / " + base / a);
      }
      else {
        return integer + " " + (numerator + " / " + base) + " = " + integer + " " + (numerator / a + " / " + base / a);
      }
    }
    // If the integer is not zero, then the string will be
    // integer + “ “ + numerator + ”/” + 16
    else {
      if (integer == 0){
        return numerator + " / " + base;
      }
      else
      {
        return integer + " " + numerator + "/" + base;
      }
    }
  }
}




// Convert fraction inch to decimal inch
// The possible input are: 1.2, 1/2, 1 2/3
function toDecimal(fractionString: string): number {
  let decimal = 0; // return value


  // Split fractionString by spaces into 2 tokens using regex
  let tokens = fractionString.trim().split(/\s+/);


  // If there is only one token, it contains either a decimal number or
  // fraction number, for example, 1.2, or 1/2
  if (tokens.length == 1) {
    // Split the token by “/” again into 2 parts
    let parts = fractionString.trim().split("/");

    // If there is only 1 part, the string is a decimal number (1.2)
    // Use parseFloat() to convert it to a number
    if (parts.length == 1) {
      decimal = parseFloat(parts[0]);

    }

    // If there are 2 parts, the string is a fraction number (1/2)
    // Parse each part as number, then divide the first part by the second
    else if (parts.length == 2) {
      let partOne = parseFloat(parts[0]);
      let partTwo = parseFloat(parts[1]);

      decimal = partOne / partTwo;

    }
  }

  // If there are 2 tokens, it contains an integer and fraction, e.g. 1 2/3
  else if (tokens.length == 2) {

    // Parse the first token to an int and store it to the return var, decimal
    decimal = parseInt(tokens[0]);

    // Split the second token by “/” into 2 parts again
    // If it cannot be split to 2 parts, it is not a valid fraction format.
    // Skip the following steps, and return only decimal part or NaN.
    let parts = tokens[1].trim().split("/");
    //second token lol


    if (parts.length == 2) {
      // Parse 2 parts to integers and divide them
      // Add the division to number then return it
      let partOne = parseInt(parts[0]);
      let partTwo = parseInt(parts[1]);

      let number = partOne / partTwo;

      decimal += number;


    }
  }
  return decimal;
}
