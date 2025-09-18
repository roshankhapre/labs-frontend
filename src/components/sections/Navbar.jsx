import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-primary">
          🧪 HealthLab
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium hover:text-primary transition"
          >
            Home
          </Link>
          <Link
            to="/tests"
            className="text-sm font-medium hover:text-primary transition"
          >
            Tests
          </Link>
          <Link
            to="/packages"
            className="text-sm font-medium hover:text-primary transition"
          >
            Packages
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium hover:text-primary transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium hover:text-primary transition"
          >
            Contact
          </Link>
        </nav>

        {/* Book Now Button */}
        <div className="hidden md:block">
          <Button asChild>
            <Link to="/book">Book Test</Link>
          </Button>
        </div>

        {/* Mobile Hamburger - Optional */}
        <div className="md:hidden">
          {/* You can add a mobile drawer or dropdown menu here later */}
          <span className="text-xl">☰</span>
        </div>
      </div>
    </header>
  );
}
