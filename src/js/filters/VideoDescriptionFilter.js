app.filter('VideoDescriptionFilter', function() {
	
	return function(videos) {
		var regex = {
			appName: /^(.*)(\s)?(\((\$([0-9]*\.[0-9]+|[0-9]+)|FREE|[0-9]+\:[0-9]+)\))(\s)*$/i,
			appLink: /^(Android|iOS|WP8|Steam)(\s)*(\((\$([0-9]*\.[0-9]+|[0-9]+)|FREE)\))?\:(\s)*http(s)?\:\/{2}(.*)$/i
		}

		return videos.map(function(video) {
			var descriptionLines = video.description.split('\n')
			var apps = []
			for (var i = 0; i < descriptionLines.length; i++) {
				var line = descriptionLines[i]
				if (regex.appName.test(line)) {
					apps.push({
						name: line,
						links: [],
						open: false
					})
				} else if (regex.appLink.test(line)) {
					var pos = apps.length - 1
					var plat = line.slice(0, line.indexOf(':'))
					var href = line.slice(line.indexOf(':') + 2)
					apps[pos].links.push({
						plat: plat,
						href: href
					})
				}
			}
			video.title = video.title.slice(video.title.indexOf('App All Knight'))
			video.apps = apps
			return video
		})
	}
})