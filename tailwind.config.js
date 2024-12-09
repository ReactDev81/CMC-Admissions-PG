/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '20px',
      '3xl': '22px',
    },
    extend: {
      maxWidth: {
        '400': '400px',
        '232': '232px',
        'lg': '1172px',
      },
      colors:{
          primary:{
            default: '#013220',
            300: '#3A6052',
            200: '#CCD6D2',
            100: '#E5EAE8',
          },
          danger:{
            default: '#FF0000',
            300: '#FDE9ED',
          },
          warning:{
            default: '#EAB300',
            300: '#FEF8EA',
          },
          success:{
            default: '#1ABE17',
            300: '#E8F9E8',
          },
          info:{
            default: '#48A3D7',
          },
          purple:{
            default: '#C95E9E',
          },
          parrotgreen:{
            'default': '#1ABE17',
            '200': '#E8F9E8',
          },
          black:{
            default: '#1F1E1E',
            300: '#4D4D4D',
            200: '#929292',
            100: '#EDEDED',
          },
          white:{
            default: '#FFFFFF',
            300: '#F5F7F6',
          },
        },
        fontFamily:{
          'ubuntu': ['Ubuntu', 'sans-serif'],
          'LibreFranklin' : ['Libre Franklin', 'sans-serif'],
        },
        boxShadow: {
          '1x': '0px 9px 20px 0px #1458581A',
          'side-Shadow': '0px 0px 21px 0px #59667A1A',
          'flex': '0px 9px 20px 0px #0132201A',
        },
    },
  },
  plugins: [],
}