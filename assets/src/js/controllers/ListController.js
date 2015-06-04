app.controller('ListController', ['$scope', 'VideoService', '$filter', function($scope, VideoService, $filter) {
	$scope.videos = []
	$scope.loading = false

	$scope.init = function() {
		$scope.getVideo()
	}

	$scope.getVideo = function() {
		$scope.loading = true
		VideoService.getNext(function(video) {
			$scope.videos.push(video)
			$scope.videos = $filter('VideoDescriptionFilter')($scope.videos)
			$scope.loading = false
		})
	}

	$scope.init()
}])