import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"

const app = TubesCursor(document.getElementById('canvas'), {
  tubes: {
    colors: ["#FFE500", "#FF8C00", "#FFFFFF"],
    thickness: 3.0,
    length: 2.2,
    velocity: 2.5,
    fade: 0.06
  },

  lights: {
    intensity: 420,
    colors: ["#FFE500", "#FF8C00", "#FFFFFF"],
    radius: 1.8
  },

  bloom: {
    strength: 2.5,
    threshold: 0.2,
    radius: 1.1
  }
})

document.body.addEventListener('click', () => {
  const colors = ["#FFE500", "#FF8C00", "#FFFFFF"]
  app.tubes.setColors(colors)
  app.tubes.setLightsColors(colors)
})
