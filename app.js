$(document).ready(function(){

// Initialize Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
      appId      : '2589168794565117',
      cookie     : true,
      xfbml      : true,
      version    : 'v11.0'
    });
    
    // Check login status and update UI accordingly
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            $('#login').hide();
            $('#page_select').prop('disabled', false);
            $('#publish').prop('disabled', false);

            // Get the list of pages the user manages
            FB.api(
                '/me/accounts',
                'GET',
                {},
                function(response) {
                    if (response && !response.error) {
                        var select = $('#page_select');
                        select.empty();
                        for (var i = 0; i < response.data.length; i++) {
                            var option = $('<option></option>')
                                .attr('value', response.data[i].id)
                                .text(response.data[i].name);
                            select.append(option);
                        }
                    }
                }
            );
        } else {
            $('#page_select').prop('disabled', true);
            $('#publish').prop('disabled', true);
        }
    });

    // Log in with Facebook if not already logged in
    if (FB.getAccessToken()) {
        location.reload();
    } else {
        FB.login(function(response) {
            if (response.authResponse) {
                location.reload();
            } else {
                alert('Error logging in.');
            }
        }, {scope: 'manage_pages,pages_show_list'});
    }
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
});


// Preview post
$('#message, #url, #image').on('input', function() {
  var message = $('#message').val();
  var url = $('#url').val();
  var image = $('#image').val();

  $('#preview_message').text(message);
  $('#preview_url').attr('href', url).text(url);
  $('#preview_image').attr('src', image);

  if (message || url || image) {
    $('.preview').show();
  } else {
    $('.preview').hide();
  }
});

// Publish post
$('#publish').click(function(e) {
	e.preventDefault();

	var pageId = $('#page_select').val();
	var message = $('#message').val();
	var url = $('#url').val();
	var image = $('#image').val();

	FB.api(
	    '/' + pageId + '/feed',
	    'POST',
	    {'message': message, 'link': url, 'picture': image},
	    function(response) {
	        if (response && !response.error) {
		        alert('Post published successfully!');
		    } else {
		    	alert('Error publishing post.');
		    }
	    }
	);
});
