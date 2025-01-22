import React from "react";

export const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(
    window.matchMedia(query).matches,
  );

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};
