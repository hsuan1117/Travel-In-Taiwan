var featureCards = new Vue({
	el: '#feature_cards',
	data: {
		features: [{
			"card_head": "",
			"card_title": "緊急服務",
			"card_content": "本站提供您緊急服務\n讓您在旅途無憂無慮",
			"card_others": "<a href='tel:0000' class='card-link'>立刻撥打台灣求救電話</a>"
		}, {
			"card_head": "",
			"card_title": "旅遊諮詢",
			"card_content": "本站提供您全台各地著名景點與導覽介紹",
			"card_others": "<a href='Page/attractions.html' class='card-link'>查看景點</a>"
		}, {
			"card_head": "",
			"card_title": "即時訊息",
			"card_content": "我們提供您由中央氣象局即時取得的資料\n能夠立即了解目前的空氣品質等等...",
			"card_others": ""
		}, {
			"card_head": "",
			"card_title": "搜尋部落客文章",
			"card_content": "讓您搜尋台灣在地部落客寫的文章",
			"card_others": "<a href='Page/search.html' class='card-link'>搜尋</a>"
		}]
	}
})
var nav = new Vue({
	el: "#NavApp"
})
var carouselApp = new Vue({
	el: '#Carousel',
	data: {
		carouselItems: [
			"https://www.google.com.tw/logos/doodles/2019/2019-womens-world-cup-day-25-4819909247238144-law.gif  ==defaultActive==",
			"https://hs.nnkieh.tn.edu.tw/uploads/ugm_college/system/d0201_1.jpg"
		]
	}
})
