import { PageHeader } from "@/components/PageHeader";
import { RetriverCard } from "@/components/RetriverCard";
import { Select_RetrieverData } from "@/utils/data";
import { RetrieverIconsTypes } from "@/utils/types";
import { Box } from "@mui/material";

const SelectRetrieverPage = () => {
  return (
    <Box
      sx={{
        padding: "2rem 1rem 0 ",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        height: "100%",
      }}
    >
      <PageHeader variant="Select Retriver" />

      {/* Grid Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 210px)",
          alignItems: "flex-start",
          justifyItems: "center",
          width: "100%",
          height: "fit-content",
          gap: "1rem",
          justifyContent: "space-between",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {Select_RetrieverData.map((card, i) => (
          <RetriverCard
            description={card.description}
            icon={card.icon as RetrieverIconsTypes}
            status={card.status}
            title={card.title}
            key={i}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SelectRetrieverPage;
