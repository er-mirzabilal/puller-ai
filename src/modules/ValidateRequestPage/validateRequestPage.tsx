"use client";
import { Box, Skeleton } from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import { PannelArea } from "../../modules/PannelArea";
import { PageHeader } from "@/components/PageHeader";
import { useSubmitExecute } from "@/hooks/useExecute";
import GraphModal2 from "@/modals/graphModals/graphModal2";
import { useGetSinglePrompt } from "@/hooks/usePrompt";
import { palette } from "@/theme/Palette";
import { SQL_Editor } from "@/components/sql_Editor";
import { useSubmitValidate } from "@/hooks/useValidate";
import { Prompt } from "@/utils/types";
import { Icon } from "@/components/Icon";
import { Paper } from "@/components/Paper";
import { ResponseArea } from "@/components/ResponseArea";
interface Props {
  id: string;
}
const ValidateRequestPage: FC<Props> = ({ id }) => {
  const [CurrentType, setCurrentType] = useState<"text" | "graph" | "SQL">(
    "text"
  );
  const [isOpenSelectBar, setIsOpenSelectBar] = useState(false);
  const { mutate: submitExecute, isError: submitExecuteError } =
    useSubmitExecute();
  const {
    data: validatedPrompt,
    mutate: submitValidate,
    isLoading: submitValidateLoading,
    isSuccess: submitValidateSuccess,
  } = useSubmitValidate();
  const { data: singlePrompt, refetch: refetchPrompt } = useGetSinglePrompt(id);

  const handleUpdate = () => {
    if (id) {
      submitExecute({ prompt: `query#${id}` });
    }
  };
  const prompt = useMemo(() => {
    if (submitValidateSuccess && validatedPrompt) {
      return validatedPrompt;
    } else {
      return singlePrompt;
    }
  }, [singlePrompt, submitValidateSuccess]);
  const handleOpenGraph = () => {
    setCurrentType("graph");
  };

  const handleOpenSQL_Editor = () => {
    setCurrentType("SQL");
  };
  const handleOpenTxt = () => {
    setCurrentType("text");
  };
  const handleCloseSelectBar = () => {
    setIsOpenSelectBar(false);
  };
  const handleOpenSelectBar = () => {
    setIsOpenSelectBar(true);
  };
  useEffect(() => {
    if (id) {
      refetchPrompt();
    }
  }, [refetchPrompt, id]);
  useEffect(() => {
    if (submitValidateLoading) {
      setCurrentType("text");
    }
  }, [submitValidateLoading]);
  const content = {
    response: prompt?.description as string,
    original:
      "Can I get data to understand how Flyease technology products have been performing this past year? I want to be able to pivot by SKU or by store, to understand transactional data by week.",
  };

  return (
    <>
      <Box sx={{ px: 2, pt: 1, m: "auto" }}>
        <PageHeader
          title="Validate Request"
          buttons={[
            {
              label: "TXT",
              variant: "rounded-SQL",
              sx: {
                background:
                  CurrentType === "text" ? palette.color.gray[650] : "none",
              },
              onClick: () => handleOpenTxt(),
            },
            {
              label: "SQL",
              variant: "rounded-SQL",
              sx: {
                background:
                  CurrentType === "SQL" ? palette.color.gray[650] : "none",
              },
              onClick: () => handleOpenSQL_Editor(),
            },
            {
              label: "Graph",
              variant: "rounded-SQL",
              sx: {
                background:
                  CurrentType === "graph" ? palette.color.gray[650] : "none",
              },
              onClick: () => handleOpenGraph(),
            },
          ]}
        />

        {/* <GraphModal open={openGraph} handleClose={() => handleOpenGraph()} /> */}
        {submitValidateLoading ? (
          <Box
            sx={{
              display: "flex",
              width: isOpenSelectBar
                ? { lg: "76%", md: "70%", xs: "60%" }
                : "100%",
              height: "calc(100vh - 174px)",
              flexDirection: "column",
              justifyContent: "space-between",
              overflowX: "hidden",
              transition: "width 0.5s ease",
              mt: 1,
            }}
          >
            <ResponseArea isLoading={submitValidateLoading} />
          </Box>
        ) : (
          <Box sx={{ width: "100%", m: "auto", pt: 2 }}>
            {CurrentType === "SQL" ? (
              <Box
                sx={{
                  height: "100%",
                  margin: 0,
                  width: "100%",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  animation: "fallingEffect 0.8s ease forwards",
                  position: "relative",
                  zIndex: 10,
                  opacity: 1,
                }}
              >
                <SQL_Editor code={prompt?.sql ?? "Select * from test;"} />
              </Box>
            ) : CurrentType === "graph" ? (
              prompt && (
                <Box
                  sx={{
                    height: "100%",
                    margin: 0,
                    width: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    animation: "fallingEffect2 0.8s ease forwards",
                    position: "relative",
                    zIndex: 10,
                    opacity: 0,
                  }}
                >
                  <GraphModal2
                    prompt={prompt as Prompt}
                    validatePrompt={submitValidate}
                  />
                </Box>
              )
            ) : (
              <PannelArea
                content={content}
                handleUpdate={() => handleUpdate()}
                isOpenSelectBar={isOpenSelectBar}
                handleOpenSelectBar={() => handleOpenSelectBar()}
                handleCloseSelectBar={() => handleCloseSelectBar()}
              />
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default ValidateRequestPage;
