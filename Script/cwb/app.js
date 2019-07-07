var nav = new Vue({
	el: "#NavApp"
})
var Cwb = new Vue({
	el: "#CwbApp",
	data: {
		"cwbAllData": [],
		"loading": true
	},
	methods: {
		
	},
	filters: {
		"toReadable": function(value) {
			var translation = {
				"Wx": "天氣現象",
				"MaxT": "最高溫度",
				"MinT": "最低溫度",
				"CI": "舒適度",
				"PoP": "降雨機率"
			}
			return translation[String(value)] ? translation[String(value)] : String(value)
		},
		"formatTimeRange": function(arr) {
			let start = new Date(arr[0]),
				end = new Date(arr[1])
			console.log(start)

			function leadZero(value) {
				if (value < 10) {
					value = "0" + String(value)
				}
				return value
			}
			return (
				(start.getMonth() + 1) + "/" + (start.getDate()) + " " + leadZero(start.getHours()) + ":" + leadZero(start.getMinutes()) +
				":" + leadZero(start.getSeconds()) +
				"~" +
				(end.getMonth() + 1) + "/" + (end.getDate()) + " " + leadZero(end.getHours()) + ":" + leadZero(end.getMinutes()) +
				":" + leadZero(end.getSeconds())
			)
		},
		"parseUnit": function(value) {
			let output = {
				"百分比": "%",
				"C": "°C"
			}
			return output[value] ? output[value] : value;
		}
	}
})
$(function() {
	loadAllResource(["F-C0032-001"])
	genMap()
	Cwb.loading = false
})

function loadAllResource(ids) {
	let arr = []
	ids.forEach(function(id) {
		arr.push(axios.get("https://opendata.cwb.gov.tw/api/v1/rest/datastore/" + id, {
			params: {
				"Authorization": "CWB-EE7BA53A-8C07-4C0E-AA22-B9B82D3F384F",
				"format": "JSON"
			}
		}))
	})
	axios.all(arr).then(axios.spread(function(...res) {
		//var data = response.data.records;
		res.forEach(function(item) {
			Cwb.cwbAllData.push(item.data.records)
		})

	}));
}

function genMap() {
	// 建立 Leaflet 地圖
	var map = L.map('chooseRegionMap');

	// 設定經緯度座標
	map.setView(new L.LatLng(23.60000, 121.00000), 8);

	// 設定圖資來源
	var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osm = new L.TileLayer(osmUrl, {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> | By Hsuan from ROC'
	});
	map.addLayer(osm);

	//台北 TPE
	var TPE = L.marker([25.03260, 121.56218],{
		title: '臺北'
	}).addTo(map);

	//新北 TPH
	var TPH = L.marker([25.0124842, 121.4635033],{
		title: '新北'
	}).addTo(map);

	//基隆 KLU
	var KLU = L.marker([25.1309259, 121.7321651],{
		title: '基隆'
	}).addTo(map);

	//桃園 TYC
	var TYC = L.marker([24.99153, 121.29255],{
		title: '桃園'
	}).addTo(map);

	//新竹 HSC
	var HSC = L.marker([24.80000, 120.96000],{
		title: '新竹'
	}).addTo(map);

	//苗栗 MAC
	var MAC = L.marker([24.5618461, 120.8091972],{
		title: '苗栗'
	}).addTo(map);

	//台中 TXG
	var TXG = L.marker([24.13257, 120.64715],{
		title: '臺中'
	}).addTo(map);

	//彰化 CWH
	var CWH = L.marker([24.006644, 120.417804],{
		title: '彰化'
	}).addTo(map);

	//南投 NTC
	var NTC = L.marker([23.9261737, 120.6499484],{
		title: '南投'
	}).addTo(map);

	//雲林 YUN
	var YUN = L.marker([23.6991619, 120.5241393],{
		title: '雲林'
	}).addTo(map);

	//嘉義 CYI
	var CYI = L.marker([23.4812918, 120.4514053],{
		title: '嘉義'
	}).addTo(map);

	//台南 TNN
	var TNN = L.marker([22.98000, 120.19000],{
		title: '臺南'
	}).addTo(map);

	//高雄 KHH
	var KHH = L.marker([22.61137, 120.30000],{
		title: '高雄'
	}).addTo(map);

	//屏東 PTS
	var PTS = L.marker([22.00000, 120.8004405],{
		title: '屏東'
	}).addTo(map);

	//宜蘭 ILN
	var ILN = L.marker([24.7456116, 121.7372256],{
		title: '宜蘭'
	}).addTo(map);

	//花蓮 HWA
	var HWA = L.marker([24.0254543, 121.6126366],{
		title: '花蓮'
	}).addTo(map);

	//台東 TTC
	var TTC = L.marker([22.7460239, 121.0730418],{
		title: '臺東'
	}).addTo(map)

	new Array(TPE,TPH,KLU,TYC,HSC,MAC,TXG,CWH,NTC,YUN,CYI,TNN,KHH,PTS,ILN,HWA,TTC).forEach(function(marker){
		console.log(marker)
		marker.bindPopup(`
			<b>${marker.options.title}</b>
			<br>
			<a href="javascript:goHitHash('三十六小時天氣預報--${marker.options.title}')">查看天氣預報</a>
		`)
	})
}
function goHitHash(hash){
	$("#"+hash).addClass("card2focus")
	var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
	$body.animate({
		scrollTop: $('#'+hash).offset().top-60
	}, 2000);
	location.hash=hash
}
