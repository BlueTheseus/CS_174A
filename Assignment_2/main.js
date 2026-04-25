import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

//THREE.PerspectiveCamera( fov angle, aspect ratio, near depth, far depth );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 5, 10);
controls.target.set(0, 5, 0);

// Rendering 3D axis
const createAxisLine = (color, start, end) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({ color: color });
    return new THREE.Line(geometry, material);
};
const xAxis = createAxisLine(0xff0000, new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 0, 0)); // Red
const yAxis = createAxisLine(0x00ff00, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 3, 0)); // Green
const zAxis = createAxisLine(0x0000ff, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 3)); // Blue
scene.add(xAxis);
scene.add(yAxis);
scene.add(zAxis);


// ***** Assignment 2 *****
// Setting up the lights
const pointLight = new THREE.PointLight(0xffffff, 100, 100);
pointLight.position.set(5, 5, 5); // Position the light
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0.5, .0, 1.0).normalize();
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x505050);  // Soft white light
scene.add(ambientLight);

const phong_material = new THREE.MeshPhongMaterial({
    color: 0x00ff00, // Green color
    shininess: 100   // Shininess of the material
});


// Start here.

const l = 0.5
const positions = new Float32Array([
    // Every three elements in this array are the x, y, z coordinates of a new vertex.
    // We use line breaks and comments for readability, but note that this is a 1D array.
    // Front face
    -l, -l,  l, // 0 -- bottom left
     l, -l,  l, // 1 -- bottom right
     l,  l,  l, // 2 -- top right
    -l,  l,  l, // 3 -- top left

    // Left face
    -l, -l, -l, // 4 -- bottom left
    -l, -l,  l, // 5 -- bottom right
    -l,  l,  l, // 6 -- top right
    -l,  l, -l, // 7 -- top left
  
    // Top face
	-l, l,  l, // 8
	 l, l,  l, // 9
	 l, l, -l, // 10
	-l, l, -l, // 11
  
    // Bottom face
	-l, -l, -l, // 12
	 l, -l, -l, // 13
	 l, -l,  l, // 14
	-l, -l,  l, // 15
  
    // Right face
    l, -l,  l, // 16 -- bottom left
    l, -l, -l, // 17 -- bottom right
    l,  l, -l, // 18 -- top right
    l,  l,  l, // 19 -- top left

     // Back face
     l, -l, -l, // 21 -- bottom left
    -l, -l, -l, // 20 -- bottom right
    -l,  l, -l, // 23 -- top right
     l,  l, -l, // 22 -- top left
  ]);
  
  const indices = [
    // Every three numbers in this array are the indices of the vertices that form a triangle.  
    // This is also a 1D array and we use line breaks and comments for readability.
    // Front face.
    0, 1, 2,
    0, 2, 3,
  
    // Left face
    4, 5, 6,
    4, 6, 7,
  
    // Top face
	8,  9, 10,
	8, 10, 11,
  
    // Bottom face
	12, 13, 14,
	12, 14, 15,
  
    // Right face
	16, 17, 18,
	16, 18, 19,

    // Back face
	20, 21, 22,
	20, 22, 23,
  ];
  
  // Compute normals
  const normals = new Float32Array([
    // Front face
    // Every three elements in this array are the x, y, z components of the normal vector for the front face.
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
  
    // Left face
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
  
    // Top face
	0, 1, 0,
	0, 1, 0,
	0, 1, 0,
	0, 1, 0,
  
    // Bottom face
	0, -1, 0,
	0, -1, 0,
	0, -1, 0,
	0, -1, 0,
  
    // Right face
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // Back face
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
  ]);

const custom_cube_geometry = new THREE.BufferGeometry();
custom_cube_geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
custom_cube_geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
custom_cube_geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));

// Implement wireframe geometry
const wireframe_vertices = new Float32Array([
	/* Note: Many duplicate segments are commented out for optimization but
	 * included as comments for completeness. */

	// Front face
	-l, -l,  l, // bottom front left -> bottom front right
	 l, -l,  l,
	 l, -l,  l, // bottom front right -> top front right
	 l,  l,  l,
	 l,  l,  l, // top front right -> top front left
	-l,  l,  l,
	-l,  l,  l, // top front left -> bottom front left
	-l, -l,  l,
	
	// Top face
	-l,  l, -l, // top back left -> top front left
	-l,  l,  l,
	//-l,  l,  l, // top front left -> top front right
	// l,  l,  l,
	 l,  l,  l, // top front right -> top back right
	 l,  l, -l,
	 l,  l, -l, // top back right -> top back left
	-l,  l, -l,

	// Left face
	-l, -l, -l, // bottom back left -> bottom front left
	-l, -l,  l,
	//-l,  l,  l, // bottom front left -> top front left
	//-l,  l,  l,
	//-l,  l,  l, // top front left -> top back left
	//-l,  l, -l,
	-l,  l, -l, // top back left -> bottom back left
	-l, -l, -l,

	// Right face
	 l, -l, -l, // bottom back right -> bottom front right
	 l, -l,  l,
	// l,  l,  l, // bottom front right -> top front right
	// l,  l,  l,
	// l,  l,  l, // top front right -> top back right
	// l,  l, -l,
	 l,  l, -l, // top back right -> bottom back right
	 l, -l, -l,

	// Bottom face
	//-l, -l, -l, // bottom back left -> bottom front left
	//-l, -l,  l,
	//-l, -l,  l, // bottom front left -> bottom front right
	// l, -l,  l,
	// l, -l,  l, // bottom front right -> bottom back right
	// l, -l, -l,
	 l, -l, -l, // bottom back right -> bottom back left
	-l, -l, -l,

	// Back face
	//-l, -l, -l, // bottom back left -> bottom back right
	// l, -l, -l,
	// l, -l, -l, // bottom back right -> top back right
	// l,  l, -l,
	// l,  l, -l, // top back right -> top back left
	//-l,  l, -l,
	//-l,  l, -l, // top back left -> bottom back left
	//-l, -l, -l,
]);

