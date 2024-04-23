"use client";
import LoaderComponent from "@/common/LoaderComponent/LoaderComponent";
import AppLayout from "@/common/appLayout/appLayout";
import PreviewDataPage from "@/modules/PreviewDataPage/previewDataPage";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const PreviewData = () => {
  const [isLoading, setIsLoading] = useState(true);

  const toggleStateWithTimeout = () => {
    setIsLoading(true); // Set state to true initially

    setTimeout(() => {
      setIsLoading(false); // Set state to false after 5 seconds
    }, 4000); // 4000 milliseconds = 5 seconds
  };

  useEffect(() => {
    toggleStateWithTimeout();
  }, []);

  return (
    <>
      <AppLayout>
        {isLoading ? <LoaderComponent type="Loading" /> : <PreviewDataPage />}
      </AppLayout>
    </>
  );
};

export default PreviewData;
