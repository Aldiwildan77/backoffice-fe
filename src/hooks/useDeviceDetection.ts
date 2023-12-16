import { useEffect, useState } from 'react';

export enum Device {
  Desktop = 'Desktop',
  Tablet = 'Tablet',
  Mobile = 'Mobile',
}

const useDeviceDetection = () => {
  const [device, setDevice] = useState<Device | null>();

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile =
        /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      const isTablet =
        /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (isMobile) {
        setDevice(Device.Mobile);
      } else if (isTablet) {
        setDevice(Device.Tablet);
      } else {
        setDevice(Device.Desktop);
      }
    };

    handleDeviceDetection();
    window.addEventListener('resize', handleDeviceDetection);

    return () => {
      window.removeEventListener('resize', handleDeviceDetection);
    };
  }, []);

  return device;
};

export { useDeviceDetection };
