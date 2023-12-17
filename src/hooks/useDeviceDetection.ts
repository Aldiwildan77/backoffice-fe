import { useEffect, useState } from "react";

export enum Device {
  Desktop = "Desktop",
  Tablet = "Tablet",
  Mobile = "Mobile",
}

const useDeviceDetection = () => {
  const [device, setDevice] = useState<Device>(Device.Mobile);

  const determineDevice = () => {
    if (
      window.innerWidth <= 768 &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return Device.Mobile;
    } else {
      return Device.Desktop;
    }
  };

  const handleDeviceDetection = () => {
    const device = determineDevice();
    setDevice(device);
  };

  useEffect(() => {
    handleDeviceDetection();
    window.addEventListener("resize", handleDeviceDetection);
    return () => {
      window.removeEventListener("resize", handleDeviceDetection);
    };
  }, []);

  return [device];
};

export { useDeviceDetection };
