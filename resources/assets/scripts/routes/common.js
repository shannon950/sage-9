export default {
  init() {
    // JavaScript to be fired on all pages

    // Set offCanvas section
    var offCanvas = document.getElementById('offcanvasNavbar');

    // Show offCanvas
    offCanvas.addEventListener('show.bs.offcanvas', function () {
      $('.hamburger').addClass('is-active');
    });
    // Hide offCanvas
    offCanvas.addEventListener('hide.bs.offcanvas', function () {
      $('.hamburger').removeClass('is-active');
    });
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
