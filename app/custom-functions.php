<?php

namespace App;

/**
* Filter the upload size limit for administrators.
*
* @param string $size Upload size limit (in bytes).
* @return int (maybe) Filtered size limit.
*/
add_filter( 'upload_size_limit', function ( $size ) {
  // Set the upload size limit to 610 MB for users lacking the 'manage_options' capability.
  if ( current_user_can( 'manage_options' ) ) {
    $size = 640000000;
  }
  return $size;
}, 20 );


// Populate select fields with chosen colours
// from Theme Settings page.
add_filter('acf/load_field/name=header_bg', function( $field ) {

  // reset choices
  $field['choices'] = array();

  // if has rows
  if( have_rows('colours', 'option') ) {
        
    // while has rows
    while( have_rows('colours', 'option') ) {
        
        // instantiate row
        the_row();
        
        
        // vars
        $value = sanitize_title_with_dashes( get_sub_field('name') );
        $label = get_sub_field('name');

        
        // append to choices
        $field['choices'][ $value ] = $label;
        
    }
    
}


// return the field
return $field;

});

add_filter('acf/load_field/name=footer_bg', function( $field ) {

  // reset choices
  $field['choices'] = array();

  // if has rows
  if( have_rows('colours', 'option') ) {
        
    // while has rows
    while( have_rows('colours', 'option') ) {
        
        // instantiate row
        the_row();
        
        
        // vars
        $value = sanitize_title_with_dashes( get_sub_field('name') );
        $label = get_sub_field('name');

        
        // append to choices
        $field['choices'][ $value ] = $label;
        
    }
    
}


// return the field
return $field;

});

add_filter('acf/load_field/name=hamburger_bg', function( $field ) {

  // reset choices
  $field['choices'] = array();

  // if has rows
  if( have_rows('colours', 'option') ) {
        
    // while has rows
    while( have_rows('colours', 'option') ) {
        
        // instantiate row
        the_row();
        
        
        // vars
        $value = sanitize_title_with_dashes( get_sub_field('name') );
        $label = get_sub_field('name');

        
        // append to choices
        $field['choices'][ $value ] = $label;
        
    }
    
}


// return the field
return $field;

});

// Populate Masonry block post Select with post types.
add_filter('acf/load_field/name=post_type', function ($field)
  {
      foreach ( get_post_types( '', 'names' ) as $post_type ) {
        $field['choices'][$post_type] = $post_type;
      }

      // return the field
      return $field;
  }
);

// Add after theme setup
add_action( 'after_setup_theme', function () {
  // Add extra Gutenberg alignment
  add_theme_support( 'align-wide' );
  // Disable custom font sizes
  add_theme_support( 'disable-custom-font-sizes' );
  // Add custom line height
  // add_theme_support( 'custom-line-height' );
  // Add responsive embeds support
  add_theme_support( 'responsive-embeds' );
  // Add custom padding
  add_theme_support( 'custom-spacing' );
  // Add appearance tools
  add_theme_support( 'appearance-tools' );
} );

// Font sizes in Gutenberg
add_theme_support(
    'editor-font-sizes',
    array(
      array(
          'name'      => __( 'Small', 'sage' ),
          'shortName' => __( 'S', 'sage' ),
          'size'      => 12,
          'slug'      => 'small'
      ),
      array(
          'name'      => __( 'Body', 'sage' ),
          'shortName' => __( 'R', 'sage' ),
          'size'      => 16,
          'slug'      => 'body'
      ),
        array(
            'name'      => __( 'H6', 'sage' ),
            'shortName' => __( 'H6', 'sage' ),
            'size'      => 20,
            'slug'      => 'h6'
        ),
        array(
            'name'      => __( 'H5', 'sage' ),
            'shortName' => __( 'H5', 'sage' ),
            'size'      => 25,
            'slug'      => 'h5'
        ),
        array(
            'name'      => __( 'H4', 'sage' ),
            'shortName' => __( 'H4', 'sage' ),
            'size'      => 31.25,
            'slug'      => 'h4'
        ),
        array(
            'name'      => __( 'H3', 'sage' ),
            'shortName' => __( 'H3', 'sage' ),
            'size'      => 39.06,
            'slug'      => 'h3'
        ),
        array(
            'name'      => __( 'H2', 'sage' ),
            'shortName' => __( 'H2', 'sage' ),
            'size'      => 48.83,
            'slug'      => 'h2'
        ),
        array(
            'name'      => __( 'H1', 'sage' ),
            'shortName' => __( 'H1', 'sage' ),
            'size'      => 61.04,
            'slug'      => 'h1'
        ),
        array(
            'name'      => __( 'Display', 'sage' ),
            'shortName' => __( 'Display', 'sage' ),
            'size'      => 76.29,
            'slug'      => 'display'
        )
    )
);

/*
 * Wrap iframe and embed in div
 */
add_filter('the_content', function ($content) {
   // match any iframes
   $pattern = '~<iframe.*</iframe>|<embed.*</embed>~';
   preg_match_all($pattern, $content, $matches);

   foreach ($matches[0] as $match) {
       // wrap matched iframe with div
       $wrappedframe = '<div class="ratio 16x9">' . $match . '</div>';

       //replace original iframe with new in content
       $content = str_replace($match, $wrappedframe, $content);
   }

   return $content;
  }
);


