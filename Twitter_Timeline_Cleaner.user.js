// ==UserScript==
// @name           Twitter Mobile Timeline Cleaner
// @namespace      https://github.com/user/tweetcleaner
// @description    Delete tweets from timeline
// @include        https://twitter.com/*
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @version        1
// ==/UserScript==

$(document).ready(function(){
	console.log('script loaded');
	setTimeout(function(){ main(); }, 2500);
});

function main(){
	if(page() == null)
		window.location = 'https://twitter.com/'+uname()+'/with_replies';

	if(page() == 'with_replies')
		if(is_retweet())
			undo_retweet();
		else
			delete_tweet();
}

function is_retweet(){
	return $('div[data-component-term=tweet]').first().find('.js-retweet-text').length;
}

function undo_retweet(){
	console.log('undoing retweet');
	$('button.ProfileTweet-actionButtonUndo').first().click();
	setTimeout(function(){ location.reload(true); },500);
}

function delete_tweet(){
	console.log('deleting tweet');
	$('.js-actionDelete button').first().click();
	setTimeout(function(){ $('button.delete-action').first().click(); },500);
	setTimeout(function(){ location.reload(true); },1000);

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