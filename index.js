
var width = 30
var height = 30

var groupA = [];
var groupB = [];
var flag = 0;

function init() {
	createGrid();

}

function getAllPoints() {

	var idArray = [];

	$('.point').each(function () {
	    idArray.push(this.id);
	});


	kmeans(idArray, 2, 2, 28, 29);
}

var j = 0;

function kmeans(points, centroiaAx, centroiaAy, centroiaBx, centroiaBy) {
	var clusterRed = [];
	var clusterBlue = [];

	set(centroiaAx, centroiaAy, "testPoint");
	set(centroiaBx, centroiaBy, "testPoint");

	for (var i = 0; i < points.length; i++) {

		let point = points[i].split("-");
		var x1 = parseInt(point[0]);
		var y1 = parseInt(point[1]);

		var d1 = getDistance(x1, y1, centroiaAx, centroiaAy);
		var d2 = getDistance(x1, y1, centroiaBx, centroiaBy);

		if (d1 < d2) {
			clusterRed.push(points[i])
			set(x1, y1, "groupB");
		} else {
			clusterBlue.push(points[i])
			set(x1, y1, "groupA");
		}
	}

	var ca = getPointAverage(clusterRed);
	var cb = getPointAverage(clusterBlue);

	if (j <= 50) {
		j++;
		set(centroiaAx, centroiaAy, "grid");
		set(centroiaBx, centroiaBy, "grid");
		kmeans(points, ca[0], ca[1], cb[0], cb[1]);
	} 

}

function getPointAverage(points) {

	var xSum = 0;
	var ySum = 0;

	for (var i = 0; i < points.length; i++) {
		let point = points[i].split("-");
		var x1 = parseInt(point[0]);
		var y1 = parseInt(point[1]);

		xSum += x1;
		ySum += y1;
	}

	var x = Math.round(xSum / points.length);
	var y = Math.round(ySum / points.length);

	return [x, y];
}

function getDistance(x1, y1, x2, y2) {
	var a = Math.pow((x2 - x1), 2);
	var b = Math.pow((y2 - y1), 2);
	var d = Math.sqrt(a + b);
	return d;
}







function makePoint() {
	$("td").click(function(event) {
   		var id = event.target.id
   		$("#" + id).attr('class', 'point');

    });
}

function set(x, y, value) {
	document.getElementById(x + "-" + y).setAttribute("class", value);
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