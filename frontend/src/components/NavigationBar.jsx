import { Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className="bg-[#FEFCF9] fixed z-10 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex items-center justify-between h-16 text-gray-800 font-semibold">
            <div className="flex items-center space-x-4">
                <Link to="/about" className="text-gray-800 hover:text-gray-600">About</Link>
                <Link to="/samples" className="text-gray-800 hover:text-gray-600">Sample Stories</Link>
                <Link to="/how-it-works" className="text-gray-800 hover:text-gray-600">How It Works</Link>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/about" className="text-gray-800 hover:text-gray-600">
                    <Sun className="inline-block w-5 h-5" />
                </Link>
            </div>
        </div>
      </div>
    </nav>
  );

}

export default NavigationBar;