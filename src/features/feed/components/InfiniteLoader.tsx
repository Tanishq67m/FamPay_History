import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface InfiniteLoaderProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export const InfiniteLoader = ({ onLoadMore, hasMore, isLoading }: InfiniteLoaderProps) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If the "loader" div becomes visible, and we aren't already loading...
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 1.0 } // Trigger when 100% of the target is visible
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoading]);

  return (
    <div 
      ref={observerTarget} 
      className="w-full py-8 flex justify-center items-center"
    >
      {isLoading ? (
        <Loader2 className="animate-spin text-fam-accent" size={24} />
      ) : hasMore ? (
        // Invisible trigger area
        <div className="h-4 w-full opacity-0" />
      ) : (
        <span className="text-fam-muted text-xs uppercase tracking-widest">
          End of history
        </span>
      )}
    </div>
  );
};