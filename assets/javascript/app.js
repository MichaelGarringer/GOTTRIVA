$(document).ready(function () {
    var Qs = [
        {
            question: "What is the name of Jon's sword?",
            choice: ["Oathkeeper ", "Needle ", "Ice ", "Longclaw "],
            correctAnswer: 3,
        },
        {
            question: "What is Arya's sister's name?",
            choice: ["Sansa ", "Cersei ", "Yara ", "Catelyn "],
            correctAnswer: 0,
        },
        {
            question: "Who is king immediately after Robert?",
            choice: ["Tommen ", "Theon ", "Jon Snow ", "Joffrey "],
            correctAnswer: 3,
        },
        {
            question: "How many Kingdoms are in Westeros?",
            choice: ["One ", "Three ", "Seven ", "Nine "],
            correctAnswer: 2,
        },
        {
            question: "How is Oberyn killed?",
            choice: ["Hanged ", "Head crushed ", "Stabbed ", "Heart attack "],
            correctAnswer: 1,
        },
        {
            question: "Who is getting married at the Red Wedding?",
            choice: ["Robb Stark ", "Jon Snow ", "Tyrion ", "Jaime "],
            correctAnswer: 0,
        },
        {
            question: "Where is Theon Greyjoy from?",
            choice: ["Winterfell ", "The Iron Islands ", "King's Landing ", "The Riverlands "],
            correctAnswer: 1,
        },
        {
            question: "What is the sigil of House Lannister?",
            choice: ["Hawk ", "Wolf ", "Lion ", "Dog "],
            correctAnswer: 2,
        },
        {
            question: "Who is defeated in the Battle of The Bastards?",
            choice: ["Jon Snow ", "Stannis Baratheon ", "Ramsey Bolton ", "Cersei Lannister "],
            correctAnswer: 2,
        },
        {
            question: "Which one of these is not one of Daenerys' dragons? ",
            choice: ["Drogon ", "Rhaegal ", "Viserion ", "Tyrion "],
            correctAnswer: 3,
        },

    ];


    var correct = 0
    var incorrect = 0;
    var unanswered = 0;
    var timer = 10;
    var intervalId;
    var running = false;
    var playerAnswer = "";
    var qchoice;
    var index;
    var placeholderArray = [];

    //TIMER FUNCTION
    $("#start").on("click", function () {
        $("#start").hide();
        runTimer();
        qDisplay();
        for (var i = 0; i < Qs.length; i++) {
            placeholderArray.push(Qs[i]);
        }
    });

    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 750);
            running = true;
            $("#timeleft").html("Time Remaining for this Question: " + timer);
        }
        function decrement() {
            $("#timeleft").html("Time Remaining for this Question: " + timer);
            timer--;
            if (timer === -1) {
                alert("Time's up!")
                stop();
                $("#adiv").empty()
                $("#qdiv").empty()
                $("#cor").html("Questions correct: " + correct)
                $("#incor").html("Questions incorrect: " + incorrect)
                $("#timeleft").empty()
            }
        }
    }
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //DISPLAY QUESTION and ANSWERS
    function qDisplay() {
        $("#instuctions").empty();
        index = Math.floor(Math.random() * Qs.length);
        qchoice = Qs[index];
        $("#qdiv").html("<h3>" + qchoice.question + "</h3>")
        for (var i = 0; i < qchoice.choice.length; i++) {
            var playerAnswer = $("<div>");
            playerAnswer.addClass("answer");
            playerAnswer.html(qchoice.choice[i]);
            playerAnswer.attr("data-guessvalue", i);
            $("#adiv").append(playerAnswer);


            //How do you make it not repeat questions?
        }
        $(".answer").on("click", function () {
            playerAnswer = parseInt($(this).attr("data-guessvalue"));

            if (playerAnswer === qchoice.correctAnswer) {
                correct++;
                stop();
                playerAnswer = "";
                $("#adiv").html("Correct!");
                qDisplay();
                timer = 10;
                runTimer(); //does timer speed up when you're right or wrong?

            }
            else {
                incorrect++;
                stop();
                playerGuess = "";
                $("#adiv").html("Incorrect!");
                qDisplay();
                timer = 10;
                runTimer(); //does timer speed up when you're right or wrong?

                if ((incorrect + correct) === 10) {
                    stop()
                    alert("Game over!")
                    $("#cor").html("Questions correct: " + correct);
                    $("#incor").html("Questions incorrect: " + incorrect);
                    $("#adiv").empty()
                    $("#qdiv").empty()
                    $("#timeleft").empty()
                    //Start a new game?

                }
            }

        });


    }



})
