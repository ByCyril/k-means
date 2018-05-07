
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