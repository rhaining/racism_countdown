
var racismCounterElt, racismProgressElt, racismTimerElt, racismCalendarElt, racismStatusElt, questionElt;
var racismQuestionCount = 0;
var secondsUntilRacist = 0;
var secondsInAYear = 31540000;
var secondsInAMonth = 2592000;
var secondsInAWeek = 604800;
var secondsInADay = 86400;
var secondsInAHour = 3600;
var secondsInAMinute = 60;
var questionIndex = 0;
var racismRelativeTimeIntervalId = 0;

var clock;


function setupRacismTimer(racismCounterId, racismProgressId, racismTimerId, racismCalendarId, racismStatusId, questionId){
	racismCounterElt = document.getElementById(racismCounterId);
	racismProgressElt = document.getElementById(racismProgressId);
	racismTimerElt = document.getElementById(racismTimerId);
	racismCalendarElt = document.getElementById(racismCalendarId);
	racismStatusElt = document.getElementById(racismStatusId);
	questionElt = document.getElementById(questionId);

	var yearsUntilRacist = getRandomInt(45,75);
	secondsUntilRacist = yearsUntilRacist * secondsInAYear;


	clock = $('.clock').FlipClock(secondsUntilRacist, {
		clockFace: 'DailyCounter',
		countdown: true
	});

	updateRacismCounter();
	updateRacismRelativeTime();
	racismRelativeTimeIntervalId = setInterval( function(){ updateRacismRelativeTime(); }, 1000);

	updateQuestion();





}
function updateQuestion(){
	var question = questions[questionIndex];
	document.getElementById("question").innerHTML = question["question"];
	var answersBuffer = '';
	for(var i=0; i < question["answers"].length; i++){
		var answer = question["answers"][i];
		var imageBuffer = '';
		if(question["images"]){
			var imageURL = question["images"][i];
			imageBuffer = "<img src='images/" + imageURL + "'/> ";
		}
		answersBuffer += "<div class='answer'><input type='radio' name='question' id='ans" + i 
						+ "' onclick='goRacism();'/><label for='ans" + i + "'><div>" 
						+ imageBuffer + "</div><div>" + answer + "</div></label></div>";
	}

	var answersElt = document.getElementById("answers");
	answersElt.innerHTML = answersBuffer;

	questionIndex++;
}

function updateRacismCounter(){
	

	racismCounterElt.innerHTML = racismQuestionCount+1;
	racismProgressElt.value = racismQuestionCount+1;

	if(racismQuestionCount >= 6){
		// questionElt.style.display = 'none';
		document.getElementById("racism_counter_wrapper").style.display = 'none';
		questionElt.innerHTML = "sorry you're about to be racist";
		racismCounterElt.innerHTML = 6;
		displayArticles();
	}

	racismCalendarElt.innerHTML = currentRacismDate();
	clock.setTime(secondsUntilRacist);
}

function updateRacismRelativeTime(){
	if(secondsUntilRacist <= 0){
		secondsUntilRacist = 0;
		clearInterval(racismRelativeTimeIntervalId);
	}

	var seconds = secondsUntilRacist;

	var shouldHighlight = false;
	var buffer = '';
	var years = Math.floor(seconds / secondsInAYear);
	if(shouldHighlight || years > 0){
		buffer += '<span class="highlight">';
		shouldHighlight = true;
	}else{
		buffer += '<span>';
	}
	buffer += years + ' years, </span>';
	seconds %= secondsInAYear;

	var months = Math.floor(seconds / secondsInAMonth);
	if(shouldHighlight || months > 0){
		buffer += '<span class="highlight">';
		shouldHighlight = true;
	}else{
		buffer += '<span>';
	}
	buffer += months + ' months, </span>';
	seconds %= secondsInAMonth;

	var weeks = Math.floor(seconds / secondsInAWeek);
	if(shouldHighlight || weeks > 0){
		buffer += '<span class="highlight">';
		shouldHighlight = true;
	}else{
		buffer += '<span>';
	}
	buffer += weeks + ' weeks, </span>';
	seconds %= secondsInAWeek;

	var days = Math.floor(seconds / secondsInADay);
	if(shouldHighlight || days > 0){
		buffer += '<span class="highlight">';
		shouldHighlight = true;
	}else{
		buffer += '<span>';
	}
	buffer += days + ' days, </span>';
	seconds %= secondsInADay;

	var hours = Math.floor(seconds / secondsInAHour);
	if(shouldHighlight || hours > 0){
		buffer += '<span class="highlight">';
		shouldHighlight = true;
	}else{
		buffer += '<span>';
	}
	buffer += hours + ' hours, </span>';
	seconds %= secondsInAHour;

	var minutes = Math.floor(seconds / secondsInAMinute);
	if(shouldHighlight || minutes > 0){
		buffer += '<span class="highlight">';
		shouldHighlight = true;
	}else{
		buffer += '<span>';
	}
	buffer += minutes + ' minutes, </span>';
	seconds %= secondsInAMinute;

	var seconds = Math.floor(seconds);
	if(shouldHighlight || seconds > 0){
		buffer += '<span class="highlight">';
		shouldHighlight = true;
	}else{
		buffer += '<span>';
	}
	buffer += seconds + ' seconds</span>';

	racismTimerElt.innerHTML = buffer;

	secondsUntilRacist--;
}

