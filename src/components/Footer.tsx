
import { Heart, Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-display text-lg font-medium">Whisperspace</span>
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              A safe, anonymous space to share your thoughts, secrets, and confessions
              without judgment or fear.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {['About', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              {['Guidelines', 'Mental Health Resources', 'Report Content', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Whisperspace. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <p className="text-sm text-gray-500 flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for a safer space
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
