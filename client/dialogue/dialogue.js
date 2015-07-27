Template.dialogue.events({
	'click button#speaker-turn': function(event){
		if ($('#speaker-turn').html()=="start") {
			$('#speaker-turn').html('stop');
			startDictation(event);
		} else {
			$('#speaker-turn').html('start');
			recognition.stop();
			recognizing=false;
			/*
			var user_utterance = final_span.innerHTML;
			user_utterance = user_utterance.substring(0,user_utterance.indexOf(' --'));
			handle_user_input(user_utterance);
			var response = "You just said "+user_utterance;
			say(response);
			handle_user_input(user_utterance.toLowerCase());
			*/
		}

	}
	
})

function say(text){
	recognition.onend = function(){console.log("recognition is stopped"); sayitnow(text);};
	console.log("stopping recognition");
	recognition.stop();
}
	
	function sayitnow(text){
	console.log("starting to talk");
	var msg = new SpeechSynthesisUtterance(text+".  What shall I do next?");
	msg.onend = function(event){
		console.log("speech over"+ "said '"+msg.text+"' .... starting recognition!"); 
		final_transcript = '';
		recognition.start();};
	window.speechSynthesis.speak(msg);
}

var i = 0;

function handle_user_input(u){
	var responded = false;
	console.log("hui: "+u);
	u = u.toLowerCase();
	if (u.indexOf("next")>-1) {
		if (i < numbers.length){
			console.log("saying "+i+"th number");
			say(numbers[i++]);
		} else {
			say("there are no more numbers")
		};

		responded = true;
	} else if (u.indexOf("stop")> -1) {
		say("OK!  We're done here!");
		responded = true;
	} else if (u.indexOf("repeat")>-1){
		say(numbers[i-1]);	
		responded = true;
	}
}

var final_transcript = '';
var recognizing = false;

var numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
var position = 0;

if ('webkitSpeechRecognition' in window) {
	console.log("webkit is available!");
	var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
      recognizing = true;
    };

    recognition.onerror = function(event) {
      console.log(event.error);
    };

    recognition.onend = function() {
      recognizing = false;
    };

    recognition.onresult = function(event) {
		myevent = event;
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
		  console.log("i="+i+" words="+words);
		var words = event.results[i][0].transcript;
		if (words.includes("stop dictation")) {
			recognition.stop();
		} else if (words.includes("read it back")){
			var msg = new SpeechSynthesisUtterance(words);
			window.speechSynthesis.speak(msg);
		}
        if (event.results[i].isFinal) {
        	console.log("final result is |"+event.results[i][0].transcript.trim()+"|");
          final_transcript += 
			capitalize(event.results[i][0].transcript.trim()) +" -- " + Math.round(100*event.results[i][0].confidence)+"%\n";
			console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
        } else {
          interim_transcript += Math.round(100*event.results[i][0].confidence) + "%: "+ event.results[i][0].transcript+"<br>";
		  console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
        }
      }
      //final_transcript = capitalize(final_transcript);
	  console.log("ready to handle input: '"+final_transcript+"'");
	  handle_user_input(final_transcript);
	  
      final_span.innerHTML = linebreak(final_transcript);
      interim_span.innerHTML = linebreak(interim_transcript);
	  
	  
    };
}


var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function capitalize(s) {
  return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
}

function startDictation(event) {
  if (recognizing) {
    //recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'en-US';
  
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  recognition.start();
}



