module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {},
  variants: {},
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#006766',
          'secondary': '#f000b8',
          'primary-text': '#ffffff', // Set the text color to white for the primary button
          'accent': '#570df8',
          'neutral': '#ddd6fe',
          'base-100': '#ffffff',
          'info': '#3abff8',
          'success': '#36d399',
          'warning': '#fbbd23',
          'error': '#f87272',
        },
      },
      'cyberpunk',
      'cupcake',
    ],
  },
};
