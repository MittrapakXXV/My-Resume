const realSections = document.querySelectorAll('.real-section');
const fakeSections = document.querySelectorAll('.fake-section');

const radius = window.screen.height/3; // wheel radius
const total = realSections.length;

const angleStep = 360 / total;
const baseAngles = Array.from({ length: total }, (_, i) => i * angleStep);

window.addEventListener('scroll', () => {
  const centerY = window.innerHeight / 2;
  const scrollTop = window.scrollY;
  const wheelRotation = (scrollTop / window.innerHeight) * 90;
 
  realSections.forEach((real, index) => {
    let angle = baseAngles[index] + wheelRotation;
    let rad = (angle * Math.PI) / 180;
    const range = fakeSections[index].offsetHeight/5
    console.log(fakeSections[index].offsetHeight);
    let fake = fakeSections[index];
    let rect = fake.getBoundingClientRect();
    let fakeCenter = rect.top + rect.height / 2;
    let distance = centerY - fakeCenter;

    if (distance < range && distance > -range) {
        distance = 0
    }


    let scale = 0.125;
    let opacity = 0.2;
    let x = radius * Math.cos(rad);
    let y = radius * Math.sin(rad);
    let z = 1;
    // If within soft center range, snap to exact center
    if (Math.abs(distance) < range) {
      const progress = 1 - Math.abs(distance) / range;
      scale = 0.5 + 0.5 * progress;
      opacity = 0.05 + 1 * progress;

      x = 0;
      y = 0;
      z=4;
      real.style.transition = "transform 0.5s ease ,opacity 0.2s ease;"
    }

    real.style.transform = `translate(calc(-50% + ${x}px), calc(-45% + ${y}px)) scale(${scale})`;
    real.style.opacity = opacity;
    real.style.zIndex = z;
  });
});
