(function($) {
  $(document).ready(function() {
    // Hide the loading message or spinner.
    $('.loading').hide();

    var page = 1; // Track the page number of the posts we're currently on.

    // Bind a click event to the "Load More Posts" button.
    $('.load-more').click(function() {

      // Define the AJAX request.
      $.ajax({
        url: myAjax.ajax_url, // This is the AJAX URL for WordPress.
        type: 'post',
        data: {
          action: 'load_more_posts',
          page: page,
        },
        beforeSend: function() {
          // Display a loading message or spinner.
          $('.loading').show();
        },
        success: function(response) {
          // Hide the loading message or spinner.
          $('.loading').hide();

          // Append the new posts to the existing posts on the page.
          $('.post-list').append(response);

          // Increment the page number for the next AJAX request.
          page++;
        }
      });

    });
  });
})(jQuery);