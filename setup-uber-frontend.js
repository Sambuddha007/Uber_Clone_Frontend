const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

const structure = {
  "package.json": `{
  "name": "uber_clone_frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "15.5.3",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.3",
    "postcss": "^8.4.23",
    "autoprefixer": "^10.4.14"
  }
}`,
  "postcss.config.js": `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {}, }, };`,
  "tailwind.config.js": `module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: { extend: {} },
  plugins: [],
}`,
  "next.config.js": `const nextConfig = { reactStrictMode: true }; module.exports = nextConfig;`,
  "styles/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100 text-gray-800 font-sans;
}`,
  "pages/_app.jsx": `import '../styles/globals.css';
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}`,
  "pages/index.jsx": `import Header from '../components/Header';
import Button from '../components/Button';
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Uber Clone</h1>
        <p className="mb-6">Book rides quickly and safely</p>
        <Button text="Book a Ride" />
      </main>
    </div>
  );
}`,
  "pages/login.jsx": `import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button text="Login" />
      </main>
    </div>
  );
}`,
  "pages/signup.jsx": `import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <Input type="text" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="text" placeholder="Phone" />
        <Input type="password" placeholder="Password" />
        <Button text="Sign Up" />
      </main>
    </div>
  );
}`,
  "pages/rides.jsx": `import Header from '../components/Header';
import Map from '../components/Map';
import RideCard from '../components/RideCard';
export default function Rides() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Your Rides</h2>
        <Map />
        <RideCard pickup="Point A" dropoff="Point B" fare={12} status="Booked" />
        <RideCard pickup="Point C" dropoff="Point D" fare={20} status="Completed" />
      </main>
    </div>
  );
}`,
  "pages/profile.jsx": `import Header from '../components/Header';
export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
        <p>Phone: 1234567890</p>
      </main>
    </div>
  );
}`,
  "components/Header.jsx": `import Link from 'next/link';
export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between">
      <div className="text-xl font-bold">UberClone</div>
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/rides">Rides</Link>
        <Link href="/profile">Profile</Link>
      </nav>
    </header>
  );
}`,
  "components/Footer.jsx": `export default function Footer() {
  return (
    <footer className="bg-gray-200 p-4 text-center">© 2025 Uber Clone</footer>
  );
}`,
  "components/Button.jsx": `export default function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-4">
      {text}
    </button>
  );
}`,
  "components/Input.jsx": `export default function Input({ type, placeholder }) {
  return (
    <input type={type} placeholder={placeholder} className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
  );
}`,
  "components/Map.jsx": `export default function Map() {
  return (
    <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
      Map Placeholder
    </div>
  );
}`,
  "components/RideCard.jsx": `export default function RideCard({ pickup, dropoff, fare, status }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4 flex justify-between items-center">
      <div>
        <p className="font-semibold">{pickup} → {dropoff}</p>
        <p className="text-gray-500">{status}</p>
      </div>
      <div className="text-right">
        <p className="font-bold">{'{fare}'}</p>
      </div>
    </div>
  );
}`
};

function createFiles(basePath, obj) {
  for (const key in obj) {
    const fullPath = path.join(basePath, key);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, obj[key], 'utf8');
    console.log(`Created: ${fullPath}`);
  }
}

createFiles(projectRoot, structure);
console.log("Uber Clone frontend scaffold complete!");
