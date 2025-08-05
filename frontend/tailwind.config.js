import daisyui from "daisyui"
import themes from "daisyui/theme/object"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui:{
    themes:[
      "light","dark","cupcake",
    ]
  }
}