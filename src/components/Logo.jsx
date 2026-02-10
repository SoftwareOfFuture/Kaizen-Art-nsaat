import React from 'react';

const Logo = ({ className = "h-8", theme = "dark" }) => {
  const logoUrl = "https://r.resimlink.com/VvioBWk.png";
  // theme: 'dark' means background is light (logo should be original/dark)
  // theme: 'light' means background is dark (logo should be white/bright)

  // We use screen/multiply to simulate transparency for a white-background PNG.
  // CRITICAL: We do NOT use isolation: isolate, as it prevents blending with the Navbar background.
  const imgStyle = theme === 'light'
    ? { filter: 'invert(1) contrast(1.5) brightness(1.2)', mixBlendMode: 'screen' }
    : { filter: 'contrast(1.1) brightness(1.05)', mixBlendMode: 'multiply' };

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoUrl}
        alt="Kaizen Art Logo"
        className="h-full w-auto object-contain transition-all duration-500"
        style={imgStyle}
      />
    </div>
  );
};

export default Logo;
