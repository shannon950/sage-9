{{--
  Title: Masonry Block
  Description: Block for outputting posts using a masonry grid style.
  Category: formatting
  Icon: schedule
  Keywords: masonry grid
  Mode: edit
  Align: center
  SupportsAnchor: true
  SupportsAlign: wide center full
  SupportsInnerBlocks: true
--}}

@php

$post_type = get_field('post_type');
$no_of_posts = get_field('posts_per_page');

$args = array (
    'post_type'           => $post_type,
    'posts_per_page'      => $no_of_posts,
    'published'           => 'publish',
);

$the_query = new \WP_Query( $args );

$alm_args = array (
    'post_type'           => $post_type,
    'posts_per_page'      => $no_of_posts,
    //'offset'              => $no_of_posts,
    'id'                  => 'masonry-block',
    'container_type'      => 'div',
    'transition'          => 'masonry',
    'masonry_selector'    => '.post',
    'masonry_animation'   => 'slide-up',
    'nested'              => true,
);

@endphp

<div id="masonry-block" class="{{ $block['classes'] }} masonry-block position-relative custom-block my-0">
    {{--
    @while ($the_query->have_posts()) @php $the_query->the_post() @endphp
      @include('partials.content-'.get_post_type())
    @endwhile
    --}}
    @if( function_exists('alm_render') )
        {!! alm_render($alm_args) !!}
    @else 
        <p>Install <a href="https://wordpress.org/plugins/ajax-load-more/" target="_blank">WordPress Infinite Scroll – Ajax Load More</a> to output the list.</p>
    @endif 
</div>
