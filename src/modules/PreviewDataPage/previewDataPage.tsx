import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Typography } from "@mui/material";
import Summary from "@/components/Summary/summary";
import DataTable from "@/components/table/table";
import { FC } from "react";

const PreviewDataPage: FC = () => {
  return (
    <>
      <PageHeader type="Preview" />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gap: "1.5rem",
          mt: "1rem",
        }}
      >
        <Summary heading="test heading" description="this is a description " />

        <Paper type="light-border">
          <DataTable />
        </Paper>
      </Box>
    </>
  );
};
export default PreviewDataPage;
