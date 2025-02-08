// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
gsap.from('.hero-content', {
    opacity: 0,
    y: 100,
    duration: 1.5,
    ease: 'power4.out'
});

// Feature cards animation
gsap.from('.feature-card', {
    scrollTrigger: {
        trigger: '.features',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    },
    y: 100,
    opacity: 0,
    stagger: 0.2
});

// Initialize Three.js for 3D Unity logo
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('unity-logo-3d'),
    alpha: true
});

renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

// Create Unity logo geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({
    color: 0x2196F3,
    specular: 0x555555,
    shininess: 30
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 2);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

// Parallax effect for showcase video
ScrollTrigger.create({
    trigger: '.showcase',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: self => {
        gsap.to('#demo-reel', {
            y: self.progress * 100,
            duration: 0.5
        });
    }
});

// Responsive window resize handler
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width / 2, height / 2);
}); 