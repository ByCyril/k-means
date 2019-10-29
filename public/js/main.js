let canvasHeight = 500;
let canvasWidth = 500;

var points = [];
var centroidA = [];
var centroidB = [];

var redClusterPoints = [];
var blueClusterPoints = [];

flag = 0;
iteration = 50;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(0);

  drawPoints();
  retainCentroids();

  drawRedCluster();
  drawBlueCluster();

  if (mouseIsPressed) {
    stroke(255);
    strokeWeight(10);
    points.push([mouseX, mouseY]);
  }
}

function keyPressed() {
  kmeans(points, 2, 2, 490, 490);
}

async function kmeans(points, centroidAx, centroidAy, centroidBx, centroidBy) {
  centroidA = [centroidAx, centroidAy];
  centroidB = [centroidBx, centroidBy];

  var blueCluster = [];
  var redCluster = [];

  await drawCentroid(centroidAx, centroidAy);
  await drawCentroid(centroidBx, centroidBy);

  await sleep();

  for (var i = 0; i < points.length; i++) {
    let point = points[i];
    let x1 = point[0];
    let y1 = point[1];

    var d1 = getDistance(x1, y1, centroidAx, centroidAy);
    var d2 = getDistance(x1, y1, centroidBx, centroidBy);

    if (d1 < d2) {
      redCluster.push(points[i]);
      await drawRedCluster();
    } else {
      blueCluster.push(points[i]);
      await drawBlueCluster();
    }
  }

  redClusterPoints = redCluster;
  blueClusterPoints = blueCluster;

  var ca = getPointAverage(redCluster);
  var cb = getPointAverage(blueCluster);

  if (flag <= iteration) {
    flag++;

    await drawCentroid(centroidAx, centroidAy);
    await drawCentroid(centroidBx, centroidBy);
    await sleep();

    kmeans(points, ca[0], ca[1], cb[0], cb[1]);
  }
}
