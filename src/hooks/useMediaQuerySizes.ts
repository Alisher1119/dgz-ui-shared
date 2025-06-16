import { useMediaQuery } from "react-responsive";

export const useMediaQuerySizes = () => {
  const xxxl = useMediaQuery({
    query: "(min-width: 116rem)",
  });
  const xxl = useMediaQuery({
    query: "(min-width: 96rem)",
  });
  const xl = useMediaQuery({ query: "(min-width: 80rem)" });
  const lg = useMediaQuery({ query: "(min-width: 64rem)" });
  const md = useMediaQuery({ query: "(min-width: 48rem)" });
  const sm = useMediaQuery({ query: "(min-width: 40rem)" });
  const xs = useMediaQuery({ query: "(max-width: 40rem)" });

  return {
    xxxl,
    xxl,
    xl,
    lg,
    md,
    sm,
    xs,
  };
};
