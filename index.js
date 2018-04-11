
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

	// setRandomPoints(idArray);

	findTestPoints(idArray);

	idArray = [];

}

function set(x, y, value) {
	document.getElementById(x + "-" + y).setAttribute("class", value);
}

var cDistance = 99999;
var fDistance = -1;

function findTestPoints(points) {

	var closest = [];
	var furthest = [];

	for (var i = 0; i < points.length; i++) {

		var point = points[i].split("-");
		var x =  point[0];
		var y = point[1];

		var a = Math.pow(parseInt(x), 2);
		var b = Math.pow(parseInt(y), 2);
		var d = Math.sqrt(a + b);
		print(d);

		if (d < cDistance) {
			cDistance = d;
			closest = [x, y];
		}
		if (d > fDistance) {
			fDistance = d;
			furthest = [x, y];
		}

	}

	var testPoints = [furthest[0], furthest[1], closest[0], closest[1]];

	grouping(points, testPoints);
}

function grouping(points, testPoints) {

	var groupATemp = [];
	var groupBTemp = [];

	var x1 = parseInt(testPoints[0]);
	var y1 = parseInt(testPoints[1]);
	var x2 = parseInt(testPoints[2]);
	var y2 = parseInt(testPoints[3]);

	var slope =  Math.abs((y2 - y1) / (x2 - x1));

	var midpointX = (x2 + x1) / 2;
	var midpointY = (y2 + y1) / 2;

	var yIntercept = midpointY - (midpointX * slope);

	for (var i = 0; i < points.length; i++) {
		var x = points[i].split("-")[0];
		var y = points[i].split("-")[1];

		var yl = (slope * x) + yIntercept;

		var dy = yl - y;

		if (dy > 0) {
			set(x, y, "groupA");
			groupATemp.push(points[i]);
		} else if (dy < 0) {
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

	set(x1, y1, "testPoint");
	set(x2, y2, "testPoint");

	// if ((groupATemp.length == groupA.length && flag != 0)) {
	// 	print("yay");

	// } else {
		
	// 	flag = flag + 2;

	// 	print("Nope");

	// 	groupA = groupATemp;
	// 	groupB = groupBTemp;

	// 	set(x1, y1, "grid");
	// 	set(x2, y2, "grid");

	// 	grouping(points);

	// }



}


function createGrid() {
	document.write("<table>");

	for (var y = height; y >= 0; y--) {
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