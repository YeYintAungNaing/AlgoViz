import  { useEffect, useState } from "react";
import './RotateScreen.scss'; // Import your SCSS file

// eslint-disable-next-line react/prop-types
const RotateScreen = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to detect if the user is on a mobile device
  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  if (isMobileDevice() && isPortrait) {
    return (
      <div className="rotate-screen">
        <p>Please rotate your device to use the visualizer</p>
      </div>
    );
  }

  return <>{children}</>; // Render the children if not in portrait mode or not on mobile
};

export default RotateScreen;