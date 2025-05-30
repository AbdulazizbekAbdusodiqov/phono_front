// components/MapComponent.tsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// Dynamically import the Map component with SSR disabled
const MapWithNoSSR = dynamic(
  () => import('./MapContent'),
  { 
    ssr: false,
    loading: () => <p>Loading map... <AiOutlineLoading3Quarters/></p>
  }
);

export default function MapComponent() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ height: '400px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading map... <AiOutlineLoading3Quarters/></div>;
  }

  return <MapWithNoSSR />;
}
