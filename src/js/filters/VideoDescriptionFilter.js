app.filter('VideoDescriptionFilter', function() {
	
	return function(videos) {
		var regex = {
			appName: /^(.*)(\s)?(\((\$([0-9]*\.[0-9]+|[0-9]+)|FREE|[0-9]+\:[0-9]+)\))(\s)*$/i,
			appLink: /^(Android|iOS|WP8|Steam|Web)(\s)*(\((\$([0-9]*\.[0-9]+|[0-9]+)|FREE)\))?(\s)*(\:|-)(\s)*http(s)?\:\/{2}(.*)$/i
		}

		var getLinkSeparator = function(link) {
			var colon = link.indexOf(':'),
				dash = link.indexOf('-'),
				http = link.indexOf('http')

			return (colon >= 0 && colon < http) ? colon : dash
		}

		var isValidUrl = function(url) {
			return url.indexOf('itunes.apple') + url.indexOf('play.google') + url.indexOf('store.steam') + url.indexOf('goo.gl') > -4
		}

		return videos.map(function(video) {
			var descriptionLines = video.description.split('\n')
			var apps = [], dirty = 0
			for (var i = 0; i < descriptionLines.length; i++) {
				var line = descriptionLines[i]
				if (regex.appName.test(line)) {
					dirty = 0
					apps.push({
						name: line,
						links: [],
						open: false
					})
				} else if (regex.appLink.test(line)) {
					var pos = apps.length - 1
					var plat = line.slice(0, getLinkSeparator(line))
					var href = line.slice(getLinkSeparator(line) + 2)
					if (!isValidUrl(href)) {
						continue
					}
					try {
						apps[pos].links.push({
							plat: plat,
							href: href
						})
					} catch (err) {
						console.log(err)
						continue
					}
				} else {
					dirty = i
				}
			}
			video.title = video.title.slice(video.title.indexOf('App All Knight'))
			video.apps = apps
			return video
		})
	}
})