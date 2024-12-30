import React from "react";

import QuizResultsMobile from "./components/QuizResultsMobile/QuizResultsMobile";
import QuizResultsDesktop from "./components/QuizResultsDesktop/QuizResultsDesktop";

import { useIsMobile } from "../../utils/hooks/useIsMobile";

export default function QuizResults(props) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <QuizResultsMobile {...props} />;
  }
  return <QuizResultsDesktop {...props} />;
}
