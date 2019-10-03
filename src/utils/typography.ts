import Typography from 'typography';

const typography = new Typography({
    baseFontSize: '18px',
    baseLineHeight: 1.666,
    headerFontFamily: ['Rubik', 'sans-serif'],
    bodyFontFamily: ['Rubik', 'sans-serif'],
});

// Export helper functions
export const { scale, rhythm, options } = typography;
export default typography;
