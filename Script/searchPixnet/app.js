var searchData = new URLSearchParams(location.search.substr(1)).get("q")
if (!searchData) {
	location.href = "../home.html"
}
if (new URLSearchParams(location.search.substr(1)).get("tag")=="yes"){
	searchData+="&type=tag"
}
var searchApp = new Vue({
	el: '#searchApp',
	data: {
		searchResult: {},
		loading: true,
		searchData: searchData
	},
	filters: {
		removeInappropriate: function(value) {
			if (!value) return ''
			value = value.toString()
			$.ajax({
				async: false,
				url: "../Script/public/inappropriate-words.json",
				dataType: "json",
				success: function(data) {
					data.forEach(function(item) {
						eval('value=value.replace(/' + item + '/g,"*".repeat(item.length)+"(非法字元)")')
					})
				}
			});
			console.log(value)
			return value;
		},
		formatUnixTime: function(value) {
			if (!value) return ''
			value = Number(value.toString())

			function padZero(number) {
				if (number < 10) {
					number = "0" + number;
				}
				return number;
			}

			function unixtime2YYMMDD(unixtime) {
				var milliseconds = unixtime * 1000,
					dateObject = new Date(milliseconds),
					temp = [],
					temp2 = [];
				temp.push(dateObject.getFullYear().toString());
				temp.push(padZero(dateObject.getMonth() + 1));
				temp.push(padZero(dateObject.getDate()));
				temp2.push(padZero(dateObject.getHours()))
				temp2.push(padZero(dateObject.getMinutes()))
				temp2.push(padZero(dateObject.getSeconds()))

				return temp.join("/") + " " + temp2.join(":");
			}
			return unixtime2YYMMDD(value);
		},
		parseStyleHW:function(value){
			var url=new URL(value.toString())
			return (
				"width:"+url.searchParams.get("width")+" !important;"+
				"height:"+url.searchParams.get("height")+" !important;"
			)
		}
	},
	methods:{
		nextPage:function(page){
			$("#btn-nextPage").addClass("disabled")
			$("#btn-prevPage").addClass("disabled")
			$("#btn-nextPage").after("<br><br><span class='alert alert-info' id='temp-wait-plz'>請稍後....</span><br>")
			location.href="#temp-wait-plz"
			axios.get('https://emma.pixnet.cc/blog/articles/search?format=json&per_page=28&key=' + searchData+'&page='+page)
				.then(function(response) {
					console.log(response);
					searchApp.searchResult = response.data
					if (response.data.total == 0) {
						alertPretty(
							//title
							"Sorry!",
							//body
							"抱歉! 您搜尋的'" + searchData + "'已經沒有下一頁了 >__<",
							(
								createButton("primary", false, "回首頁", "goHome") +
								createButton("secondary", true, "關閉")
							)
						)
					}
					location.href="#"
					$("#temp-wait-plz").remove()
					$("#btn-prevPage").removeClass("disabled")
					$("#btn-nextPage").removeClass("disabled")
				})
		},
		searchTag:function(tag){
			var newUrl=new URL(location)
			newUrl.searchParams.set("q",tag)
			newUrl.searchParams.set("tag","yes")
			
			location.href=(newUrl.toString())
		}
	}
})
var TemplatedModal = new Vue({
	el: '#TemplatedModal',
	data: {
		content: "",
		title: "",
		buttons: ""
	},
	methods:{
		goHome:function(){
			location.href="../home.html"
		}
	}
})

function alertPretty(title, content, button) {
	TemplatedModal.content = content;
	TemplatedModal.title = title
	TemplatedModal.buttons = button
	$('#TemplatedModal').modal()
}

function createButton(style, close, text, click) {
	var elem = $("<button/>")
	elem.addClass("btn")
	elem.addClass("btn-"+style)
	if(close==true){
		elem.attr("data-dismiss","modal")
	}
	if(click == "goHome")elem.attr("onclick","TemplatedModal.goHome()")
	elem.text(text)
	
	return elem.get()[0].outerHTML;
}
axios.get('https://emma.pixnet.cc/blog/articles/search?format=json&per_page=28&key=' + searchData)
	.then(function(response) {
		searchApp.loading = false
		console.log(response);
		searchApp.searchResult = response.data
		if (response.data.total == 0) {
			alertPretty(
				//title
				"Sorry!",
				//body
				"抱歉! 您搜尋的'" + searchData + "'沒有相關結果 >__<",
				(
					createButton("primary", false, "回首頁", "goHome") +
					createButton("secondary", true, "關閉")
				)
			)
		}
	})
var nav = new Vue({
	el: "#NavApp"
})
$(function() {
	$.contextMenu({
		selector: '.card',
		callback: function(key, options) {
			switch(key){
				case "show-image":
					var wv=window.open("about:blank;","_blank")
					var url=new URL($(this).data("img-src"))
					url.searchParams.set("height","200px")
					url.searchParams.set("width","200px")
					wv.document.write(
						"<center>"+
						"<img src='"+url+"'><br>"+
						"<a href='javascript:window.close()' style='font-size:30px;'>返回</a>"+
						"</center>"
					)
					break;
				
			}
			
		},
		items: {
			"show": {
				"name": "顯示",
				"items": {
					"show-image": {
						"name": "圖片",
					},
					"show-website": {
						"name": "網頁"
					},
					"fold1-key3": {
						"name": "delta"
					}
				}
			},
			"cut": {
				name: "Cut",
				icon: "cut"
			},
			copy: {
				name: "Copy",
				icon: "copy"
			},
			"paste": {
				name: "Paste",
				icon: "paste"
			},
			"delete": {
				name: "Delete",
				icon: "delete"
			},
			"sep1": "---------",
			"quit": {
				name: "Quit",
				icon: function() {
					return 'context-menu-icon context-menu-icon-quit';
				}
			}
		}
	});

});
