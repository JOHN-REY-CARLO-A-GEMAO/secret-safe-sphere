
import { useState } from 'react';
import { Flag, Eye, Clock, Trash, Calendar } from 'lucide-react';
import { Confession } from '@/types';
import { CategoryTag } from './ui/CategoryTag';
import { formatDistanceToNow } from 'date-fns';

interface ConfessionCardProps {
  confession: Confession;
  onDelete?: (id: string) => void;
}

export const ConfessionCard = ({ confession, onDelete }: ConfessionCardProps) => {
  const [reported, setReported] = useState(false);
  const [isRead, setIsRead] = useState(confession.hasBeenRead || false);
  
  // Format the creation time
  const timeAgo = formatDistanceToNow(confession.createdAt, { addSuffix: true });

  // Self-destruct feature (in a real app, you would handle this on the server)
  const handleRead = () => {
    if (confession.visibility === 'self-destruct' && !isRead) {
      setIsRead(true);
      // Simulating self-destruct timer
      setTimeout(() => {
        onDelete?.(confession.id);
      }, 10000); // 10 seconds for demo purposes
    }
  };

  return (
    <div 
      className="bg-white backdrop-blur-sm border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      onClick={handleRead}
    >
      <div className="p-5">
        {/* Header with privacy level and time */}
        <div className="flex justify-between items-center mb-4">
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
          <div className="flex items-center space-x-1 text-gray-400">
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{timeAgo}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-800 mb-2 whitespace-pre-line">{confession.content}</p>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <CategoryTag category={confession.category} />
          {confession.emotionTags.map((tag) => (
            <CategoryTag key={tag} category={tag} variant="emotion" />
          ))}
        </div>
        
        {/* Footer with visibility and actions */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-3">
          <div className="flex items-center space-x-1.5 text-gray-500 text-xs">
            {confession.visibility === 'public' && (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Public</span>
              </>
            )}
            {confession.visibility === 'time-limited' && (
              <>
                <Clock className="w-3.5 h-3.5" />
                <span>Time-limited</span>
              </>
            )}
            {confession.visibility === 'self-destruct' && (
              <>
                <Trash className="w-3.5 h-3.5" />
                <span>Self-destruct{isRead ? ' (read)' : ''}</span>
              </>
            )}
          </div>
          
          <button 
            className={`text-xs flex items-center space-x-1 ${
              reported ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setReported(true);
            }}
            disabled={reported}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>{reported ? 'Reported' : 'Report'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
