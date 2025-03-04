import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FadeIn, SlideUp } from '@/components/Animations';
import { Confession, Comment, ReactionType } from '@/types';
import { 
  Calendar, 
  ArrowLeft, 
  MessageCircle, 
  Eye,
  Heart,
  Laugh,
  Hand,
  Frown,
  Lightbulb,
  Send
} from 'lucide-react';
import { CategoryTag } from '@/components/ui/CategoryTag';
import { formatDistanceToNow } from 'date-fns';
import { CommentsList } from '@/components/CommentsList';
import { ReactionButton } from '@/components/ReactionButton';
import { toast } from '@/hooks/use-toast';

const ConfessionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confession, setConfession] = useState<Confession | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const confessionsFromLocalStorage = localStorage.getItem('confessions');
    const confessions = confessionsFromLocalStorage 
      ? JSON.parse(confessionsFromLocalStorage) as Confession[] 
      : [];
    
    const foundConfession = confessions.find(c => c.id === id);
    
    if (foundConfession) {
      if (!foundConfession.reactions) {
        foundConfession.reactions = {
          relate: { type: 'relate', count: 0 },
          support: { type: 'support', count: 0 },
          hug: { type: 'hug', count: 0 },
          shocked: { type: 'shocked', count: 0 },
          insightful: { type: 'insightful', count: 0 }
        };
      }
      
      if (!foundConfession.comments) {
        foundConfession.comments = [];
      }
      
      foundConfession.hasBeenRead = true;
      foundConfession.viewCount = (foundConfession.viewCount || 0) + 1;
      
      localStorage.setItem('confessions', JSON.stringify(confessions));
      
      setConfession(foundConfession);
    }
    
    setLoading(false);
    
    if (foundConfession?.visibility === 'self-destruct' && foundConfession.hasBeenRead) {
      const timer = setTimeout(() => {
        const updatedConfessions = confessions.filter(c => c.id !== id);
        localStorage.setItem('confessions', JSON.stringify(updatedConfessions));
        
        toast({
          title: "Confession self-destructed",
          description: "This confession has been removed as per its privacy settings.",
          variant: "destructive"
        });
        
        navigate('/');
      }, 30000);
      
      return () => clearTimeout(timer);
    }
  }, [id, navigate]);
  
  const handleAddComment = () => {
    if (!newComment.trim() || !confession) return;
    
    setIsSubmitting(true);
    
    const comment: Comment = {
      id: Math.random().toString(36).substring(2, 15),
      content: newComment.trim(),
      createdAt: new Date(),
      privacyLevel: 'anonymous'
    };
    
    const confessionsFromLocalStorage = localStorage.getItem('confessions');
    const confessions = confessionsFromLocalStorage 
      ? JSON.parse(confessionsFromLocalStorage) as Confession[] 
      : [];
    
    const updatedConfessions = confessions.map(c => {
      if (c.id === confession.id) {
        return {
          ...c,
          comments: [...(c.comments || []), comment]
        };
      }
      return c;
    });
    
    localStorage.setItem('confessions', JSON.stringify(updatedConfessions));
    
    setConfession({
      ...confession,
      comments: [...(confession.comments || []), comment]
    });
    
    setNewComment('');
    setIsSubmitting(false);
    
    toast({
      title: "Comment added",
      description: "Your anonymous comment has been added to this confession.",
    });
  };
  
  const handleReaction = (type: ReactionType) => {
    if (!confession || !confession.reactions) return;
    
    const confessionsFromLocalStorage = localStorage.getItem('confessions');
    const confessions = confessionsFromLocalStorage 
      ? JSON.parse(confessionsFromLocalStorage) as Confession[] 
      : [];
    
    const currentReaction = confession.reactions[type];
    const wasReacted = currentReaction.reacted;
    
    const updatedReaction = {
      ...currentReaction,
      count: wasReacted ? currentReaction.count - 1 : currentReaction.count + 1,
      reacted: !wasReacted
    };
    
    const updatedConfession = {
      ...confession,
      reactions: {
        ...confession.reactions,
        [type]: updatedReaction
      }
    };
    
    const updatedConfessions = confessions.map(c => 
      c.id === confession.id ? updatedConfession : c
    );
    
    localStorage.setItem('confessions', JSON.stringify(updatedConfessions));
    
    setConfession(updatedConfession);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading confession...</div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!confession) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Confession Not Found</h1>
            <p className="mb-6">This confession may have been deleted or never existed.</p>
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const timeAgo = formatDistanceToNow(new Date(confession.createdAt), { addSuffix: true });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all confessions</span>
          </Link>
          
          <SlideUp className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  {confession.privacyLevel === 'throwaway' && confession.throwawayName ? (
                    <span className="text-sm font-medium text-gray-600">
                      {confession.throwawayName}
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-gray-600">
                      Anonymous
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span className="text-xs">{confession.viewCount || 1}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">{timeAgo}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
                  {confession.content}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-6">
                <CategoryTag category={confession.category} />
                {confession.emotionTags.map((tag) => (
                  <CategoryTag key={tag} category={tag} variant="emotion" />
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 py-4 border-t border-gray-100">
                <ReactionButton 
                  icon={<Heart size={16} />}
                  label="Relate"
                  count={confession.reactions?.relate.count || 0}
                  active={confession.reactions?.relate.reacted || false}
                  onClick={() => handleReaction('relate')}
                />
                
                <ReactionButton 
                  icon={<Hand size={16} />}
                  label="Support"
                  count={confession.reactions?.support.count || 0}
                  active={confession.reactions?.support.reacted || false}
                  onClick={() => handleReaction('support')}
                />
                
                <ReactionButton 
                  icon={<Laugh size={16} />}
                  label="Hug"
                  count={confession.reactions?.hug.count || 0}
                  active={confession.reactions?.hug.reacted || false}
                  onClick={() => handleReaction('hug')}
                />
                
                <ReactionButton 
                  icon={<Frown size={16} />}
                  label="Shocked"
                  count={confession.reactions?.shocked.count || 0}
                  active={confession.reactions?.shocked.reacted || false}
                  onClick={() => handleReaction('shocked')}
                />
                
                <ReactionButton 
                  icon={<Lightbulb size={16} />}
                  label="Insightful"
                  count={confession.reactions?.insightful.count || 0}
                  active={confession.reactions?.insightful.reacted || false}
                  onClick={() => handleReaction('insightful')}
                />
              </div>
            </div>
          </SlideUp>
          
          <FadeIn className="mt-10">
            <h2 className="text-2xl font-display font-semibold mb-6">
              Comments
            </h2>
            
            <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm">
              <div className="flex space-x-3">
                <div className="flex-grow">
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Add a supportive comment..."
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleAddComment}
                  disabled={isSubmitting || !newComment.trim()}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isSubmitting || !newComment.trim()
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Comment Anonymously</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <CommentsList comments={confession.comments || []} />
          </FadeIn>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConfessionDetails;
