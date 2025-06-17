import { useRef, useEffect } from "react";

export function useInfiniteScroll(loadMore: Function, needMore: boolean) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    
   const el = observerRef.current;
    if (!el || !needMore) return;
    const obs = new IntersectionObserver(
      (entries) => {
       entries.forEach((entry)=>{
       if(entry.isIntersecting){
        loadMore()
       }
       })
      },
      { rootMargin: "200px" }
    );
    if (el) obs.observe(el);
    return () => {
      if (el) obs.unobserve(el);
    };
  }, [loadMore, needMore]);

  return observerRef;
}
