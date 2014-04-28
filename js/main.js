var header = document.querySelector('header');

// FSS
// var renderer = new FSS.SVGRenderer();
// var scene = new FSS.Scene();
// var geometry = new FSS.Plane(header.offsetWidth, header.offsetHeight, 6, 4);
// var material = new FSS.Material('#FFFFFF', '#FFFFFF');
// var mesh = new FSS.Mesh(geometry, material);
// var light = new FSS.Light('#111122', '#FF0022');
// var now, start = Date.now();

window.onload = function () {
	// initializeFSS();
	// resizeFSS();
	// animateFSS();
};

function initializeFSS() {
	scene.add(mesh);
	scene.add(light);
	header.appendChild(renderer.element);
	window.addEventListener('resize', resizeFSS);
}

function resizeFSS() {
	renderer.setSize(header.offsetWidth, header.offsetHeight);
}

function animateFSS() {
	now = Date.now() - start;
	light.setPosition(300*Math.sin(now*0.001), 200*Math.cos(now*0.0005), 60);
	renderer.render(scene);
	requestAnimationFrame(animateFSS);
}