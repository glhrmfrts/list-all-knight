app.service('VideoService', ['$http', function($http) {

	var VideoService = function() {
		this.url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet'
		this.params = {

			// The API Key
			key: 'AIzaSyDmcfqSbjg3sjiW9rDC5KnXh1trtwrO23E',

			// One result per page
			maxResults: 1,

			// The App All Knight playlist id
			playlistId: 'PLiyjwVB09t5zm53TvttbxLE_YPrL8VkSm',
		}
	}

	VideoService.prototype.getNext = function(callback) {
		$http.get(this.buildUrl()).success(this.onResult(callback))
	}

	VideoService.prototype.onResult = function(callback) {
		var self = this
		return function(res) {
			console.log(res.items[0])
			self.params.pageToken = res.nextPageToken
			callback(res.items.pop().snippet)
		}
	}

	VideoService.prototype.buildUrl = function() {
		var url = this.url
		for (var key in this.params) {
			url += '&'+ key +'='+ this.params[key]
		}
		return url
	}

	return new VideoService()
}])