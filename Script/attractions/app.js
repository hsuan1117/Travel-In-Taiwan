var attractionsApp = new Vue({
	el: '#attractionsApp',
	data: {
		allAttractions: [],
		filterText: new URLSearchParams(location.search).get("q") || "",
		loading: true,
		currentPage: 1,
		pageSize: 20
	},
	computed: {
		filteredAttractions: function() {
			var self = this;
			if (!self.filterText) return self.allAttractions;
			return self.allAttractions.filter(function(item) {
				return item.name.indexOf(self.filterText) !== -1 || 
					   item.address.indexOf(self.filterText) !== -1 ||
					   item.district.indexOf(self.filterText) !== -1;
			});
		},
		displayedAttractions: function() {
			var start = (this.currentPage - 1) * this.pageSize;
			var end = start + this.pageSize;
			return this.filteredAttractions.slice(start, end);
		}
	},
	watch: {
		filterText: function() {
			this.currentPage = 1;
		}
	},
	mounted: function() {
		var self = this;
		TravelAPI.fetchAll()
			.then(function(data) {
				self.allAttractions = data;
				self.loading = false;
			})
			.catch(function(error) {
				console.error("Error fetching attractions:", error);
				self.loading = false;
				// 如果其中一個 API 失敗，仍然嘗試顯示已取得的資料（Promise.all 改用 Promise.allSettled 或個別處理更好，但這裡先保持簡單）
				alert("部分景點資料取得失敗，請稍後再試。");
			});
	}
});

var nav = new Vue({
	el: "#NavApp"
});
