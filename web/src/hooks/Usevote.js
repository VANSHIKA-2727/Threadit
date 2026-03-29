import { useState } from "react";

export function useVote(initialScore = 0, initialDirection = 0) {
  const [score, setScore] = useState(initialScore);
  const [direction, setDirection] = useState(initialDirection);

  const vote = (dir) => {
    if (direction === dir) {
      setScore((s) => s - dir);
      setDirection(0);
    } else {
      setScore((s) => s + dir - direction);
      setDirection(dir);
    }
  };

  return { score, direction, vote };
}