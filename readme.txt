=== Plugin Name ===
Contributors: rinaldi6109
Tags: table, tables, chart, charts, graph, graphs, highcharts
Requires at least: 3.5
Tested up to: 3.5
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Stable tag: 0.5

Table2Chart draws a chart gathering data from a table in the post.

== Description ==

Table2Chart enables a shortcode to draw a stylish, interactive chart reading numerical data from a table inserted in the same post. It uses the Highcharts JS library (*). 

(*) Please read http://www.highcharts.com/products/highcharts for informations.

In its simplest formulation, **[Table2Chart]** shortcode creates the chart from the first table in the post with default settings.
Several arguments can be specified (default values are within brackets):

* **table**: number which indicates the cardinal position of the table in the post to gather the data from (1)
* **width**: chart width in pixel (500)
* **height**: chart height in pixel (400)
* **type**: chart type to choose from *bar* (horizontal bars), *column* (vertical bars), *line*, *area* (column)
* **title**: chart title (empty)
* **subtitle**:	chart subtitle (empty)
* **titlex**: category axis title (empty)
* **titley**: value axis title (empty)
* **order**: *row* if data series are horizontal, *column* if they are vertical (column)
* **namecol**: position of the row containing the series or category titles (1)
* **namerow**: position of the column containing the series or category titles (1)
* **excluderows**: position of rows (e.g. 2 or 3,4) to exclude from the chart (empty)
* **excludecols**: position of columns (e.g. 2 or 5,6,7,8,9) to exclude from the chart (empty)
* **includerows**: if set, only the rows whose position is specified (e.g. 2 or 3,4) are included in the chart (empty)
* **includecols**: if set, only the columns whose position is specified (e.g. 2 or 5,6,7,8,9) are included in the chart (empty)
* **background**: background color in hexadecimal format (#ffffff)
* **color**: colors of data series (#ff0000,#00ff00,#0000ff,#00ffff,#ff00ff,#ffff00)
* **convert**: *true* if numerical values in the table are in continental (1.234,56) format, *false* otherwise (true)
* **hide**: *true* if the table has to be hidden, *false* otherwise (false)

In enclosing form the shortcode allows to customize every chart detail using HighCharts API syntax. See screeshots and http://www.antoniorinaldi.it/table2chart page for more information. 

== Installation ==

1. Upload the Table2Chart.zip file from the 'Plugins' section of Admin menu in WordPress

2. Activate the plugin from the 'Plugins' section of Admin menu in WordPress

Done. Now you can insert the shortcodes within your posts and pages.

== Frequently Asked Questions ==

= Where can I do any question about this plugin? =

Go to page http://http://www.antoniorinaldi.it/table2chart and write in the comments.

== Screenshots ==

1. Suppose to have the above table.

2. This is the chart inserted by shortcode [Table2Chart].

3. This is the chart inserted by shortcode [Table2Chart type="line" background="#fffff0" color="#50a0f0,#f0a050,#a0f050,#a050f0,f050a0"].

4. This is the chart inserted by shortcode [Table2Chart order="row" type="bar" background="#b0b0b0"].

5. Suppose to have the above table.

6. This is the chart inserted by shortcode [Table2Chart type="bubble" titlex="natural change %" titley="net migration rate %" background="#f0f0ff" color="#00d000"].

7. This is the chart inserted by shortcode:
[Table2Chart type="scatter" titlex="natural change %" titley="net migration rate %" background="#404040" color="#ff0000"]
legend: {enabled:false}
[/Table2Chart] 

Other examples can be found on http://http://www.antoniorinaldi.it/table2chart. 

== Changelog ==

= 0.5 =
* Added support for scatterplot and bubble plot.
* Added support for enclosing form and integration with HighCharts API.

= 0.4b =
* Fixed code to allow negative values.
* Fixed compatibility issue with IE 9.
* Added support for hide argument.
* Added compatibility with extra html tags put by CloudFlare service.

= 0.3 =

* Added support for arguments includerows and includecols.
* Fixed axis title setting (shortcode arguments have to be written in lower case).
* Added support for empty cells.
* Code rewritten to save shortcode arguments as application/json script rather than chart div content.

= 0.2c =

* Use a local version of HighCharts library v.2.3.5 which is not affected by a problem present in the new released v.3.0.
* Support of new parameters excluderows and excludecols to exclude some rows and columns from a chart.
* Allow jQuery to be placed in the footer of the page.
* Support for currency numbers ($, €, £, etcetera).
* Fixed wrong number (>1,000) conversion.   

= 0.1 =

 * First public release
 
 == Upgrade Notice ==

= 0.4b =
Solves a compatibility issue with IE 9 and a problem preventing display of negative values. 

= 0.2c =
Solves a problem in new released HighCharts library v.3.0 which makes previous plugin version no working anymore.

= 0.1 =
First public release
 
