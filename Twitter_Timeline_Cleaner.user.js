// ==UserScript==
// @name           Twitter Timeline Cleaner
// @namespace      https://github.com/SageHack/twitter_timeline_cleaner
// @description    Delete tweets from timeline
// @include        https://twitter.com/*
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @version        1
// ==/UserScript==

$(document).ready(function(){
	console.log('script loaded');
	setTimeout(function(){ main(); }, 1000);
});

function main(){
	if(page() == null)
		window.location = 'https://twitter.com/'+uname()+'/with_replies';

	console.log(page());

	if(page() == 'with_replies')
		delete_first_tweet();
}

function delete_first_tweet(){
	console.log('deleting tweet');
	$('.js-actionDelete button').first().click();
	setTimeout(function(){
		$('button.delete-action').first().click();
	},500);
	setTimeout(function(){
		location.reload(true);
	},1000)

}

function uname(){
	var matches = /https:\/\/twitter.com\/([a-zA-Z0-9_]*)/.exec( window.location )
	if( matches ) return matches[1];
	return null;
}

function page(){
	var matches = /https:\/\/twitter.com\/[^\/]*\/(.*)/.exec( window.location );
	if( matches ) return matches[1];
	return null;
}