// Rename posts in the admin menu
add_action('init', function() {
  if( function_exists('acf_add_options_page') ) {

    $rename = get_field('rename_posts', 'option');

    if($rename) {

      add_action( 'admin_menu', function() {
        $new_name = get_field('posts_new_name', 'option');
        $singular_name = get_field('post_singular_name', 'option');
        global $menu;
        global $submenu;
        $submenu['edit.php'][5][0]   = $new_name;
        $submenu['edit.php'][10][0]  = 'Add new '.$singular_name;
        $submenu['edit.php'][16][0]  = 'Tags';
        $menu[5][0]                  = $new_name;
      }  );


      // Rename the buttons/labels in the Post section
      add_action( 'init', function() {
        $new_name = get_field('posts_new_name', 'option');
        $singular_name = get_field('post_singular_name', 'option');
        global $wp_post_types;
        $labels                      = $wp_post_types['post']->labels;
        $labels->name                = $new_name;
        $labels->singular_name       = $singular_name;
        $labels->add_new             = 'Add '.$singular_name;
        $labels->add_new_item        = 'Add '.$singular_name;
        $labels->edit_item           = 'Edit '.$singular_name;
        $labels->new_item            = $singular_name;
        $labels->view_item           = 'View '.$new_name;
        $labels->search_items        = 'Search '.$new_name;
        $labels->not_found           = 'No '.$new_name.' found';
        $labels->not_found_in_trash  = 'No '.$new_name.' found in Trash';
        $labels->all_items           = 'All '.$new_name;
        $labels->menu_name           = $new_name;
        $labels->name_admin_bar      = $new_name;
      }  );
    }
  }
});


// ACF Pro Options Page(s)
if( function_exists('acf_add_options_page') ) {

  $option_page = acf_add_options_page(array(
    'page_title' 	=> 'Theme Settings',
    'menu_title' 	=> 'Theme Settings',
    'menu_slug' 	=> 'them-settings',
    'capability' 	=> 'edit_posts',
    'icon_url'    => 'dashicons-welcome-view-site',
    'redirect'    => false,
    'position'    => 2,
	));

	$option_page = acf_add_options_page(array(
    'page_title' 	=> 'Custom Post Type Manager',
    'menu_title' 	=> 'Custom Post Type Manager',
    'menu_slug' 	=> 'custom-post-types',
    'capability' 	=> 'edit_posts',
    'icon_url'    => 'dashicons-welcome-widgets-menus',
    'redirect'    => false,
    'position'    => 3,
	));

  add_action( 'after_setup_theme', function () {
  // Add custom colours to palette
    $colours = get_field('colours', 'options');
    if ( $colours ):
      foreach($colours as $col) {
        $name     = esc_attr__($col['name'], 'sage');
        $slug     = sanitize_title_with_dashes($col['name']);
        $colour   = $col['colour'];
        $newColorPalette[] = array('name' => $name, 'slug' => $slug, 'color' => $colour);
      }
    endif;
    if ( !$newColorPalette ):
      add_theme_support( 'editor-color-palette', $newColorPalette );
    endif;

    // Enable Gutenberg in WooCommerce product
    if ( class_exists( 'woocommerce' ) ) {
      if( get_field('use_gutenberg', 'options') ):
        add_filter( 'use_block_editor_for_post_type', function ( $can_edit, $post_type ) {

            if ( $post_type == 'product' ) {
                $can_edit = true;
            }
            return $can_edit;
        }, 10, 2 );
      endif;
    }
  });
}

// AJAX update cart totals
add_filter( 'woocommerce_add_to_cart_fragments', function ( $fragments ) {
    ob_start();
    ?>
<a class="cart-contents" href="<?php echo wc_get_cart_url(); ?>" title="<?php _e( 'View your shopping cart' ); ?>"><span class="hidden-xs"><?php echo sprintf (_n( '%d</span>' . ' <span class="item-count"> item</span>', '%d</span>' . ' <span class="item-count"> items</span>', WC()->cart->get_cart_contents_count() ), WC()->cart->get_cart_contents_count() ); ?> - </span><?php echo WC()->cart->get_cart_total(); ?></a>
    <?php
 
    $fragments['a.cart-contents'] = ob_get_clean();
 
    return $fragments;
} );

/*
 * Allow svg files to be uploaded
 */
add_filter('upload_mimes', function ($mimes) {
 
  if ( is_admin() ) {
    $mimes['svg'] = 'image/svg+xml';
  }
 
  return $mimes;
 
});
 
add_filter('wp_check_filetype_and_ext', function($data, $file, $filename, $mimes) {
 
  if ( is_admin() ) {
    $filetype = wp_check_filetype( $filename, $mimes);
 
    return [
      'ext'             => $filetype['ext'],
      'type'            => $filetype['type'],
      'proper_filename' => $data['proper_filename']
    ];
 
  } else {
    return $data;
  }
 
}, 10, 4);

// Enqueue AJAX
add_action( 'wp_enqueue_scripts', function() {
  // Enqueue the script with the AJAX function.
  wp_enqueue_script( 'my-ajax-script', get_template_directory_uri() . '/load-more/load-more.js', array( 'jquery' ), '1.0', true );

  // Localize the script with the AJAX URL.
  wp_localize_script( 'my-ajax-script', 'myAjax', array(
    'ajax_url' => admin_url( 'admin-ajax.php' )
  ));
} );

// Load more posts
function load_more_posts() {
  $page = $_POST['page'];

  // Use the page number to get the next set of posts.
  $args = array(
    'post_type'       => 'post',
    'posts_per_page'  => get_option( 'posts_per_page' ),
    'paged'           => $page
  );
  $query = new WP_Query( $args );

  // Loop through the posts and output them.
  if ( $query->have_posts() ) {
    while ( $query->have_posts() ) {
      $query->the_post();
      // Output the HTML for each post.
      // Make sure to use the same HTML structure as your existing posts.
      echo '<p class="h1">'.the_title().'</p>';
    }
  }

  wp_die(); // Always include this at the end of your AJAX function.
}
add_action( 'wp_ajax_load_more_posts', 'load_more_posts' );
add_action( 'wp_ajax_nopriv_load_more_posts', 'load_more_posts' );
