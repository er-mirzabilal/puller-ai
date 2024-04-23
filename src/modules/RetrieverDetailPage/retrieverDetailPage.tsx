import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Typography } from "@mui/material";

const RetrieverDetailPage = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        height: "calc(100vh - 130px)",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <PageHeader type="Retriever Detail" />
      <Paper
        type="light-border"
        sx={{
          width: "100%",
          height: "100%",
        }}
      ></Paper>
    </Box>
  );
};

export default RetrieverDetailPage;