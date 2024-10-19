"use client";
import { useEffect, useState, type ReactNode } from "react";
import { FeedbackButton } from "./FeedbackButton";

type ButtonState = "SUCCESS" | "ERROR" | "LOADING" | "DEFAULT";
let timeout: ReturnType<typeof setTimeout> | null = null;

export function FeedbackButtonContainer(): ReactNode {
  const [buttonState, setButtonState] = useState<ButtonState>("DEFAULT");

  function onButtonClick(): void {
    setButtonState("LOADING");

    timeout = setTimeout(() => {
      setButtonState("SUCCESS");

      timeout = setTimeout(() => {
        setButtonState("DEFAULT");
      }, 2000);
    }, 2000);
  }

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <FeedbackButton
      defaultText="Submit"
      successText="Boom! Done"
      isSuccessful={buttonState === "SUCCESS"}
      errorText="It didn't work out"
      hasErrored={buttonState === "ERROR"}
      loadingText="Hang on in there"
      isLoading={buttonState === "LOADING"}
      onClick={onButtonClick}
    />
  );
}
