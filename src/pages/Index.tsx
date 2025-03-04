
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ConfessionForm } from '@/components/ConfessionForm';
import { ConfessionCard } from '@/components/ConfessionCard';
import { PrivacyBanner } from '@/components/PrivacyBanner';
import { Footer } from '@/components/Footer';
import { FadeIn, SlideUp } from '@/components/Animations';
import { Confession } from '@/types';
import { Lock, ShieldCheck } from 'lucide-react';

const Index = () => {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Load confessions from localStorage on component mount
  useEffect(() => {
    const savedConfessions = localStorage.getItem('confessions');
    if (savedConfessions) {
      try {
        setConfessions(JSON.parse(savedConfessions));
      } catch (error) {
        console.error('Error parsing confessions from localStorage:', error);
      }
    }
  }, []);

  const handleSubmitConfession = (confession: Confession) => {
    const updatedConfessions = [confession, ...confessions];
    setConfessions(updatedConfessions);
    setShowConfirmation(true);
    
    // Save to localStorage
    localStorage.setItem('confessions', JSON.stringify(updatedConfessions));
    
    // Hide confirmation after a delay
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000);
  };

  const handleDeleteConfession = (id: string) => {
    const updatedConfessions = confessions.filter(confession => confession.id !== id);
    setConfessions(updatedConfessions);
    
    // Update localStorage
    localStorage.setItem('confessions', JSON.stringify(updatedConfessions));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <SlideUp className="mb-6 inline-flex justify-center items-center px-4 py-1.5 bg-primary/10 rounded-full">
              <Lock className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">100% Anonymous & Secure</span>
            </SlideUp>
            
            <FadeIn className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-gray-900 tracking-tight">
                Share your thoughts,{' '}
                <span className="text-primary">without revealing your identity</span>
              </h1>
            </FadeIn>
            
            <SlideUp className="mb-10" delay={200}>
              <p className="text-lg text-gray-600">
                A safe space to confess, vent, or share your secrets anonymously.
                No tracking, no judgment, just liberation.
              </p>
            </SlideUp>
          </div>
          
          {/* Confession Form */}
          <SlideUp delay={400} className="max-w-2xl mx-auto">
            <ConfessionForm onSubmit={handleSubmitConfession} />
          </SlideUp>
        </div>
      </section>
      
      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="fixed top-24 left-0 right-0 flex justify-center z-50 animate-fadeIn">
          <div className="bg-green-50 border border-green-100 text-green-800 rounded-lg p-4 flex items-center shadow-lg">
            <ShieldCheck className="w-5 h-5 mr-2 text-green-600" />
            Confession shared successfully and encrypted!
          </div>
        </div>
      )}
      
      {/* Confessions List */}
      {confessions.length > 0 && (
        <section className="py-16 px-6 md:px-10 bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-display font-semibold text-center mb-10">
              Recent Confessions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {confessions.map((confession) => (
                <SlideUp key={confession.id} className="h-full">
                  <ConfessionCard 
                    confession={confession} 
                    onDelete={handleDeleteConfession}
                  />
                </SlideUp>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Features Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-semibold mb-4">
              Your Privacy, Our Priority
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whisperspace is designed from the ground up with your privacy and security in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Complete Anonymity',
                description: 'No personal information collected. Express yourself freely without fear of identification.'
              },
              {
                title: 'End-to-End Encryption',
                description: 'Your confessions are encrypted, ensuring they remain private and secure at all times.'
              },
              {
                title: 'No IP Logging',
                description: 'We never log or store IP addresses, making it impossible to trace confessions back to you.'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <PrivacyBanner />
      <Footer />
    </div>
  );
};

export default Index;
