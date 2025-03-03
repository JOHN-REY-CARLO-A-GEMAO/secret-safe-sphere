
import { useState } from 'react';
import { Shield, X } from 'lucide-react';
import { SlideUp } from './Animations';

export const PrivacyBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <SlideUp className="fixed bottom-6 left-0 right-0 z-40 mx-auto max-w-4xl px-4">
      <div className="glass-morphism rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-5 flex items-start gap-4">
          <div className="shrink-0 p-2 bg-primary/10 rounded-full">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          
          <div className="flex-1">
            <h4 className="text-base font-medium mb-1">Your privacy is our priority</h4>
            <p className="text-sm text-gray-600">
              All confessions are encrypted, and we don't track IP addresses or personally identifiable information.
              Your thoughts remain anonymous and secure.
            </p>
          </div>
          
          <button 
            onClick={() => setDismissed(true)}
            className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </SlideUp>
  );
};
