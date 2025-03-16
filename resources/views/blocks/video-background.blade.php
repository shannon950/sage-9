{{--
  Title: Video Background
  Description: Video Background with optional nested content. Vimeo backgrounds may require a premium account to complete setup for background use. YouTube videos not supported.
  Category: formatting
  Icon: video-alt3
  Keywords: video
  Mode: preview
  Align: center
  SupportsAnchor: true
  SupportsAlign: wide center full
  SupportsInnerBlocks: true
--}}

@php

  // Video Source
  $vs = get_field('video_source');

  $video = '';

  switch($vs['value']) {
    case 'local_file':
    $url = get_field('local_file');
    $video = '<video autoplay muted loop preload disablePictureInPicture controlslist="nodownload"><source src="'.$url.'" type="video/mp4"></video>';
    break;
    case 'external_url':
    $url = get_field('video_source_url');
    $video = '<video autoplay muted loop preload disablePictureInPicture controlslist="nodownload"><source src="'.$url.'" type="video/mp4"></video>';
    break;
    case 'vimeo':
    // Load value.
    $video_id = get_field('video_id');
    $video = '<iframe src="https://player.vimeo.com/video/'.$video_id.'?background=1" frameborder="0" fullscreen allowfullscreen></iframe>';
    break;
  }


  // Block Height
  $fh = get_field('block_height');

  $height_class = '';

  switch($fh['value']) {
    case '50%':
    $height_class = 'has-50-height';
    break;
    case '75%':
    $height_class = 'has-75-height';
    break;
    case '100%':
    $height_class = 'has-full-height';
    break;
  }

@endphp

<div id="{{ $block['id'] }}" class="{{ $block['classes'] }} position-relative custom-block {!! $height_class !!} my-0">
    <div class="content position-absolute d-flex align-items-center">
      <div class="container">
        <InnerBlocks />
      </div>
    </div>
    {!! $video !!}
</div>
