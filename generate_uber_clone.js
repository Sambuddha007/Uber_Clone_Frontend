const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Base project folder
const baseFolder = 'uber-clone';

// Project files
const projectFiles = {
  'package.json': `{
  "name": "uber-clone",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "mapbox-gl": "^2.15.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "react-map-gl": "^7.0.18"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.15",
    "postcss": "^8.4.30",
    "tailwindcss": "^3.3.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}`,
  'tailwind.config.js': `module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};`,
  'postcss.config.js': `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
  'public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Uber Clone</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;`,
  'src/index.js': `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  'src/App.js': `import React from 'react';
import MapComponent from './MapComponent';
import RidePanel from './RidePanel';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 text-white p-4 text-center font-bold text-xl">
        Uber Clone
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <MapComponent />
        <RidePanel />
      </div>
    </div>
  );
}

export default App;`,
  'src/MapComponent.js': `import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const MapComponent = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.006, 40.7128],
      zoom: 12,
    });

    new mapboxgl.Marker()
      .setLngLat([-74.006, 40.7128])
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Pickup Location</h3>'))
      .addTo(map);

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="flex-1 h-full" />;
};

export default MapComponent;`,
  'src/RidePanel.js': `import React from 'react';

const RidePanel = () => {
  return (
    <div className="w-full md:w-1/3 bg-gray-100 p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Book a Ride</h2>
      <input 
        type="text" 
        placeholder="Pickup Location" 
        className="mb-4 p-2 border rounded"
      />
      <input 
        type="text" 
        placeholder="Dropoff Location" 
        className="mb-4 p-2 border rounded"
      />
      <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Request Ride
      </button>
    </div>
  );
};

export default RidePanel;`
};

// Step 1: Create project folder and files
for (const filePath in projectFiles) {
  const fullPath = path.join(baseFolder, filePath);
  const dirName = path.dirname(fullPath);
  if (!fs.existsSync(dirName)) fs.mkdirSync(dirName, { recursive: true });
  fs.writeFileSync(fullPath, projectFiles[filePath], 'utf-8');
}

// Step 2: Create a ZIP of the folder
const output = fs.createWriteStream('uber-clone.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`uber-clone.zip created successfully! Total bytes: ${archive.pointer()}`);
});

archive.on('error', (err) => { throw err; });

archive.pipe(output);
archive.directory(baseFolder, false);
archive.finalize();
