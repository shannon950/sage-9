{{-- Off Canvas Navigation --}}
<div class="offcanvas {!! $canvasdirection !!} {!! $canvaswidth !!} {!! $canvasheight !!} {!! $header_bg !!}" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
  <div class="offcanvas-header">
    {{--<h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>--}}
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body container">
    <nav class="nav-primary d-flex align-items-end justify-content-start vh-80" role="navigation">
      @if (has_nav_menu('primary_navigation'))
        {!! wp_nav_menu($canvasmenu) !!}
      @endif
    </nav>
  </div>
</div>

@if( class_exists( 'WooCommerce' ) )
<a class="cart-contents basket" href="{!! wc_get_cart_url() !!}" title="{!! _e( 'View your shopping cart' ) !!}">
  <span class="hidden-xs">{!! sprintf ( _n( '%d</span>' . ' <span class="item-count"> item</span>', '%d</span>' . ' <span class="item-count"> items</span>', WC()->cart->get_cart_contents_count() ), WC()->cart->get_cart_contents_count() ) !!} - </span>
  <span class="basket-total">{!! WC()->cart->get_cart_total() !!}</span>
</a>
@endif

{{-- Main Header --}}
<header class="banner py-4 {!! $header_style !!} has-1050-z-index {!! $header_bg !!}">
  <div class="container d-flex align-items-center justify-content-between">
    <a class="brand p-3" href="{{ home_url('/') }}" style="background: url({!! $logo['url'] !!});">
      <span class="visually-hidden">{{ get_bloginfo('name', 'display') }}</span>
    </a>
    <nav class="navbar align-items-center justify-content-end" role="navigation">
      @if (has_nav_menu('primary_navigation'))
        {!! wp_nav_menu($primarymenu) !!}
      @endif
      <button class="navbar-toggler hamburger p-0 {!! $hamburger_style !!} {!! $hamburger_breakpoint !!} " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span class="hamburger-box">
          <span class="hamburger-inner {!! $hamburger_bg !!}"></span>
        </span>
      </button>
    </nav>
  </div>
</header>
