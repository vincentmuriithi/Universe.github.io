let scene, camera, renderer, sphere;

$("h1").css({
  "marginLeft": "42%",
  //"marginRight": "60%" 
});
const init = () => {
  // Create a scene
  scene = new THREE.Scene();

  // Set the background with an image
  const bg = new THREE.TextureLoader().load("https://coolwallpapers.me/picsup/2503093-4k-hd-wallpaper-high-definition.jpg");
  scene.background = bg;

  // Create a camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;
  camera.position.y = 15;

  // Create a renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create a canvas for the texture
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 256;
  canvas.height = 128;
  context.fillStyle = "green";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.font = "24px Arial";
  context.fillStyle = "red";
  context.fillText("Happy Birthday Diana", 10, 50);

  // Convert the canvas to a texture
  const texture = new THREE.CanvasTexture(canvas);

  // Create a sphere with the texture
  const geometry = new THREE.SphereGeometry(10, 32, 25);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const audio = new Audio();
  audio.src = "https://timheven.com/uploads/Harmonize%20-%20Happy%20Birthday.mp3";
  audio.play();
  $("h1").on("click mouseenter mousedown", () => audio.play());  
  // Handle window resizing
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("resize", onWindowResize, false);
};

const animate = () => {
  sphere.rotation.y += 0.01;
  camera.lookAt(sphere.position);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

init();
animate();
