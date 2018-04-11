
var width = 30
var height = 30

var groupA = [];
var groupB = [];
var flag = 0;

function init() {
	createGrid();

}

function makePoint() {
	$("td").click(function(event) {
   		var id = event.target.id
   		$("#" + id).attr('class', 'point');

    });
}

function getAllPoints() {

	var idArray = [];

	$('.point').each(function () {
	    idArray.push(this.id);
	});

	setRandomPoints(idArray);

	idArray = [];

}

function set(x, y, value) {
	document.getElementById(x + "-" + y).setAttribute("class", value);
}




function setRandomPoints(points) {

	var groupATemp = [];
	var groupBTemp = [];

	var x1 = rand(2, width - 2);
	var y1 = rand(2, height - 2);
	var x2 = rand(2, width - 2);
	var y2 = rand(2, height - 2);

	set(x1, y1, "testPoint");
	set(x2, y2, "testPoint");

	var slope =  Math.abs((y2 - y1) / (x2 - x1));

	var midpointX = (x2 + x1) / 2;
	var midpointY = (y2 + y1) / 2;


	var yIntercept = midpointY - (midpointX * slope);

	for (var i = 0; i < points.length; i++) {
		var x = points[i].split("-")[0];
		var y = points[i].split("-")[1];

		var yl = (slope * x) + yIntercept;

		var dy = yl - y;

		if (dy > 0 && slope > 0) {
			set(x, y, "groupA");
			groupATemp.push(points[i]);
		} else if (dy > 0 && slope < 0) {
			set(x, y, "groupA");
			groupATemp.push(points[i]);
		} else if (dy < 0 && slope > 0) {
			set(x, y, "groupB");
			groupBTemp.push(points[i]);
		} else if (dy < 0 && slope < 0) {
			set(x, y, "groupB");
			groupBTemp.push(points[i]);
		}
	}

	print("aTemp" + ": " +  groupATemp);
	print("A" + ": " +  groupA);
	
	print("bTemp" + ": " +  groupBTemp);
	print("B" + ": " +  groupB);
	
	print(groupATemp.length == groupA.length);
	print(groupBTemp.length == groupB.length);

	print("");

	if ((groupATemp.length == groupA.length && flag != 0)) {
		print("yay");


	} else {
		
		flag = flag + 2;

		print("Nope");

		groupA = groupATemp;
		groupB = groupBTemp;

		set(x1, y1, "grid");
		set(x2, y2, "grid");

		setRandomPoints(points);

	}



}


function createGrid() {
	document.write("<table>");
	for (var y = 0; y < height; y++) {
		document.write("<tr>");
		for (var x = 0; x < width; x++) {
			document.write("<td class='grid' id='"+ x + '-' + y + "'></td>");
		}

		document.write("</tr>");
	}

	document.write("</table>");
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

function print(x) {
	console.log(x);
}


$(document).ready(function() {

	makePoint()

	$(document).keypress(function(event) {
		if (event.which == 13) {
			getAllPoints();
		}


	});

})


init();