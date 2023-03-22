// // Initialize the Facebook SDK
// window.fbAsyncInit = function() {
//   FB.init({
//     appId: '2589168794565117',
//     cookie: true,
//     xfbml: true,
//     version: 'v12.0'
//   });

//   // Check if the user is already logged in
//   FB.getLoginStatus(function(response) {
//     if (response.status === 'connected') {
//       onConnected();
//     } else {
//       onNotConnected();
//     }
//   });
// };

// // Load the Facebook SDK asynchronously
// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "https://connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

// // Called when the user is connected
// function onConnected() {
//   console.log('Connected to Facebook.');

//   // Get the user's pages
//   FB.api('/me/accounts', function(response) {
//     if (response.error) {
//       console.error(response.error.message);
//       onNotConnected();
//       return;
//     }

//     // Populate the page selection dropdown
//     var pagesSelect = document.getElementById('pages');
//     for (var i = 0; i < response.data.length; i++) {
//       var page = response.data[i];
//       var option = document.createElement('option');
//       option.value = page.id;
//       option.text = page.name;
//       pagesSelect.appendChild(option);
//     }

//     // Show the page selection dropdown
//     pagesSelect.style.display = 'block';
//   });
// }

// // Called when the user is not connected
// function onNotConnected() {
//   console.log('Not connected to Facebook.');
// }

// // Called when the user selects a page
// function onPageSelected() {
//   console.log('Page selected.');

//   // Show the post form
//   document.getElementById('post-form').style.display = 'block';

//   // Enable the publish button
//   document.getElementById('publish-btn').disabled = false;
// }

// // Called when the post form is submitted
// function onPostFormSubmitted(event) {
//   event.preventDefault();

//   // Get the selected page ID and access token
//   var pagesSelect = document.getElementById('pages');
//   var pageId = pagesSelect.value;

//   FB.api('/' + pageId, { fields: 'access_token' }, function(response) {
//     if (response.error) {
//       console.error(response.error.message);
//       return;
//     }

//     var accessToken = response.access_token;

//     // Get the post data from the form
//     var message = document.getElementsByName('message')[0].value;
//     var url = document.getElementsByName('url')[0].value;
//     var image = document.getElementsByName('image')[0].files[0];

//     // Create a new FormData object to send the post data
//     var formData = new FormData();
//     formData.append('access_token', accessToken);
//     formData.append('message', message);
//     formData.append('link', url);
//     formData.append('source', image);

//     // Preview the post
//     FB.api('/' + pageId + '/feed_preview', {
//       method: 'POST',
//       body: formData,
//       processData: false,
//       contentType: false
//     }, function(response) {
//       if (response.error) {
//         console.error(response.error.message);
//         return;
//       }

//       // Show the post preview
// var previewHtml = response.html;
//   document.getElementById('post-preview').innerHTML = previewHtml;
//   document.getElementById('post-preview').style.display = 'block';

//   // Scroll to the post preview
//   document.getElementById('post-preview').scrollIntoView({ behavior: 'smooth' });
// });
// });
// }

// // Called when the publish button is clicked
// function onPublishButtonClicked() {
// console.log('Publishing post.');

// // Get the selected page ID and access token
// var pagesSelect = document.getElementById('pages');
// var pageId = pagesSelect.value;

// FB.api('/' + pageId, { fields: 'access_token' }, function(response) {
// if (response.error) {
// console.error(response.error.message);
// return;
// }

// var accessToken = response.access_token;

// // Get the post data from the form
// var message = document.getElementsByName('message')[0].value;
// var url = document.getElementsByName('url')[0].value;
// var image = document.getElementsByName('image')[0].files[0];

// // Create a new FormData object to send the post data
// var formData = new FormData();
// formData.append('access_token', accessToken);
// formData.append('message', message);
// formData.append('link', url);
// formData.append('source', image);

// // Publish the post
// FB.api('/' + pageId + '/feed', {
//   method: 'POST',
//   body: formData,
//   processData: false,
//   contentType: false
// }, function(response) {
//   if (response.error) {
//     console.error(response.error.message);
//     return;
//   }

//   console.log('Post successfully published.');
// });
// });
// }

// // Attach event listeners
// document.getElementById('pages').addEventListener('change', onPageSelected);
// document.getElementById('post-form').addEventListener('submit', onPostFormSubmitted);
// document.getElementById('publish-btn').addEventListener('click', onPublishButtonClicked);
