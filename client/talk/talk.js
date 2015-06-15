Session.set('voices',window.speechSynthesis.getVoices());
voices = [];
theVoice=null;

Template.talk.helpers({
	theVoices: function(){console.log("v="+Session.get('voices')); return voices;}
})


Template.talk.events({
	'click .talk': function(event){
		console.log("in the click talk event");
		var msg = new SpeechSynthesisUtterance('Hello World');
		if (theVoice) msg.voice=theVoice;
		window.speechSynthesis.speak(msg);
	},

	'click .say': function(event){
		//var text = $("#words").val();
		var msg = new SpeechSynthesisUtterance(words.value);
		if (theVoice) msg.voice=theVoice;
		window.speechSynthesis.speak(msg);
	}, 

	'click .getVoices': function(event){
		console.log("getting voices!");
		voices= window.speechSynthesis.getVoices();
		Session.set('voices',voices);
		console.log("voices = "+JSON.stringify(voices));
	},
	
	'change #voiceselect': function(event){
		theVoice = this;
		theEvent = event;
		theVoice = voices[event.currentTarget.selectedIndex]
		console.log("the voice index ="+event.currentTarget.selectedIndex);
	}

});

Template.showvoice.events({
	'click .voice': function(event){
		theVoice = this;
		console.log("the voice="+theVoice);
	}
})