const wireframe_geometry = new THREE.BufferGeometry();
wireframe_geometry.setAttribute( 'position', new THREE.BufferAttribute(wireframe_vertices,3) );
const line = new THREE.LineSegments( wireframe_geometry );

// draw the cube
let cube = new THREE.Mesh( custom_cube_geometry, phong_material );
//scene.add(cube);
//scene.add(line);


function translationMatrix(tx, ty, tz) {
	return new THREE.Matrix4().set(
		1, 0, 0, tx,
		0, 1, 0, ty,
		0, 0, 1, tz,
		0, 0, 0, 1
	);
}

function rotationMatrixZ(theta) {
	return new THREE.Matrix4().set(
		Math.cos(theta), -Math.sin(theta), 0, 0,
		Math.sin(theta),  Math.cos(theta), 0, 0,
		         0,           0, 1, 0,
		         0,           0, 0, 1
	);
}

function scalingMatrix(sx, sy, sz) {
	return new THREE.Matrix4().set(
		sx,  0,  0, 0,
		 0, sy,  0, 0,
		 0,  0, sz, 0,
		 0,  0,  0, 1,
	)
}


let cubes = [];
for (let i = 0; i < 7; i++) {
	let cube = new THREE.Mesh(custom_cube_geometry, phong_material);
	cube.matrixAutoUpdate = false;
	cubes.push(cube);
	scene.add(cube);
}

let cubes_wireframe = [];
for (let i = 0; i < 7; i++) {
	let wireframe = new THREE.LineSegments(wireframe_geometry);
	wireframe.matrixAutoUpdate = false;
	wireframe.visible = false;
	cubes_wireframe.push(wireframe);
	scene.add(wireframe);
}

// Transform cubes
const delta_theta = (15/360)*2*Math.PI;
const scale_factor = 1; // TODO exercise 3: make the cubes taller using the scaling matrix transform. Make sure that the faces of the cuboid are still perpendicular to each other.

const translation = translationMatrix(l, l, 0);

const rotation_matrix = rotationMatrixZ(delta_theta*l);

const inverse_translation = translationMatrix(-l, -l, 0);

const final_translation = translationMatrix(0, 2*l, 0);

const scaling = scalingMatrix(1, scale_factor, 1);

let model_transformation = new THREE.Matrix4();
for (let i = 0; i < cubes.length; i++) {
	cubes[i].matrix.copy(model_transformation);
	cubes_wireframe[i].matrix.copy(model_transformation);
	model_transformation.multiplyMatrices(scaling, model_transformation);
	model_transformation.multiplyMatrices(translation, model_transformation);
	model_transformation.multiplyMatrices(rotation_matrix, model_transformation);
	model_transformation.multiplyMatrices(inverse_translation, model_transformation);
	model_transformation.multiplyMatrices(final_translation, model_transformation);
}


let animation_time = 0;
let delta_animation_time;
let rotation_angle;
const clock = new THREE.Clock();

const MAX_ANGLE = 15 * 2*Math.PI/360; // 15 degrees converted to radians
const T = 3; // oscillation period in seconds

let still = false;
let visible = true;

window.addEventListener('keydown', onKeyPress); // onKeyPress is called each time a key is pressed
function onKeyPress(event) { // function to handle keypress
	switch (event.key) {
		case 's':
			still = !still;
			break;
		case 'w':
			for (let i = 0; i < 7; i++) {
				cubes[i].visible = !cubes[i].visible;
				cubes_wireframe[i].visible = !cubes_wireframe[i].visible;
			}
			break;
		default:
			console.log(`Key ${event.key} pressed`);
	}
}

function animate() {
    
	renderer.render( scene, camera );
    controls.update();

	delta_animation_time = clock.getDelta();
	if (!still) {
		animation_time += delta_animation_time;
		rotation_angle = Math.abs(Math.sin((Math.PI/T)*animation_time));
	};

	const rotation = rotationMatrixZ(rotation_angle*l);

	const scale_factor = 1; // TODO exercise 3: make the cubes taller using the scaling matrix transform. Make sure that the faces of the cuboid are still perpendicular to each other.

	const translation = translationMatrix(l, l, 0);

	//const rotation = rotationMatrixZ(delta_theta*l);

	const inverse_translation = translationMatrix(-l, -l, 0);

	const final_translation = translationMatrix(0, 2*l, 0);

	const scaling = scalingMatrix(1, scale_factor, 1);

	let model_transformation = new THREE.Matrix4();
	for (let i = 0; i < cubes.length; i++) {
		cubes[i].matrix.copy(model_transformation);
		cubes_wireframe[i].matrix.copy(model_transformation);
		model_transformation.multiplyMatrices(scaling, model_transformation);
		model_transformation.multiplyMatrices(translation, model_transformation);
		model_transformation.multiplyMatrices(rotation, model_transformation);
		model_transformation.multiplyMatrices(inverse_translation, model_transformation);
		model_transformation.multiplyMatrices(final_translation, model_transformation);
	}
}
renderer.setAnimationLoop( animate );

// TODO: Add event listener
