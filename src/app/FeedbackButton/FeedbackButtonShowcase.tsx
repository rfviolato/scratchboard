"use client";
import { useEffect, useState, type ReactNode } from "react";
import { FeedbackButton } from "./FeedbackButton";

type ButtonState = "SUCCESS" | "ERROR" | "LOADING" | "DEFAULT";
let successTimeout: ReturnType<typeof setTimeout> | null = null;
let errorTimeout: ReturnType<typeof setTimeout> | null = null;

const buttonProps = {
  defaultText: "Submit",
  successText: "Boom! Done",
  errorText: "It didn't work out",
  loadingText: "Hang on in there",
};

export function FeedbackButtonShowcase(): ReactNode {
  const [successButtonState, setSuccessButtonState] =
    useState<ButtonState>("DEFAULT");
  const [errorButtonState, setErrorButtonState] =
    useState<ButtonState>("DEFAULT");

  function onSuccessButtonClick(): void {
    setSuccessButtonState("LOADING");

    successTimeout = setTimeout(() => {
      setSuccessButtonState("SUCCESS");

      successTimeout = setTimeout(() => {
        setSuccessButtonState("DEFAULT");
      }, 2000);
    }, 2000);
  }

  function onErrorButtonClick(): void {
    setErrorButtonState("LOADING");

    errorTimeout = setTimeout(() => {
      setErrorButtonState("ERROR");

      errorTimeout = setTimeout(() => {
        setErrorButtonState("DEFAULT");
      }, 2000);
    }, 2000);
  }

  useEffect(() => {
    return () => {
      if (successTimeout) {
        clearTimeout(successTimeout);
      }

      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="text-center">
        <h1 className="font-bold text-2xl pb-2">Success state button</h1>
        <FeedbackButton
          {...buttonProps}
          isSuccessful={successButtonState === "SUCCESS"}
          hasErrored={successButtonState === "ERROR"}
          isLoading={successButtonState === "LOADING"}
          onClick={onSuccessButtonClick}
        />
      </div>

      <div className="text-center">
        <h1 className="font-bold text-2xl pb-2">Error state button</h1>
        <FeedbackButton
          {...buttonProps}
          isSuccessful={errorButtonState === "SUCCESS"}
          hasErrored={errorButtonState === "ERROR"}
          isLoading={errorButtonState === "LOADING"}
          onClick={onErrorButtonClick}
        />
      </div>
    </div>
  );
}