function goRacism(){
	racismQuestionCount++;

	if(racismQuestionCount == 6 && false){
		secondsUntilRacist = 0;
	}else{
		var minPercent, maxPercent, multiplier;
		if(racismQuestionCount == 2){
			minPercent = 0.5;
			maxPercent = 0.75;
			multiplier = 1;
		}else{
			minPercent = 0.96;
			maxPercent = 0.98;
			multiplier = -1;
		}
		var randomPercent = getRandomArbitary(minPercent,maxPercent);
		secondsUntilRacist += multiplier * (secondsUntilRacist * randomPercent);
	}
	updateRacismRelativeTime();
	updateRacismCounter();
	updateQuestion();
	updateRacialStatus();
}

function updateRacialStatus(){

	var level = getRandomInt(1,6);
	switch(level){
		case 0:
			setRacialStatus("Sorry, you're already racist");
			break;
		case 1:
			setRacialStatus("Please don't ever come by again");
			break;
		case 2:
			setRacialStatus("Do you hate all races or just one?");
			break;
		case 3:
			setRacialStatus("Paula Deen called, she wants to chat");
			break;
		case 4:
			setRacialStatus("Have you or any members of your family been a member of the KKK or Boko Haram?");
			break;
		case 5:
			setRacialStatus("Why are you even taking this quiz");
			break;
		case 6:
			setRacialStatus("Watch more racially diverse movies");
			break;
		default:
			break;
	}
}
function setRacialStatus(status){
	racismStatusElt.innerHTML = status;
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}


function setupCurrentTime(timeId){
	var timeElt = document.getElementById(timeId);
	var d = new Date();

	timeElt.innerHTML = readableTimeForDate(d);
}

function readableTimeForDate(d){
		var curr_hour = d.getHours();
	var curr_min = d.getMinutes();
	
	if(curr_min < 10){
		curr_min = "0" + curr_min;
	}

	var meridian = "am";
	if(curr_hour == 0){
		curr_hour = 12;
	}else if(curr_hour >= 12){
		meridian = "pm";
		if(curr_hour > 12){
			curr_hour %= 12;
		}
	}
	return curr_hour + ":" + curr_min + meridian;
}

function currentRacismDate(){
	var dt = new Date();
	var dateInSeconds = dt.getTime();
	dateInSeconds += secondsUntilRacist * 1000;
	dt.setTime(dateInSeconds);

	var currentDate = new Date();

	var readableDay;

	if(currentDate.getMonth() == dt.getMonth() 
		&& currentDate.getFullYear() == dt.getFullYear()
		&& currentDate.getDate() == dt.getDate()){
		readableDay = "today";
	}else if(currentDate.getMonth() == dt.getMonth() 
		&& currentDate.getFullYear() == dt.getFullYear() 
		&& currentDate.getDate()+1 == dt.getDate()){
		readableDay = "tomorrow";
	}else{
		var month = readableMonth(dt.getMonth());
		var day = dt.getDate();
		var year = dt.getFullYear();

		readableDay = month + ' ' + day + ', ' + year;
	}

	var time = readableTimeForDate(dt);
	var retval = readableDay + ' at ' + time;
	return retval;
}

function readableMonth(monthValue){
	switch(monthValue){
		case 0: return "January";
		case 1: return "February";
		case 2: return "March";
		case 3: return "April";
		case 4: return "May";
		case 5: return "June";
		case 6: return "July";
		case 7: return "August";
		case 8: return "September";
		case 9: return "October";
		case 10: return "November";
		case 11: return "December";
	}
}

function displayArticles(){
	var articlesWrapperElt = document.getElementById("articles_wrapper");
	articlesWrapperElt.style.display = "inherit";
	
	var tribuneArticlesElt = document.getElementById("articles_tribune");
	addArticlesToElt(articles_tribune, tribuneArticlesElt);
	
	var redditArticlesElt = document.getElementById("articles_reddit");
	addArticlesToElt(articles_reddit, redditArticlesElt);
}
function addArticlesToElt(articles, articlesElt){
	var buffer = '<ul>';
	for(var i=0; i < articles.length; i++){
		var article = articles[i]["title"];
		var href = article["href"];
		var text = article["text"];
		var row = "<li><a class='article_link' href='" + href + "' target='_blank' onclick='didReadArticle();'>" + text + "</a></li>";
		buffer += row;
	}
	buffer += '</ul';
	articlesElt.innerHTML = buffer;
}

function didReadArticle () {
	var hours = getRandomArbitary(0,24);
	secondsUntilRacist += Math.floor(hours * 3600);
}





