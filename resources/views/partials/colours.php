<?php

namespace App;

/*
 * Get colours from options page.
 * Loop through them to generate classes.
*/

$colours = get_field('colours', 'options');

echo '<style>';

  foreach($colours as $col):

    $name     = $col['name'];
    $slug     = sanitize_title_with_dashes($col['name']);
    $colour   = $col['colour'];

    echo '
    .has-'.$slug.'-background-color,
    .has-'.$slug.'-background-color:before,
    .has-'.$slug.'-background-color:after {
      background-color: '.$colour.' !important;
    }
    .has-'.$slug.'-color {
      color: '.$colour.' !important;
    }';

  endforeach;

echo '</style>';
