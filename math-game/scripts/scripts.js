"use strict";
(function () {
    //get html components
    const questionFrame = document.querySelector(".question");
    const answer1 = document.querySelector("#answer1");
    const answer2 = document.querySelector("#answer2");
    const answer3 = document.querySelector("#answer3");
    const answer4 = document.querySelector("#answer4");
    const answer5 = document.querySelector("#answer5");
    const answer6 = document.querySelector("#answer6");
    const addOnlyCheckbox = document.querySelector("#addOnly");
    const banner = document.querySelector(".banner");
    const button = document.querySelector(".button");

    //store answer positions in array
    var answerArray = [answer1, answer2, answer3, answer4, answer5, answer6];

    //keep track of correct answer value and position
    //var correctAnswer;
    var correctAnswerPosition;
    var questionFinished = false;

    document.onload = newQuestion();

    function newQuestion() {
        questionFinished = false;
        //reset colors
        for (let i = 0; i < answerArray.length; i++) {
            answerArray[i].style.backgroundColor = "white";
            answerArray[i].style.color = "black";
            answerArray[i].style.opacity = "0.5";
        }
        banner.style.display = "none";
        button.style.display = "none";

        //random operator
        let calculation = buildCalculation();

        displayQuestion(calculation);

        //perform calculation
        //correctAnswer = calculation.answer;

        //choose correct answer position
        correctAnswerPosition = Math.floor(Math.random() * 6);
        answerArray[correctAnswerPosition].textContent = calculation.answer;

        //fill in other answer spots with wrong answers
        fillOtherAnswers(calculation);
    }

    function buildCalculation() {
        
        //get random operator
        let randOperator = Math.floor(Math.random() * 4 + 1);

        //if addonly is checked, force operator to +
        if(addOnlyCheckbox.checked) {
            randOperator = 1;
        }

        //random operands
        var left = Math.floor(Math.random() * 12 + 1);
        var right = Math.floor(Math.random() * 12 + 1);

        //if division, make sure it divides evenly
        if(randOperator == 4) {
            while(left % right != 0) {
                left = Math.floor(Math.random() * 12 + 1);
                right = Math.floor(Math.random() * 12 + 1);
            }
        }

        switch(randOperator) {
            case 1: return {operator: "+", answer: left + right, left: left, right: right};
            case 2: if(left >= right) {
                        return {operator: "-", answer: left - right, left: left, right: right};
                    } else {
                        return {operator: "-", answer: right - left, left: left, right: right};
                    }
            case 3: return {operator: "x", answer: left * right, left: left, right: right};
            case 4: return {operator: "/", answer: left / right, left: left, right: right};
            default: return {operator: "+", answer: left + right, left: left, right: right};
        }
    }

    function displayQuestion(calc) {
        //display question
        if(calc.operator == "-") {
            if(calc.left >= calc.right) {
                questionFrame.textContent = calc.left + " " + calc.operator + " " + calc.right + " = ?";
            } else {
                questionFrame.textContent = calc.right + " " + calc.operator + " " + calc.left + " = ?";
            }
        } else {
            questionFrame.textContent = calc.left + " " + calc.operator + " " + calc.right + " = ?";
}
    }

    function fillOtherAnswers(calc) {
        var prevWrongAnswers = [];
        var maxAnswerValue = 24;
        var minAnswerValue = 1;
        switch(calc.operator) {
            case "+": maxAnswerValue = calc.answer + 10;
                minAnswerValue = calc.answer - 10;
                break;
            case "-": maxAnswerValue = calc.answer + 5;
                minAnswerValue = calc.answer - 5;
                break;
            case "x": maxAnswerValue = calc.answer + 10;
                minAnswerValue = calc.answer - 10;
                break;
            case "/": maxAnswerValue = calc.answer + 10;
                minAnswerValue = calc.answer - 10;
                break;
            default: maxAnswerValue = calc.answer + 10;
                minAnswerValue = calc.answer - 10;
        }

        for(let i = 0; i < answerArray.length; i++) {
            if (i == correctAnswerPosition) {
                continue; //skip if it's the right answer position
            }
            else {
                //find random wrong answer
                var rand = 0;
                do {
                    rand = Math.floor(Math.random() * maxAnswerValue + 1);
                } while (rand == calc.answer || prevWrongAnswers.includes(rand)
                        ||  rand < minAnswerValue);

                //display and store wrong answer
                answerArray[i].textContent = rand;
                prevWrongAnswers.push(rand);
            }
        }
    }

    function clicked(buttonNum) {
        if (questionFinished) {
            return; //no clicky after question is finished
        }
        //correct answer
        if (buttonNum == correctAnswerPosition) {
            //set background to green
            answerArray[buttonNum].style.backgroundColor = "limegreen";
            answerArray[buttonNum].style.opacity = ".7";

            //show success banner and new button
            banner.style.display = "inline";
            button.style.display = "inline";
            questionFinished = true;

        } else { //incorrect answer
            //set background to red
            answerArray[buttonNum].style.backgroundColor = "gray";
            answerArray[buttonNum].style.opacity = ".7";
            var temp = answerArray[buttonNum].textContent;
            answerArray[buttonNum].innerHTML = "<strike> " + temp + " </strike>";
        }
    }

    answer1.addEventListener("click", () => { clicked(0); }, false);
    answer2.addEventListener("click", () => { clicked(1); }, false);
    answer3.addEventListener("click", () => { clicked(2); }, false);
    answer4.addEventListener("click", () => { clicked(3); }, false);
    answer5.addEventListener("click", () => { clicked(4); }, false);
    answer6.addEventListener("click", () => { clicked(5); }, false);
    button.addEventListener("click", () => { newQuestion(); }, false);
}());
