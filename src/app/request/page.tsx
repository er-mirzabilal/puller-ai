"use client";
import AppLayout from "@/common/appLayout/appLayout";
import { getCurrentPage } from "@/libs/redux/features/isLoadingRequest";
import { useAppSelector } from "@/libs/redux/hooks";
import CreateRequestPage from "@/modules/CreateRequestPage/CreateRequestPage";
import ValidateRequestPage from "@/modules/ValidateRequestPage/validateRequestPage";
import { useEffect, useState } from "react";

function Page() {
  const [id, setId] = useState<string | null>(null);
  const [isCurrentPage, setisCurrentPage] = useState<string | null>(null);
  const currentPage = useAppSelector(getCurrentPage);

  useEffect(() => {
    const getIdFromParams = () => {
      const url = window.location.href;
      const urlParams = new URLSearchParams(url.split("?")[1]);
      const idParams = urlParams.get("id");

      if (idParams) {
        setId(idParams);
        console.log(idParams, "data");
      }
    };
    getIdFromParams();

    const intervalId = setInterval(() => {
      if (!currentPage) {
        clearInterval(intervalId);
        return;
      }
      if (id) {
        clearInterval(intervalId);
        return;
      }

      getIdFromParams();
    }, 1000);
    setisCurrentPage(currentPage);
    return () => clearInterval(intervalId);
  }, [currentPage]);
  console.log(currentPage, "currentPage");
  return (
    <AppLayout>
      {isCurrentPage === "validate" || id ? (
        <ValidateRequestPage id={id as string} />
      ) : (
        <CreateRequestPage />
      )}
    </AppLayout>
  );
}
export default Page;
