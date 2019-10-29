function drawPoints() {
  for (p of points) {
    point(p[0], p[1]);
  }
}

async function drawCentroid(x, y) {
  await sleep();
  stroke(255, 255, 0);
  strokeWeight(10);
  point(x, y);
}

function retainCentroids() {
  if (centroidA.length != 0) {
    stroke(255, 255, 0);
    strokeWeight(10);
    point(centroidA[0], centroidA[1]);
  }

  if (centroidB.length != 0) {
    stroke(255, 255, 0);
    strokeWeight(10);
    point(centroidB[0], centroidB[1]);
  }
}

async function drawRedCluster() {
  if (redClusterPoints.length != 0) {
    for (p of redClusterPoints) {
      stroke(255, 0, 0);
      strokeWeight(10);
      point(p[0], p[1]);
    }
  }
}

async function drawBlueCluster() {
  if (blueClusterPoints.length != 0) {
    for (p of blueClusterPoints) {
      stroke(0, 0, 255);
      strokeWeight(10);
      point(p[0], p[1]);
    }
  }
}

function getPointAverage(points) {
  var xSum = 0;
  var ySum = 0;

  for (var i = 0; i < points.length; i++) {
    let point = points[i];
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
  var a = Math.pow(x2 - x1, 2);
  var b = Math.pow(y2 - y1, 2);
  var d = Math.sqrt(a + b);
  return d;
}

function sleep() {
  return new Promise(resolve => setTimeout(resolve, 75));
}
