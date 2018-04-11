
var width = 30
var height = 30
var idArray = [];

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
	$('.point').each(function () {
	    idArray.push(this.id);
	});

	for (var i = 0; i < idArray.length; i++) {
		print(idArray[i]);
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