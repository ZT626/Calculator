const display = {
  small: document.querySelector(".small-operations"),
  big: document.querySelector(".big-operations"),
  error: document.querySelector(".error-operations"),
};

const buttons = {
  macro: {
    function: document.querySelectorAll(".functions"),
    operators: document.querySelectorAll(".operator"),
    numbers: document.querySelectorAll(".number"),
  },
  functions: {
    clear: document.getElementById("clear"),
    inverse: document.getElementById("changevalue"),
    hundreth: document.getElementById("dividehundred"),
  },
  numbers: {
    point: document.getElementById("point"),
    zero: document.getElementById("zero"),
    one: document.getElementById("one"),
    two: document.getElementById("two"),
    three: document.getElementById("three"),
    four: document.getElementById("four"),
    five: document.getElementById("five"),
    six: document.getElementById("six"),
    seven: document.getElementById("seven"),
    eight: document.getElementById("eight"),
    nine: document.getElementById("nine"),
  },
  operators: {
    divide: document.getElementById("divide"),
    multiplication: document.getElementById("times"),
    minus: document.getElementById("minus"),
    plus: document.getElementById("plus"),
    equals: document.getElementById("equals"),
  },
};

let a, b, operator;
/*
          1. Take the number from the display and assign it to a variable (a or b) wait for both to be assigned!
          2. If there is a number stored in (b) then work out then set b to null
          3. the worked out should be assigned to a and then wait for the next
  */

/*
          chooses a number
          chooses a operator
          chooses a second number
          if operator or equal pressed
          works out the value
          then waits for second number to process if
  */

/**
 * * initial reset function and initial initalisation
 */

function initialise() {
  a = null;
  b = null;
  operator = null;

  display.big.style.fontSize = "48px";
  display.big.textContent = 0;
  display.small.textContent = "";
  display.error.textContent = "";
}

initialise();

/**
 * * Event listeners for numbers
 */

buttons.macro.numbers.forEach((button) => {
  button.addEventListener("click", (e) => {
    let checker = true;
    if (e.target.textContent === ".") {
      if (display.big.textContent.includes(".")) {
        checker = false;
      }
    }

    if (
      parseFloat(display.big.textContent) === 0 &&
      e.target.textContent !== "." &&
      display.big.textContent.startsWith("0.") === false
    ) {
      display.big.textContent = "";
    }

    if (checker) {
      display.big.textContent += e.target.textContent;
    }
  });
});

/**
 * * Event listeners for functions
 */

buttons.macro.function.forEach((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.textContent) {
      case "AC":
        initialise();
        break;
      case "+/-":
        if (parseFloat(display.big.textContent) == 0) {
          display.error.style.color = "green";
          display.error.textContent =
            "Hot Tip: 0 is nothing so it cant be + or - dummy";

          setTimeout(() => {
            display.error.style.color = "#ff5959";
            display.error.textContent = "";
          }, 800);
          break;
        }

        let inverseContent = display.big.textContent;
        if (inverseContent.includes("-")) {
          inverseContent = inverseContent.split("");
          inverseContent.shift();
          inverseContent = inverseContent.join(""); // Join the array back into a string
        } else {
          inverseContent = "-" + inverseContent;
        }

        console.log(inverseContent);
        display.big.textContent = inverseContent;
        break;
      case "%":
        displayValue = parseFloat(display.big.textContent);
        displayValue = displayValue / 100;
        display.big.textContent = displayValue;
    }
  });
});

/**
 * * Event listeners for operators
 */

buttons.macro.operators.forEach((button) => {
  button.addEventListener("click", (e) => {
    let displayValue = display.big.textContent;
    /**
     * ? is there already a operator, is this display val (a)? or (b)
     * ? and how to compute if any of the others are pressed.
     *
     * ? at the end it should put (a) = answer and b null and then Operator changes to this operator
     */
    if (e.target.textContent === "=") {
      console.log("1");

      if (a !== null && operator !== null) {
        b = parseFloat(displayValue);

        let result = calculations(a, b, operator);
        display.small.textContent = `${a} ${operator} ${b} =`;
        display.big.textContent = result;

        a = result;
        b = null;
        operator = null;
      } else {
        console.log("2");
        a = parseFloat(display.big.textContent);
        display.small.textContent = `${a} =`;
      }
    }

    if (e.target.textContent !== "=") {
      if (a !== null && operator !== null) {
        console.log("3");
        b = parseFloat(displayValue);
        let result = calculations(a, b, e.target.textContent);

        // this is irrelevant change but it helps me flow with the code better
        display.small.textContent = `${a} ${operator} ${b} =`;
        display.big.textContent = result;

        a = result;
        b = null;
        operator = e.target.textContent;
        display.small.textContent = `${a} ${operator}`;
        display.big.textContent = 0
      } else {
        console.log("4");
        a = parseFloat(displayValue);
        operator = e.target.textContent;
        display.small.textContent = `${a} ${operator}`;
        display.big.textContent = 0;
      }
    }
  });
});

/**
 * * Helper functions
 */

function calculations(a, b, operation) {
  //jus in case ik myself too well
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operation) {
    case "+":
      return a + b;
      break;
    case "-":
      return a - b;
      break;
    case "*":
      return a * b;
      break;
    case "/":
      return a / b;
      break;
  }
}


// a cool little delete last function that will never eva be used lol
function supaSecretDel () {
    console.log('IF YOUR SEEING THIS IN YOUR CONSOLE YOU FOUND THE SECRET MUJJAJAJA')
    let displayVal = display.big.textContent 
    displayVal = displayVal.split('')
    displayVal.pop()
    displayVal = display.join('')
    display.big.textContent = displayVal
}