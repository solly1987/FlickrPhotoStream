//Global variables
var APIKey = "7a7585ce79a90f3c553261c9b42727d6",
	flickrURL = "https://api.flickr.com/services/rest/";

//Getting the photo information
function updatePhotoDescriptionAsync(photoId, photoDescription) {
	var
		deferred = $.Deferred();

	$.ajax({
		url: flickrURL,
		data: {
			method: "flickr.photos.getInfo",
			api_key: APIKey,
			photo_id: photoId,
			format: "json",
			nojsoncallback: 1
		}
	})
	.done(function (response) {
		//if there isnt any information display error message
		if (!response || !response.photo || !response.photo.description || !response.photo.description._content ) {
			photoDescription.html('No description avaliable for this image.');
			return;
		}

		//Adding any descriptions
    	photoDescription.html($.trim(response.photo.description._content));

		deferred.resolve();
	})
	.fail(function (error){
		deferred.reject(error);
	});

	return deferred.promise();
}

//Getting the tag information
function updateTagsAsync(photoId, tags, tagWrapper) {
	var
		deferred = $.Deferred();

	$.ajax({
		url: flickrURL,
		data: {
			method: "flickr.photos.getInfo",
			api_key: APIKey,
			photo_id: photoId,
			format: "json",
			nojsoncallback: 1
		}
	})
	.done(function (response) {
		//finding the tags associated with the specific image and adding them to an array
		for (var i = 0; i < response.photo.tags.tag.length; i++) {
			tags.push($.trim(response.photo.tags.tag[i].raw));
		}

		//if there is anything in the array create a string
		if(response.photo.tags.tag.length >= 1) {
	    	tagWrapper.append('Tags: ');
	    	tagWrapper.append(tags.join(", "));
	    }
	    //else return missing text
	    else {
	    	tagWrapper.append('Tags: No Tags associated with this image.');
	    }

		deferred.resolve();
	})
	.fail(function (error){
		deferred.reject(error);
	});

	return deferred.promise();
}

//Getting the author information
function updateAuthorInfoAsync(userId, author) {
	var
		deferred = $.Deferred();

	$.ajax({
		url: "https://api.flickr.com/services/rest/",
		data: {
			method: "flickr.people.getInfo",
			api_key: "dbe4f7bffc862bf1cf1b667faf03a226",
			user_id: userId,
			format: "json",
			nojsoncallback: 1
		}
	})
	.done(function (response) {
		//Checking if the username exists on the image
		if (!response || !response.person || !response.person.username || !response.person.username._content) {
			author.html('No username avaliable for this image');
			return;
		}
		//Setting the username
    	author.html($.trim(response.person.username._content));

		deferred.resolve();
	})
	.fail(function (error){
		deferred.reject(error);
	});

	return deferred.promise();
}

$(function () {
	$.ajax({
	    url: flickrURL,
	    data: {
	        method: "flickr.photos.getRecent",
	        api_key: APIKey,
	        isfamily: 1,
	        safe_search: 1,
	        format: "json",
	        nojsoncallback: 1
	    },
	    success: function (response) {

	        $.each(response.photos.photo, function (index, value) {
	        	//All the variables needed to build up the grid.
				var wrapper = $('<section>'),
					content = $('<article>'),
					imageWrapper = $('<figure>'),
					header = $('<header>'),
					author = $("<span class='author'>"),
					tagWrapper = $("<span class='tag_wrapper'>"),
					photoDescription = $("<p/>"),
					photoURL = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '.jpg',
					imageLink = $("<a class='image_link'>").attr({href: photoURL}),
					img = $('<img>').attr({src: photoURL}),
					owner = 'https://www.flickr.com/photos/' + value.owner,
					ownerURL = $('<a>').attr({href: owner}),
					title = value.title,
					tags = [];

				//Get the description from each photo
				updatePhotoDescriptionAsync(value.id, photoDescription);
				//Get the author from each photo
				updateAuthorInfoAsync(value.owner, author);
				//Get the tags from each photo
				updateTagsAsync(value.id, tags, tagWrapper);

				//Add the image to the image wrapper
				imageWrapper.append(img);

				//Adding each individual item to the content wrapper
				content.append(header);
				content.append(photoDescription);
				content.append(tagWrapper);

				//Adding the author and the image title
				header.append(imageLink);
				imageLink.append(title);
				header.append("<span class='filler_text'> by </span>");
				header.append(ownerURL);
				ownerURL.append(author);

				//Adding it all together
            	wrapper.append(imageWrapper);
				wrapper.append(content);

				//putting it onto the page
				$("#gallery").append(wrapper);
	        });
	    }
	});
})