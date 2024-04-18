import { Box, Typography } from "@mui/material";
import { Paper } from "../Paper";
import { Icon } from "../Icon";
import { FC } from "react";

interface retriverCardProps {
  status: "live" | "blocked" | "needPermissions" | "issues";
  icon:
    | "snowflake"
    | "segment"
    | "lytics"
    | "dataRoom"
    | "dbtCore"
    | "sfCrm"
    | "clReport"
    | "nielsen"
    | "googleAnalytics"
    | "clickstream";
  title: string;
  description: string;
}

const RetriverCard: FC<retriverCardProps> = ({
  description,
  icon,
  status,
  title,
}) => {
  return (
    <Paper
      type="light-border"
      sx={{
        padding: "1.5rem",
        width: "100%",
        // height: "226px",
        textAlign: "center",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        alignItems={"center"}
      >
        <Box position={"relative"}>
          <Icon icon={icon} width={64} height={64} />
          <Box position={"absolute"} top={"-3px"} right={"-3px"}>
            <Icon icon={status} width={12} height={12} />
          </Box>
        </Box>
        <Typography variant="text-md-semibold">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </Typography>
        <Typography variant="text-sm">{description}</Typography>
      </Box>
    </Paper>
  );
};

export default RetriverCard;