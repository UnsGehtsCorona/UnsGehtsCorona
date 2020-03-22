
let questionNumber = 0;
let questionElements = document.querySelectorAll("div[id^='frage']");
let questionCount = questionElements.length;

function nextQuestion() {
	questionElements[questionNumber].classList.add("hidden");

	if(questionNumber + 1 >= questionCount) return;

	questionNumber++;

	clearCursors();	
	
	questionElements[questionNumber].classList.remove("hidden");
}
