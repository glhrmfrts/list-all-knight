var app=angular.module("listAllKnight",[]);app.service("VideoService",["$http",function(t){var i=function(){this.url="https://www.googleapis.com/youtube/v3/playlistItems?part=snippet",this.params={key:"AIzaSyDmcfqSbjg3sjiW9rDC5KnXh1trtwrO23E",maxResults:1,playlistId:"PLiyjwVB09t5zm53TvttbxLE_YPrL8VkSm"}};return i.prototype.getNext=function(i){t.get(this.buildUrl()).success(this.onResult(i))},i.prototype.onResult=function(t){var i=this;return function(e){console.log(e.items[0]),i.params.pageToken=e.nextPageToken,t(e.items.pop().snippet)}},i.prototype.buildUrl=function(){var t=this.url;for(var i in this.params)t+="&"+i+"="+this.params[i];return t},new i}]),app.filter("VideoDescriptionFilter",function(){return function(t){var i={appName:/^(.*)(\s)?(\((\$([0-9]*\.[0-9]+|[0-9]+)|FREE|[0-9]+\:[0-9]+)\))(\s)*$/i,appLink:/^(Android|iOS|WP8|Steam)(\s)*(\((\$([0-9]*\.[0-9]+|[0-9]+)|FREE)\))?\:(\s)*http(s)?\:\/{2}(.*)$/i};return t.map(function(t){for(var e=t.description.split("\n"),n=[],s=0;s<e.length;s++){var o=e[s];if(i.appName.test(o))n.push({name:o,links:[],open:!1});else if(i.appLink.test(o)){var r=n.length-1,p=o.slice(0,o.indexOf(":")),l=o.slice(o.indexOf(":")+2);n[r].links.push({plat:p,href:l})}}return t.title=t.title.slice(t.title.indexOf("App All Knight")),t.apps=n,t})}}),app.controller("ListController",["$scope","VideoService","$filter",function(t,i,e){t.videos=[],t.loading=!1,t.init=function(){t.getVideo()},t.getVideo=function(){t.loading=!0,i.getNext(function(i){t.videos.push(i),t.videos=e("VideoDescriptionFilter")(t.videos),t.loading=!1})},t.init()}]);