<?php
/*
Plugin Name: Table2Chart
Plugin URI: http://www.antoniorinaldi.it/from-table-to-chart-in-wordpress/
Description: The plugin draws a chart from a table using HighCharts JS library
Version: 0.5
Author: Antonio Rinaldi
Author URI: http://www.antoniorinaldi.it
*/

/*
Table2Chart (Wordpress Plugin)
Copyright (C) 2013 Antonio Rinaldi
Contact me at http://www.antoniorinaldi.it/from-table-to-chart-in-wordpress/
This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

IMPORTANT NOTE: The above statement does NOT substitute HighCharts terms of use. HighCharts use is free for a personal or non-profit project under the Creative Commons Attribution-NonCommercial 3.0 License. Anyway please refer to HighCharts license page http://shop.highsoft.com/highcharts.html to check the HighCharts precise license conditions.  
*/

T2Cc::setup();

class T2Cc {

public static function initialize() {
DEFINE("T2C_TABLE", "1");
DEFINE("T2C_TYPE", "column");
DEFINE("T2C_BACKGROUND", "#ffffff");
DEFINE("T2C_COLOR", "#ff0000,#00ff00,#0000ff,#00ffff,#ff00ff,#ffff00");
DEFINE("T2C_WIDTH", "500");
DEFINE("T2C_HEIGHT", "400");
DEFINE("T2C_ORDER", "column");
DEFINE("T2C_NAMECOL", "1");
DEFINE("T2C_NAMEROW", "1");
DEFINE("T2C_CONVERT", "true");
DEFINE("HIDE", "false");
}

public static function setup() {
self::initialize();
//tell wordpress to register the T2C shortcode

add_shortcode("Table2Chart", array ( __CLASS__,"Table2Chart_handler"));

}
  
public static function Table2Chart_handler($incomingfrompost,$content=null) {
	wp_enqueue_script("jquery");
	wp_enqueue_script("highcharts", ((file_exists(plugin_dir_path(__FILE__) .  "highcharts.js")) ? plugin_dir_url(__FILE__) : "http://code.highcharts.com/") . "highcharts.js" ,array("jquery"),null,false);
//	wp_enqueue_script("highcharts-more", ((file_exists(plugin_dir_path(__FILE__) .  "highcharts-more.js")) ? plugin_dir_url(__FILE__) : "http://code.highcharts.com/") . "highcharts-more.js" ,array("jquery"),null,false);
//	wp_enqueue_script("Table2Chart", plugins_url( "table2chart.js", __FILE__ ),array("jquery","highcharts","highcharts-more"),null,false);
	wp_enqueue_script("Table2Chart", plugins_url( "table2chart.js", __FILE__ ),array("jquery","highcharts"),null,false);
	$patts=shortcode_atts(array(
    "table" => T2C_TABLE,
    "type" => T2C_TYPE,
    "chart" => "",
    "title" => "",
    "subtitle" => "",
    "titlex" => "",
    "titley" => "",
    "background" => T2C_BACKGROUND,
	"color" => T2C_COLOR,
    "width" => T2C_WIDTH,
    "height" => T2C_HEIGHT,          
    "order" => T2C_ORDER,
    "namecol" => T2C_NAMECOL,
    "namerow" => T2C_NAMEROW,
    "excludecols" => "",
    "excluderows" => "",
    "includecols" => "",
    "includerows" => "",
    "hide" => T2C_HIDE,            
    "convert" => T2C_CONVERT            
  ), $incomingfrompost);
  //run function that actually does the work of the plugin
  static $T2C_prog;
//  $rnd=mt_rand(); removed to improve performance when using cache plugins or cdn services 
  $rnd="";
  $T2C = "";
  if (! $T2C_prog) $T2C_prog=0; 	
  $T2C_prog++;
  $T2C .="<div class=\"Table2Chart\" id=\"container-HC-" . $T2C_prog . "-" . $rnd . "\" style=\"width:" . esc_attr($patts["width"]) . "px; height:" . esc_attr($patts["height"]) . "px; margin: 0 auto 1em\"></div>\n<script id=\"script-container-HC-"  . $T2C_prog . "-" . $rnd . "\" type=\"application/json\">";
    $T2C .= '{';
  $T2C .='"table":' . ($patts["table"]-1) . ',';
  $T2C .='"height":' . $patts["height"] . ',';  
  $T2C .='"width":' . $patts["width"] . ',';  
  $T2C .='"type":"' . $patts["type"] . '",';
  if ($patts["title"]!="") $T2C .='"title":"' . $patts["title"] . '",';
  if ($patts["subtitle"]!="") $T2C .='"subtitle":"' . $patts["subtitle"] . '",';
  if ($patts["titlex"]!="") $T2C .='"titleX":"' . $patts["titlex"] . '",';
  if ($patts["titley"]!="") $T2C .='"titleY":"' . $patts["titley"] . '",';
  $T2C .='"color":"' . $patts["color"] . '",';
  $T2C .='"background":"' . $patts["background"] . '",';
  $T2C .='"order":"' . $patts["order"] . '",';
  $T2C .='"namecol":"' . $patts["namecol"] . '",';
  $T2C .='"namerow":"' . $patts["namerow"] . '",';
  if ($patts["excludecols"]!="") $T2C .='"excludecols":"' . $patts["excludecols"] . '",';
  if ($patts["excluderows"]!="") $T2C .='"excluderows":"' . $patts["excluderows"] . '",';
  if ($patts["includecols"]!="") $T2C .='"includecols":"' . $patts["includecols"] . '",';
  if ($patts["includerows"]!="") $T2C .='"includerows":"' . $patts["includerows"] . '",';
  $T2C .='"convert":' . (($patts["convert"]=="false") ? "false" : "true") . ',';
  $T2C .='"hide":' . (($patts["hide"]=="true") ? "true" : "false");
  $T2C .='}' ;
  $T2C .="</script>\n"; 
  if ($patts["chart"]!="") {
  $T2C .="<script id=\"script-obj2-container-HC-"  . $T2C_prog . "-" . $rnd . "\" type=\"text/template\">";
  $T2C .= str_replace(">","]",str_replace("<","[",$patts["chart"]));  
  $T2C .="</script>\n"; 
  }
  if (!is_null( $content )) {
  $T2C .="<script id=\"script-obj-container-HC-"  . $T2C_prog . "-" . $rnd . "\" type=\"text/template\">";
  $e2r=array("<br />\n","&#8216;","&#8217;","&#8220;","&#8221;");
  $er=array("\n","'","'","\"","\"","\"");
  $T2C .= str_replace($e2r,$er,html_entity_decode($content));  
//  $T2C .= $content;  
//  $T2C .= preg_replace("/<br \/>\n/","\n",$content);  
  $T2C .="</script>\n"; 
  }
  return $T2C;
}

}

?>