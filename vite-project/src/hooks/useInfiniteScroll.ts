import { useRef, useEffect } from "react";

export function useInfiniteScroll(loadMore: Function, needMore: boolean) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!needMore) return;
    const obs = new IntersectionObserver(
      (entries) => {
       entries.forEach((entry)=>{
       if(entry.isIntersecting){
        loadMore()
       }
       })
      },
      { rootMargin: "400px" }
    );
    const el = observerRef.current;
    if (el) obs.observe(el);
    return () => {
      if (el) obs.unobserve(el);
    };
  }, [loadMore, needMore]);

  return observerRef;
}
