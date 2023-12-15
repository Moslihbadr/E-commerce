const Logo = ({ fontSize, width }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={50}>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#FF9800', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FF5722', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="30"
        style={{ fontSize: fontSize, fontFamily: "'Brush Script MT', cursive" }}
        fill="url(#grad)"
        cursor='pointer'
      >
        <tspan fill="#474747" style={{ fontFamily: "'Brush Script MT', cursive" }}>E</tspan>Shop
      </text>
    </svg>
  );
};

export default Logo;