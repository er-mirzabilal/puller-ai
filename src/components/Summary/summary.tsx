import { Typography } from "@mui/material";
import { Paper } from "../Paper";
import { FC } from "react";

interface Summary {
  heading: string;
  description: string | JSX.Element;
}

const Summary: FC<Summary> = ({ heading, description }) => {
  return (
    <Paper
      variant="light-border"
      sx={{
        maxWidth: "100%",
        wordWrap: "break-word",
        padding: "1rem",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        scrollbarWidth: "none",
        whiteSpace: "pre-wrap",
      }}
    >
      <Typography variant="text-lg-semibold"> {heading} </Typography>
      <br />
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          fontSize: "15px",
          fontFamily: "Inter",
        }}
        component={"pre"}
        variant="text-sm-regular"
      >
        {description}
      </Typography>
    </Paper>
  );
};

export default Summary;
