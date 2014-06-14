
var racismCounterElt, racismTimerElt, racismCalendarElt, racismStatusElt, questionElt;
var racismQuestionCount = 0;
var secondsUntilRacist = 0;
var secondsInAYear = 31540000;
var secondsInAMonth = 2592000;
var secondsInAWeek = 604800;
var secondsInADay = 86400;
var secondsInAHour = 3600;
var secondsInAMinute = 60;
var questionIndex = 0;

function setupRacismTimer(racismCounterId, racismTimerId, racismCalendarId, racismStatusId, questionId){
	racismCounterElt = document.getElementById(racismCounterId);
	racismTimerElt = document.getElementById(racismTimerId);
	racismCalendarElt = document.getElementById(racismCalendarId);
	racismStatusElt = document.getElementById(racismStatusId);
	questionElt = document.getElementById(questionId);

	var yearsUntilRacist = getRandomInt(45,75);
	secondsUntilRacist = yearsUntilRacist * secondsInAYear;

	updateRacismCounter();

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
		answersBuffer += "<input type='radio' name='question' onclick='goRacism();'/> " + imageBuffer + answer + "<br/>";
	}

	var answersElt = document.getElementById("answers");
	answersElt.innerHTML = answersBuffer;

	questionIndex++;
}

function updateRacismCounter(){
	var value, label, level;
	if(secondsUntilRacist > secondsInAYear){
		value = secondsUntilRacist / secondsInAYear;
		label = "years";
		level= (secondsUntilRacist > secondsInAYear * 20) ? 7 : 6;
	}else if(secondsUntilRacist > secondsInAMonth){
		value = secondsUntilRacist / secondsInAMonth;
		label = "months";
		level = 6;
	}else if(secondsUntilRacist > secondsInAWeek){
		value = secondsUntilRacist / secondsInAWeek;
		label = "weeks";
		level = 5;
	}else if(secondsUntilRacist > secondsInADay){
		value = secondsUntilRacist / secondsInADay;
		label = "days";
		level = 4;
	}else if(secondsUntilRacist > secondsInAHour){
		value = secondsUntilRacist / secondsInAHour;
		label = "hours";
		level = 3;
	}else if(secondsUntilRacist > secondsInAMinute){
		value = secondsUntilRacist / secondsInAMinute;
		label = "minutes";
		level = 2;
	}else if(secondsUntilRacist > 0){
		value = secondsUntilRacist;
		label = "seconds";
		level=1;
	}else if(secondsUntilRacist <= 0){
		value = "0";
		label = "seconds";
		level=0;
	}

	value = Math.round(value * 10) / 10;
	racismTimerElt.innerHTML = "You have <span class='highlight'>" + value + " " + label + "</span> until you're racist";		
	updateRacialStatus(level);

	racismCounterElt.innerHTML = racismQuestionCount+1;

	if(racismQuestionCount >= 6){
		// questionElt.style.display = 'none';
		questionElt.innerHTML = "game over";
		racismCounterElt.innerHTML = 6;
		displayArticles();
	}

	racismCalendarElt.innerHTML = currentRacismDate();
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
	updateRacismCounter();
	updateQuestion();
}

function updateRacialStatus(level){
	if(level == 7){ return; }

	level = getRandomInt(1,6);
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
		// case 7:
			//setRacialStatus("Post Racial");
			// break;
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
	var articlesElt = document.getElementById("articles");
	var buffer = '';
	for(var i=0; i < articles.length; i++){
		var article = articles[i]["title"];
		var href = article["href"];
		var text = article["text"];
		var row = "<a href='" + href + "'>" + text + "</a><br/>";
		buffer += row;
	}
	articlesElt.innerHTML = buffer;
}


/////// data

