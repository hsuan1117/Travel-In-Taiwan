(function() {
	let html =
		`
		<nav class="navbar fixed-top navbar-light bg-light " id="nav">
			<a class="navbar-brand" href="#">旅遊助手</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav_inside">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="nav_inside">
				<div class="navbar-nav">
					<a 	class="nav-item nav-link" href="#" 
						v-on:click="goHome()"
						v-if="this.$attrs.now != 'home'"
					>Home</a>
					<a 	class="nav-item nav-link" href="#" 
						v-on:click="goAbout()"
						v-if="this.$attrs.now != 'about'"
					>About me</a>
					<form class="form-inline my-2 my-lg-0" :action="this.$attrs['search-pixnet']">
						<input name="q" class="form-control mr-sm-2" type="search" placeholder="搜尋" aria-label="Search">
						<button class="btn btn-outline-success my-2 my-sm-0" type="submit">搜尋</button>
					</form>
				</div>
			</div>
		</nav>
	`
	Vue.component('travel-nav', {
		template: html,
		methods: {
			goHome: function() {
				window.location.href = this.$attrs.home || "/"
			},
			goAbout: function() {
				window.location.href = (
					this.$attrs['search-pixnet'].split("/").length==1
					?//in /Page 
					"about.html"
					://not in /Page
					this.$attrs['search-pixnet'].split("/")[this.$attrs['search-pixnet'].split("/").length-2]+"/about.html"
				)
			}
		}
	})
})()
