
import React from 'react';
import { Confession } from '@/types';
import { Calendar, User, Flag, Eye, Clock, Trash } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { CategoryTag } from '@/components/ui/CategoryTag';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfessionItemProps {
  confession: Confession;
  onDelete?: (id: string) => void;
}

export const ConfessionItem = ({ confession, onDelete }: ConfessionItemProps) => {
  const { toast } = useToast();
  
  // Format the creation time
  const timeAgo = formatDistanceToNow(new Date(confession.createdAt), { addSuffix: true });
  
  // Get the visibility icon and text
  const getVisibilityInfo = () => {
    switch (confession.visibility) {
      case 'public':
        return { icon: <Eye className="h-4 w-4" />, text: 'Public' };
      case 'time-limited':
        return { icon: <Clock className="h-4 w-4" />, text: '24 Hours' };
      case 'self-destruct':
        return { icon: <Trash className="h-4 w-4" />, text: 'Self-destruct' };
      default:
        return { icon: <Eye className="h-4 w-4" />, text: 'Public' };
    }
  };
  
  const visibilityInfo = getVisibilityInfo();
  
  const handleReportAction = () => {
    toast({
      title: "Confession reported",
      description: "This confession has been flagged for review.",
      variant: "default"
    });
  };
  
  const handleDeleteAction = () => {
    if (onDelete) {
      onDelete(confession.id);
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <User className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium">
            {confession.privacyLevel === 'throwaway' && confession.throwawayName
              ? confession.throwawayName
              : 'Anonymous'}
          </span>
        </div>
        <div className="flex items-center text-gray-500 text-xs">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{timeAgo}</span>
        </div>
      </div>
      
      <p className="text-gray-800 my-3 whitespace-pre-line">{confession.content}</p>
      
      <div className="flex flex-wrap gap-1.5 mb-3">
        <CategoryTag category={confession.category} />
        {confession.emotionTags.map((tag) => (
          <CategoryTag key={tag} category={tag} variant="emotion" />
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <div className="flex items-center text-gray-500 text-xs">
          {visibilityInfo.icon}
          <span className="ml-1">{visibilityInfo.text}</span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
            onClick={handleReportAction}
          >
            <Flag className="h-4 w-4 mr-1" />
            Report
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Confession</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this confession? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAction}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