var questions = [
/*
  {
    "id":1,
    "question":"How many friends do you have of a different race?",
    "answers" : [
      "0", "1-10", "11-1000", "prefer not to answer"
    ]
  },
  */
/*
  {
    "id":2,
    "question":"What is your age?",
    "answers" : [
      "0-18", "19-34", "35-60", "61-114"
    ],
    "images" : [
      "shirleytemple.gif", "aubreyplaza.gif", "billmurray.gif", "beaarthur.gif"
    ]
  },
  */
    {
    "id":9,
    "question":"Who do you most look up to?",
    "answers" : [
      "Donald Sterling", "Paula Deen", "Jeremiah Wright", "Justin Bieber"
    ],
    "images" : [
      "donaldsterling.gif", "pauladeen.gif", "jeremiahwright.gif", "justinbieber.gif"
    ]
  },
  {
    "id":3,
    "question":"Which cartoon character would win in a fight?",
    "answers" : [
      "Mickey Mouse", "Superman", "Rainbow Brite", "Daffy Duck"
    ],
    "images" : [
      "mickeymouse.gif", "superman.gif", "rainbowbrite.gif", "daffyduck.gif"
    ]
  },
 {
    "id":4,
    "question":"Which of these words is most racist?",
    "answers" : [
      "Wizard of Oz", "Parking Lot", "Light Bulb", "Centennial"
    ],
    "images" : [
      "wizardofoz.gif", "parkinglot.gif", "lightbulb.gif", "centennial.gif"
    ]
  },

  {
    "id":7,
    "question":"Who do you most identify with?",
    "answers" : [
      "Dr Phil", "Oprah", "Goofy"
    ],
    "images" : [
      "drphil.gif", "oprah.gif", "goofy.gif"
    ]
  },
  /*
  {
    "id":5,
    "question":"Which backstreet boy are you? (Link to quiz if you need help)",
    "answers" : [
      "AJ", "Howie", "Nick", "Kevin", "Brian"
    ]
  },
*/
  {
    "id":8,
    "question":"Are you racist?",
    "answers" : [
      "Yes", "No"
    ],
    "images" : [
      "yes.gif", "no.gif"
    ]
  },

  
    {
    "id":6,
    "question":"You see a trolley barrelling down a hill. There are 5 Native Americans tied to the tracks. If you pull a lever, the trolley will change tracks and run over a Latina woman instead. What do you do?",
    "answers" : [
      "Pull the lever and murder the Latina woman",
      "Don't touch the lever and murder the Native Americans"
    ],
    "images" : [
      "sofiavergara.gif", "nativeamerican.gif"
    ]
  }
]




var articles = [
      {
        "title": {
          "text": "Probate trial set for Donald Sterling",
          "href": "http://www.chicagotribune.com/sports/basketball/bulls/chi-trial-will-decide-which-sterling-controls-la-clippers-20140611,0,4249248.story"
        }
      },
      {
        "title": {
          "text": "Paula Deen launching online cooking network",
          "href": "http://www.chicagotribune.com/features/food/chi-paula-deen-network-online-20140611,0,2240994.story"
        }
      },
      {
        "title": {
          "text": "Where are players in George Zimmerman trial, a year later?",
          "href": "http://www.chicagotribune.com/news/ch-george-zimmerman-trial-one-year-later-20140607,0,3489606.story"
        }
      },
      {
        "title": {
          "text": "Tinley Park police reports: Man punched for aiding woman",
          "href": "http://www.chicagotribune.com/news/local/suburbs/tinley_park/ct-police-blotter-tinley-park-tl-s-xxxx-20140603-21,0,2378976.story"
        }
      },
      {
        "title": {
          "text": "Teacher's lesson about racism offends his bosses",
          "href": "http://www.chicagotribune.com/news/columnists/kass/ct-kass-met-0605-20140605,0,7689455.column"
        }
      },
      {
        "title": {
          "text": "Donald Sterling accused of racist, sexist remarks in new lawsuit",
          "href": "http://www.chicagotribune.com/sports/basketball/bulls/chi-donald-sterling-accused-of-racist-sexist-remarks-20140603,0,3203338.story"
        }
      },
      {
        "title": {
          "text": "Clippers owner Donald Sterling will sue NBA for $1 billion",
          "href": "http://www.chicagotribune.com/news/chi-clippers-donald-sterling-sues-nba-20140530,0,5041780.story"
        }
      },
      {
        "title": {
          "text": "Donald Sterling plans to sue the NBA",
          "href": "http://www.chicagotribune.com/sports/basketball/bulls/chi-donald-sterling-sue-nba-20140530,0,600145.story"
        }
      },
      {
        "title": {
          "text": "Meet the black officer who went undercover as a KKK member",
          "href": "http://www.chicagotribune.com/news/plus/chi-wp-theroot-black-officer-kkk-20140523,0,7002089.story"
        }
      },
      {
        "title": {
          "text": "Donald Sterling hands over control of Clippers to wife: reports",
          "href": "http://www.chicagotribune.com/news/chi-donald-sterling-clippers-20140523,0,5856995.story"
        }
      },
      {
        "title": {
          "text": "Redskins president Allen defends team name",
          "href": "http://www.chicagotribune.com/sports/football/bears/chi-redskins-president-defends-name-20140524,0,5955549.story"
        }
      }
    ];
