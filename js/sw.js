//i'm caching the html , css , js and json files which will be trigerred using the service worker install 
self.addEventListner('install',function(event){
	event.waitUntil(
		caches.open('restaurant-static-v1').then(function(cache){
//array of all the pathes that will get me the caches from

			return cache.addAll(
				[
				'/',
				'/index.html',
				'/js/main.js',
				'/js/restaurant_info.js',
				'/js/dbhelper.js',
				'/data/restaurants.json',
				'/css/styles.css'

				]
			);
		})
	);
});
//this code will respond with the cach and if it didn't find it ; it will request it from the network
// only this chunck of code was inspired by (https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker)
self.addEventListner('fetch',function(event){
	event.respondWith(
		caches.match(event.request).then(function(responseFromWork) {
			//return the response or request it from the network
			return responseFromWork || fetch(event.request).then(function(responseFromWork){
				return responseFromWork;
			});
		})

	);
});