<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class App extends Controller
{
    /**
     * Primary Nav Menu arguments
     * @return array
     */
    public function primarymenu() {
        $hamburger_bp = get_field('hamburger_breakpoint', 'option');
        $menu_bp = ' ';
        switch($hamburger_bp) {
            case 'd-flex':
                $menu_bp = 'd-none';
                break;
            case 'd-xl-flex d-xxl-none':
                $menu_bp = 'd-none d-xxl-flex';
                break;
            case 'd-lg-flex d-xl-none':
                $menu_bp = 'd-none d-xl-flex';
                break;
            case 'd-md-flex d-lg-none':
                $menu_bp = 'd-none d-lg-flex';
                break;
            case 'd-sm-flex d-md-none':
                $menu_bp = 'd-none d-md-flex';
                break;
            case 'd-flex d-sm-none':
                $menu_bp = 'd-none d-sm-flex';
                break;
        }
        $args = array(
            'theme_location'         => 'primary_navigation',
            'menu_class'             => 'navbar-nav flex-row',
            'container_class'        => $menu_bp,
            'walker'                 => new \App\wp_bootstrap4_navwalker(),
        );
      return $args;
    }

    public function canvasmenu() {
      $args = array(
        'theme_location'         => 'primary_navigation',
        'menu_class'             => 'navbar-nav',
        'walker'                 => new \App\wp_bootstrap4_navwalker(),
      );
      return $args;
    }

    public function footermenu() {
      $args = array(
        'theme_location'         => 'primary_navigation',
        'menu_class'             => 'navbar-nav',
        'walker'                 => new \App\wp_bootstrap4_navwalker(),
      );
      return $args;
    }

    public function canvasdirection() {
      return get_field('offcanvas_direction', 'option');
    }

    public function canvaswidth() {
      $cw = get_field('offcanvas_width', 'option');
      $width = '';
      switch($cw) {
        case '0':
        $width = '';
        break;
      case '1':
        $width = 'vw-100';
        break;
      }
      return $width;
    }

    public function canvasheight() {
      $ch = get_field('offcanvas_height', 'option');
      $height = '';
      switch($ch) {
        case '0':
        $height = '';
        break;
      case '1':
        $height = 'vh-100';
        break;
      }
      return $height;
    }

    public function header_bg() {
      $bg_color =  get_field('header_bg', 'option');
      $colour_class = 'has-'.$bg_color.'-background-color';

      return $colour_class;
    }

    public function hamburger_bg() {
      $color =  get_field('hamburger_bg', 'option');
      $colour_class = 'has-'.$color.'-background-color';

      return $colour_class;
    }

    public function footer_bg() {
      $bg_color =  get_field('footer_bg', 'option');
      $colour_class = 'has-'.$bg_color.'-background-color';

      return $colour_class;
    }

    public function logo()
    {
      return get_field('logo', 'option');
    }

    public function alt_logo()
    {
      return get_field('alt_logo', 'option');
    }

    public function siteName()
    {
        return get_bloginfo('name');
    }

    public static function title()
    {
        if (is_home()) {
            if ($home = get_option('page_for_posts', true)) {
                return get_the_title($home);
            }
            return __('Latest Posts', 'sage');
        }
        if (is_archive()) {
            return get_the_archive_title();
        }
        if (is_search()) {
            return sprintf(__('Search Results for %s', 'sage'), get_search_query());
        }
        if (is_404()) {
            return __('Not Found', 'sage');
        }
        return get_the_title();
    }

    // Header Scripts
    public function header_scripts() {
      return get_field('header_scripts', 'option');
    }

    // Footer Scripts
    public function footer_scripts() {
      return get_field('footer_scripts', 'option');
    }

    // Header Style
    public function header_style() {
      return get_field('header_style', 'option');
    }

    // Hamburger Style
    public function hamburger_style() {
      return get_field('hamburger_style', 'option');
    }

    // Hamburger Breakpoint
    public function hamburger_breakpoint() {
      return get_field('hamburger_breakpoint', 'option');
    }
}
