import { useEffect, useRef } from "react";

export const useDocumentTitle = (
  title: string,
  restoreOnUnmount: boolean = false,
): void => {
  const previousTitleRef = useRef<string>(document.title);

  useEffect(() => {
    if (restoreOnUnmount && previousTitleRef.current === document.title) {
      previousTitleRef.current = document.title;
    }

    document.title = title;

    return () => {
      if (restoreOnUnmount) {
        document.title = previousTitleRef.current;
      }
    };
  }, [title, restoreOnUnmount]);
};
