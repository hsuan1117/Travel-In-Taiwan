var nav = new Vue({
	el: "#NavApp"
})
var search = new Vue({
	el: "#Search",
	data: {
		searchKeyword: "",
		isListening:false
	},
	methods: {
		search: function() {
			var keyword = this.searchKeyword
			window.open("attractions.html?q=" + keyword, "_top")
		}
	}
})
var recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = true;
recognition.lang = "cmn-Hant-TW";
recognition.onstart = function() {
	search.isListening=true
};
recognition.onend = function() {
	search.isListening=false
};

recognition.onresult = function(event) {
	var i = event.resultIndex;
	var j = event.results[i].length - 1;
	search.searchKeyword = event.results[i][j].transcript;
};

function start() {
	recognition.start();
}

function stop() {
	recognition.stop();
}
