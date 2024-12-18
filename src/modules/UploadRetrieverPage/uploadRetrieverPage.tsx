"use client";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Icon } from "@/components/Icon";
import { Loader } from "@/components/Loader";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { useCreateRetriever } from "@/hooks/useRetriever";
import { AlertModal } from "@/modals/AlertModal";
import { isClient, isPilotMode } from "@/utils/constants";
import { Files, StatusTypes } from "@/utils/types";
import { Box, Input, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import FeedbackPage from "../FeedbackPage/feedbackPage";
import { toast } from "react-toastify";
import { UploadBox } from "@/components/UploadBox";

const UploadRetrieverPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  const currentPath = isClient ? window.location.pathname : "";
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [fileData, setFileData] = useState<Files[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    mutate: CreateRetriever,
    isSuccess: RetrieverCreatedSuccess,
    isLoading: CreatingRetriever,
  } = useCreateRetriever();

  const getFileContext = (name: string) => {
    const fileContextByName: any = {
      "consumer insights":
        "Detailed analysis of consumer demographics, buying patterns, and preferences.",
      "Category sales":
        "Breakdown of sales figures by product category, including monthly and annual trends.",
      "regional analysis":
        "Comprehensive report on sales performance, market share, and growth in various regions.",
      "Customer retention":
        "Data on customer retention rates, reasons for churn, and strategies for improving loyalty.",
      "consumer insights new":
        "Latest insights into consumer behavior, including recent trends, survey results, and feedback analysis.",
    };
    return (
      fileContextByName[name] ||
      "Detailed analysis of consumer demographics, buying patterns, and preferences."
    );
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        file,
        description: "",
        context:
          (file.name && getFileContext(file.name?.split(".")[0])) || file.name,
      }));
      setFileData((prevFileData) => [...prevFileData, ...newFiles]);
    }
  };

  const handleDescriptionChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newFileData = [...fileData];
      newFileData[index].description = event.target.value;
      setFileData(newFileData);
    };

  const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const handleUploadDocs = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const handleCreateRetriever = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else {
      if (name === "") {
        toast.warning("Please Enter Name.");
      } else if (fileData.length === 0) {
        toast.warning("Please Upload Files.");
      } else {
        CreateRetriever({
          title: name,
          status: StatusTypes.needPermissions,
          files: fileData,
          description: description,
          timestamp: Date.now(),
        });
        // console.log(
        //   fileData,
        //   fileData.map((data) => data.description)
        // );
      }
    }
  };

  useEffect(() => {
    setIsOpen(fileData.length > 0);
  }, [fileData, RetrieverCreatedSuccess]);

  return (
    <>
      {RetrieverCreatedSuccess ? (
        <FeedbackPage variant="retriever" />
      ) : CreatingRetriever ? (
        <Loader variant="pageLoader" type="Processing" />
      ) : (
        <Box
          sx={{
            padding: "1.2rem 1rem",
            pb: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            scrollbarWidth: "none",
            overflowY: "none",
          }}
        >
          <PageHeader title="Custom Retrievers" />

          {/* Main Container */}
          <Box
            sx={{
              overflowY: "auto",
              scrollbarWidth: "none",
              width: "100%",
              height: "100%",
            }}
          >
            <Paper
              sx={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                minHeight: "25rem",
                height: "fit-content",
              }}
              variant="light-border"
            >
              {/* Name Label & Input */}
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"flex-start"}
                gap={"0.5rem"}
              >
                <Typography variant="text-sm-medium">Name</Typography>
                <Input
                  disableUnderline
                  fullWidth
                  onChange={handleNameInput}
                  placeholder="Enter Name"
                  sx={{
                    borderRadius: "5px",
                    padding: "0.5rem 1rem",
                    border: "2px solid rgba(196, 196, 196, 0.6)",
                  }}
                />
              </Box>
              {/* Description Label & Input */}
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"flex-start"}
                gap={"0.5rem"}
              >
                <Typography variant="text-sm-medium">Description</Typography>
                <Input
                  disableUnderline
                  fullWidth
                  onChange={handleDescriptionInput}
                  placeholder="Enter Description"
                  sx={{
                    borderRadius: "5px",
                    padding: "0.5rem 1rem",
                    border: "2px solid rgba(196, 196, 196, 0.6)",
                  }}
                />
              </Box>

              {/* Upload Area */}
              <Box
                onClick={handleUploadDocs}
                sx={{
                  border: "2px solid rgba(196, 196, 196, 0.6)",
                  minHeight: "10rem",
                  height: "50%",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "1rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  multiple
                />
                <Icon icon="cloudUpload" width={40} height={40} />
                <Typography variant="text-sm-medium">
                  <Typography variant="text-sm-bold">
                    Click to upload
                  </Typography>{" "}
                  or drag and drop
                </Typography>
              </Box>

              {!isOpen ? (
                <Divider
                  type="light"
                  sx={{
                    backgroundColor: "rgb(215,215,215)",
                    mt: "10px",
                  }}
                />
              ) : (
                // Upload Cards & Inputs
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    mb: 8,
                  }}
                >
                  {fileData.map((data, index) => (
                    <UploadBox
                      key={index}
                      name={data.file.name}
                      size={data.file.size}
                      context={data?.context}
                      inputValue={data.description}
                      handleChangeInput={handleDescriptionChange(index)}
                    />
                  ))}
                </Box>
              )}

              {/* Back & Create Buttons */}
              <Box display={"flex"} justifyContent={"flex-end"} gap={"1rem"}>
                <Box width={242} height={44}>
                  <Button
                    label="Go Back"
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      if (currentPath === "/retrievers/upload" && isPilotMode) {
                        router.push(
                          `/retrievers/new?projectId=${projectId}&orgId=${orgId}`
                        );
                      } else {
                        router.back();
                      }
                    }}
                  />
                </Box>
                <Box width={242} height={44}>
                  <Button
                    label="Create Retriever"
                    variant="contained"
                    fullWidth
                    onClick={handleCreateRetriever}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
          <AlertModal
            handleClose={() => setIsOpenAlert(false)}
            open={isOpenAlert}
          />
        </Box>
      )}
    </>
  );
};

export default UploadRetrieverPage;
