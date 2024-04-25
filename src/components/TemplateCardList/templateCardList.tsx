import { TEMPLATE_PRIVATE_DATA, TEMPLATE_PUBLIC_DATA } from "@/utils/constants";
import { Box } from "@mui/material";
import TemplateCard from "../TemplateCard/templateCard";
import { FC } from "react";

interface TemplateCardListProps {
  isActive: "private" | "public";
}

const TemplateCardList: FC<TemplateCardListProps> = ({ isActive }) => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        maxHeight: "94%",
        scrollbarWidth: "none",
      }}
    >
      {(isActive === "private"
        ? TEMPLATE_PRIVATE_DATA
        : TEMPLATE_PUBLIC_DATA
      ).map((card, index) => (
        <TemplateCard key={index} index={index} card={card} />
      ))}
    </Box>
  );
};

export default TemplateCardList;
