import { Box, Typography } from "@mui/material";
import { Icon } from "../Icon";
import { Paper } from "../Paper";
import { FC } from "react";
import "./rectangleCard.css";
import { RectangleCardIcons } from "@/utils/types";
import { palette } from "@/theme/Palette";

interface RectangleCardProps {
  icon: RectangleCardIcons;
  title: string;
  onClick?: () => void;
}

const RectangleCard: FC<RectangleCardProps> = ({ icon, title, onClick }) => {
  return (
    <Paper
      variant="light-border"
      sx={{
        width: "100%",
        padding: "0.9rem",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1.8rem",
        paddingLeft: "15px",
        borderRadius: "5px",
        ":hover": {
          cursor: "pointer",
          background: palette.linearGradient.darkBlue,
          "& .child": {
            background: palette.color.darkblue,
          },
        },
      }}
      onClick={onClick}
    >
      <div className="rectangle-card-container">
        <Box
          sx={{
            background: palette.color.gray[500],
            width: 60,
            height: 60,
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
            ":hover": {
              background: palette.opacity.blue,
            },
          }}
          className="child"
        >
          <Icon icon={icon} height={30} width={30} />
        </Box>
      </div>

      <Typography variant="text-md-semibold">{title}</Typography>
    </Paper>
  );
};

export default RectangleCard;
