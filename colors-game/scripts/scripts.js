(function () {
    const questionFrame = document.querySelector(".question");
    const colorSquare = document.querySelector(".color-circle");
    const langBox = document.querySelector(".lang_box");
    const answer1 = document.querySelector(".answer1");
    const answer2 = document.querySelector(".answer2");
    const answer3 = document.querySelector(".answer3");
    // Get the modal
    const modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    var Questions = new Array;
    var selectedQuestion;
    var correctAnswer;
    var mode = "english";

    document.onload = loadData();

    function loadData() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                getQuestions(this);
                newQuestion();
            }
        };
        xhttp.open("GET", "xml/data.xml", true);
        xhttp.send();
        langBox.checked = true;
    }

    function getQuestions(xml) {
        var xmlDoc = xml.responseXML;
        var colors = xmlDoc.getElementsByTagName("color");
        var english = xmlDoc.getElementsByTagName("english");
        var spanish = xmlDoc.getElementsByTagName("spanish");
        for (var i = 0; i < colors.length; i++) {
            Questions[i] = {
                color: colors[i].childNodes[0].nodeValue,
                english: english[i].childNodes[0].nodeValue,
                spanish: spanish[i].childNodes[0].nodeValue
            };
        }
    }

    function newQuestion() {
        //reset colors
        answer1.style.backgroundColor = "transparent";
        answer2.style.backgroundColor = "transparent";
        answer3.style.backgroundColor = "transparent";
        answer1.style.color = "black";
        answer2.style.color = "black";
        answer3.style.color = "black";

        //question text depends on mode
        if (mode == "english") {
            questionFrame.textContent = "What color is this?";
            document.querySelector(".span_label").textContent = "Spanish";
            document.querySelector(".eng_label").textContent = "English";
        } else {
            questionFrame.textContent = "¿Que color es este?";
            document.querySelector(".span_label").textContent = "Español";
            document.querySelector(".eng_label").textContent = "Inglés";
        }

        //get random question
        var rand = Math.floor(Math.random() * Questions.length);
        selectedQuestion = Questions[rand];
        //set background color
        colorSquare.style.backgroundColor = selectedQuestion.color;

        //choose correct answer position
        rand = Math.floor(Math.random() * 3 + 1);
        correctAnswer = rand;
        switch (correctAnswer) {
            case 1:
                mode == "english" ? answer1.textContent = selectedQuestion.english : answer1.textContent = selectedQuestion.spanish;
                break;
            case 2:
                mode == "english" ? answer2.textContent = selectedQuestion.english : answer2.textContent = selectedQuestion.spanish;
                break;
            case 3:
                mode == "english" ? answer3.textContent = selectedQuestion.english : answer3.textContent = selectedQuestion.spanish;
                break;
        }
        //fill in other answer spots with wrong answers
        fillOtherAnswers();
    }

    function fillOtherAnswers() {
        var count = 0;
        //for no duplicates
        var prevWrongAnswer = correctAnswer;
        while (count < 2) {
            //pick random position
            var rand = Math.floor(Math.random() * Questions.length);
            if (Questions[rand] == selectedQuestion) {
                continue;
            }
            switch (correctAnswer) {
                case 1:
                    if (rand == prevWrongAnswer) {
                        continue;
                    }
                    if (count == 0) {
                        mode == "english" ? answer2.textContent = Questions[rand].english : answer2.textContent = Questions[rand].spanish;
                        prevWrongAnswer = rand;
                    } else if (count == 1) {
                        mode == "english" ? answer3.textContent = Questions[rand].english : answer3.textContent = Questions[rand].spanish;
                    }
                    count++;
                    break;
                case 2:
                    if (rand == prevWrongAnswer) {
                        continue;
                    }
                    if (count == 0) {
                        mode == "english" ? answer1.textContent = Questions[rand].english : answer1.textContent = Questions[rand].spanish;
                        prevWrongAnswer = rand;
                    } else if (count == 1) {
                        mode == "english" ? answer3.textContent = Questions[rand].english : answer3.textContent = Questions[rand].spanish;
                    }
                    count++;
                    break;
                case 3:
                    if (rand == prevWrongAnswer) {
                        continue;
                    }
                    if (count == 0) {
                        mode == "english" ? answer1.textContent = Questions[rand].english : answer1.textContent = Questions[rand].spanish;
                        prevWrongAnswer = rand;
                    } else if (count == 1) {
                        mode == "english" ? answer2.textContent = Questions[rand].english : answer2.textContent = Questions[rand].spanish;
                    }
                    count++;
                    break;
                default:

            }
        }
    }

    function isCorrect(clickedAnswer) {

        if (clickedAnswer == correctAnswer) {
            switch (correctAnswer) {
                case 1:
                    answer1.style.backgroundColor = selectedQuestion.color;
                    selectedQuestion.color == "#000000" ? answer1.style.color = "#FFFFFF" : answer1.style.color = "#000000";
                    break;
                case 2:
                    answer2.style.backgroundColor = selectedQuestion.color;
                    selectedQuestion.color == "#000000" ? answer2.style.color = "#FFFFFF" : answer2.style.color = "#000000";
                    break;
                case 3:
                    answer3.style.backgroundColor = selectedQuestion.color;
                    selectedQuestion.color == "#000000" ? answer3.style.color = "#FFFFFF" : answer3.style.color = "#000000";
                    break;
            }
            var millisecondsToWait = 200;
            setTimeout(function () {
                if (clickedAnswer == correctAnswer) {
                    //alert("You got it!");
                    modal.style.display = "block";
                } else {
                    //alert("Wrong answer, better luck next time!");
                }
            }, millisecondsToWait);

            // millisecondsToWait = 1000;
            // setTimeout(function () {
            //     newQuestion();
            // }, millisecondsToWait);
        } else {
            switch (clickedAnswer) {
                case 1:
                    if (clickedAnswer != correctAnswer) {
                        answer1.style.backgroundColor = "gray";
                        var temp = answer1.textContent;
                        answer1.innerHTML = "<strike>" + temp + "</strike>";
                    }
                    break;
                case 2:
                    if (clickedAnswer != correctAnswer) {
                        answer2.style.backgroundColor = "gray";
                        var temp = answer2.textContent;
                        answer2.innerHTML = "<strike>" + temp + "</strike>";
                    }
                    break;
                case 3:
                    if (clickedAnswer != correctAnswer) {
                        answer3.style.backgroundColor = "gray";
                        var temp = answer3.textContent;
                        answer3.innerHTML = "<strike>" + temp + "</strike>";
                    }
                    break;
            }
        }
    }

    function clicked(buttonName) {
        switch (buttonName) {
            case "answer1":
                isCorrect(1);
                break;
            case "answer2":
                isCorrect(2);
                break;
            case "answer3":
                isCorrect(3);
                break;
            default:
                alert("Invalid Answer");
        }
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        newQuestion();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            newQuestion();
        }
    }

    answer1.addEventListener("click", () => { clicked("answer1"); }, false);
    answer2.addEventListener("click", () => { clicked("answer2"); }, false);
    answer3.addEventListener("click", () => { clicked("answer3"); }, false);
    langBox.addEventListener("change", () => { langBox.checked ? mode = "english" : mode = "spanish"; newQuestion(); }, false);
})();