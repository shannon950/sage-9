<footer class="content-info {!! $footer_bg !!} p-4">
  <div class="container">
    <a class="brand p-4 p-lg-5" href="{{ home_url('/') }}" style="background: url({!! $logo['url'] !!});">
      <span class="visually-hidden">{{ get_bloginfo('name', 'display') }}</span>
    </a>
    @php // dynamic_sidebar('sidebar-footer') @endphp
    @if (has_nav_menu('primary_navigation'))
      {!! wp_nav_menu($footermenu) !!}
    @endif
    <div class="lower-footer">
      <p class="small">Copyright {!! get_bloginfo('name', 'display') !!} &copy; {!! the_date('Y') !!} All rights reserved | <a href="{!! get_privacy_policy_url() !!}">Privacy Policy</a></p>
    </div>
  </div>
</footer>
