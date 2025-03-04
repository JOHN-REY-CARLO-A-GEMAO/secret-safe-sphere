
import { Comment } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { FadeIn } from './Animations';

interface CommentsListProps {
  comments: Comment[];
}

export const CommentsList = ({ comments }: CommentsListProps) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <FadeIn key={comment.id} className="animate-in">
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="font-medium text-sm text-gray-600">
                {comment.privacyLevel === 'throwaway' && comment.throwawayName
                  ? comment.throwawayName
                  : 'Anonymous'}
              </div>
              <div className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </div>
            </div>
            <div className="mt-2 text-gray-700 whitespace-pre-line">
              {comment.content}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
};
