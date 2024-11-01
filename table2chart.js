Array.prototype.transpose = function() {

  // Calculate the width and height of the Array
  var a = this,
    w = a.length ? a.length : 0,
    h = a[0] instanceof Array ? a[0].length : 0;
		
  // In case it is a zero matrix, no transpose routine needed.
  if(h === 0 || w === 0) { return []; }

  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i, j, t = [];

  // Loop through every item in the outer array (height)
  for(i=0; i<h; i++) {

    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for(j=0; j<w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  return t;
};

function rgb2rgba(rgb,op) {
if (rgb.length!=7 || op<0 || op>1 || rgb.charAt(0)!="#") return rgb;
var rgba=[];for (var i=0;i<6;i++) {rgba[i]="0123456789ABCDEF".indexOf(rgb.toUpperCase().charAt(i+1));}
return "rgba("+(rgba[0]*16+rgba[1])+","+(rgba[2]*16+rgba[3])+","+(rgba[4]*16+rgba[5])+","+op+")";
}

jQuery(document).ready(function() {


	jQuery( "body div.Table2Chart" ).each(function() {
	// initialize variables
	// --------------------
		if ((this.id).indexOf("container-HC-")!=0) return;
		var opt=jQuery.parseJSON(document.getElementById("script-"+this.id).innerHTML);
		var colors=(opt['color']) ? (opt['color'].split(",")) : ['#cccccc'];
		var table=document.getElementById(this.id).parentNode
		var ochart,oopt;
		var fobj=document.getElementById("script-obj-"+this.id);
		if (fobj) oopt=eval("({"+fobj.innerHTML+"})"); 
		if (opt['table']<0) ochart=jQuery.extend(true,((oopt) ? oopt : {}),{chart:{renderTo: this.id}});
		else {
			if (table.getElementsByTagName('table').length>0) {
				table=table.getElementsByTagName('table')[opt['table']];
			}
			else
			{
				table=table.parentNode.getElementsByTagName('table')[opt['table']];
			}
			if (opt['hide']==true) table.style.display="none";
			var namecol = (opt['namecol']) ? parseInt(opt['namecol'])-1 : 0;
			var namerow = (opt['namerow']) ? parseInt(opt['namerow'])-1 : 0;
			
			var xLabels=[], sNames=[], dataValues=[];
			var excludecols=(opt['excludecols']) ? opt['excludecols'].split(",") : [];
			var excluderows=(opt['excluderows']) ? opt['excluderows'].split(",") : [];
			var includecols=(opt['includecols']) ? opt['includecols'].split(",") : [];
			var includerows=(opt['includerows']) ? opt['includerows'].split(",") : [];
			//var k=-1;
			var r2s=includerows;
			if (r2s.length==0) {
				for (var i=0,row;row=table.rows[i];i++) {
					if (i!=namerow && jQuery.inArray((i+1)+"", excluderows)==-1) r2s.push((i+1)+"")
				}
			}
			r2s.unshift((namerow+1)+"");
			var c2s=includecols;
			if (c2s.length==0) {
				for (var j=0,col;col=table.rows[namerow].cells[j];j++) {
					if (j!=namecol && jQuery.inArray((j+1)+"", excludecols)==-1) c2s.push((j+1)+"")
				}
			}
			c2s.unshift((namecol+1)+"");

		// read table data
		// ---------------
			if (opt['order']=='column') {
				var lo1=c2s,lo2=r2s;
			}
				else {
			var lo1=r2s,lo2=c2s;
			}
			
			for (j=0;j<lo1.length;j++) {
				if (j>0) dataValues.push([]);
					k=dataValues.length-1;
				for (i=0;i<lo2.length;i++) {
					if ((i==0 && lo2[0]+0<=0) || (j==0 & lo1[0]+0<=0)) col=false; else {
						if (opt['order']=='column') col=table.rows[r2s[i]-1].cells[c2s[j]-1].textContent;
						else {col=table.rows[r2s[j]-1].cells[c2s[i]-1].textContent;}
					}
					if (i==0) {
						if (j>0) {if (!col==false) sNames.push(col)};
					}
					else if (j==0) {
						if (i>0) {if (!col==false) xLabels.push(col)};
					}
					else {
						coln=col.replace(/[^0-9\.,%-]+/g,"");
						if (opt['convert']==false) coln=coln.replace(",",""); else coln=coln.replace(".","").replace(",",".");
						coln=parseFloat(coln);
						dataValues[k].push(coln);
					}
				}
			}

		// deal with scatter and bubble chart
		// ----------------------------------
			if (opt['type']=="scatter" || opt['type']=="bubble") {
				//for (var i=0;i<dataValues.length;i++) {console.log(dataValues[i])}
				var scatterValues=[],scatterNames=[];
				var v2s=(opt['order']=="column") ? c2s : r2s;
				var sob=(opt['type']=="scatter") ? 0 : 1;
				opt['type']="scatter";
				//console.log(v2s);
				var mas=0;
				for (var i=1;i<v2s.length-1-sob;i=i+2+sob) {
					var d2t=[dataValues[parseInt(v2s[i])-2],dataValues[parseInt(v2s[i+1])-2]];
					if (sob==1) {
						d2t.push(dataValues[parseInt(v2s[i+2])-2]);
						var mass=Math.max.apply(Math,dataValues[parseInt(v2s[i+2])-2]);
						if (mass>mas) mas=mass;
					}
					scatterValues.push(d2t.transpose());
					scatterNames.push(sNames[i+sob]);
				}
				if (xLabels.length>0 || sob==1) {
					for (var i=0;i<scatterValues.length;i++) {
						for (var j=0;j<scatterValues[i].length;j++) {
							if (sob==1) {
								scatterValues[i][j]={x:scatterValues[i][j][0],y:scatterValues[i][j][1],size:scatterValues[i][j][2],marker:{radius:0},label:xLabels[j]};
							}
							else if (xLabels.length>0) scatterValues[i][j]={x:scatterValues[i][j][0],y:scatterValues[i][j][1],label:xLabels[j]};
						}
					}
					if (xLabels.length>0) {
						xLabels=[];
						if (!oopt) oopt={};
						jQuery.extend(true,oopt,{tooltip:{formatter:function(){return this.point.label}}});
					}
				}
				dataValues=scatterValues;
				sNames=scatterNames;
			}

		// build and draw chart object
		// ---------------------------
			var series=[];
			for (var i=0;i<dataValues.length;i++) {
				var co=colors[i%colors.length];
				series.push({data:dataValues[i],name: sNames[i],color:co});
				if (sob) if (sob==1) jQuery.extend(true,series[series.length-1],{marker:{symbol:'circle',fillColor:rgb2rgba(co,0.5),lineColor:co,lineWidth:1}}); 
			}
			ochart={
				chart: {
				renderTo: this.id,
				type: (opt['type']) ? opt['type'] : 'line',
				backgroundColor: (opt['background']) ? opt['background'] : '#FFFFFF',
						},
				title:{ text: (opt['title']) ? opt['title'] : ''},
				subtitle:{ text: (opt['subtitle']) ? opt['subtitle'] : ''},
				xAxis: {title: {text: (opt['titleX']) ? opt['titleX'] : null}, categories: xLabels},
				yAxis: {title: {text: (opt['titleY']) ? opt['titleY'] : null}},
				series: series
			};
			if (oopt) jQuery.extend(true,ochart,oopt); 
		}
		var chart = new Highcharts.Chart(ochart);
		if (sob==1 && !(opt['table']<0)) {
			var fb=Math.min(chart.plotWidth,chart.plotHeight)/20;
			for (var i=0;i<chart.series.length;i++) {
				var ser=chart.series[i];
				for (var j=0;j<ser.data.length;j++) {
					var r=Math.pow(ser.data[j].size/mas,0.5)*fb;
					ser.data[j].update({marker:{radius:r,states:{hover:{radius:r,lineWidth:2}}}});
				}
			}
		}
	});

});
