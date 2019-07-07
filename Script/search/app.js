var nav = new Vue({
	el: "#NavApp"
})
var search = new Vue({
	el: "#Search",
	data: {
		searchKeyword: "",
		isTagSearch: false,
		isListening:false
	},
	methods: {
		search: function() {
			var keyword = this.searchKeyword
			//location.href=
			window.open("searchPixnet.html?q=" + keyword + (this.isTagSearch ? "&tag=yes" : ""), "_top")
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
