import { Paper as MuiPaper } from "@mui/material";
import { CSSProperties } from "@mui/styled-engine-sc";
import { FC, ReactNode } from "react";

interface PaperProps {
  type:
    | "light-border"
    | "dark-border"
    | "light-bg-border"
    | "light-border-2"
    | "dark-border-2";
  children?: ReactNode;
  sx?: CSSProperties;
  onClick?: () => void;
}

const Paper: FC<PaperProps> = ({ type, children, sx, onClick, ...props }) => {
  switch (type) {
    case "light-border":
      return (
        <>
          <MuiPaper
            onClick={onClick}
            {...props}
            sx={{
              borderRadius: "16px",
              border: "2px solid rgb(93,97,108)",
              background:
                "linear-gradient(143deg, rgba(255, 255, 255, 0.15) -3.54%, rgba(114, 114, 114, 0.17) 95.15%)",
              backdropFilter: "blur(20px)",
              ...sx,
            }}
          >
            {children}
          </MuiPaper>
        </>
      );
    case "dark-border":
      return (
        <>
          <MuiPaper
            onClick={onClick}
            {...props}
            sx={{
              m: 1,
              borderRadius: "16px",
              border: "2px solid var(--Vision-pro-02, #393939)",
              background:
                "linear-gradient(143deg, rgba(255, 255, 255, 0.11) -3.54%, rgba(114, 114, 114, 0.13) 95.15%)",
              backdropFilter: "blur(20px)",
              ...sx,
            }}
          >
            {children}
          </MuiPaper>
        </>
      );
    case "light-bg-border":
      return (
        <>
          <MuiPaper
            onClick={onClick}
            {...props}
            sx={{
              borderRadius: "16px",
              border: "2px solid rgba(196, 196, 196, 0.60)",
              background:
                "linear-gradient(143deg, rgba(255, 255, 255, 0.07) -3.54%, rgba(114, 114, 114, 0.08) 95.15%)",
              backdropFilter: "blur(20px)",
              ...sx,
            }}
          >
            {children}
          </MuiPaper>
        </>
      );
    case "light-border-2":
      return (
        <>
          <MuiPaper
            onClick={onClick}
            {...props}
            sx={{
              borderRadius: "16px",
              border: "2px solid rgb(110,105,122)",
              background:
                "linear-gradient(143deg, rgba(255, 255, 255, 0.07) -3.54%, rgba(114, 114, 114, 0.08) 95.15%)",
              backdropFilter: "blur(20px)",
              ...sx,
            }}
          >
            {children}
          </MuiPaper>
        </>
      );
    case "dark-border-2":
      return (
        <>
          <MuiPaper
            onClick={onClick}
            {...props}
            sx={{
              borderRadius: "16px",
              border: "1px solid rgb(51,50,65)",
              background:
                "linear-gradient(143deg, rgba(255, 255, 255, 0.07) -3.54%, rgba(114, 114, 114, 0.08) 95.15%)",
              backdropFilter: "blur(20px)",
              ...sx,
            }}
          >
            {children}
          </MuiPaper>
        </>
      );
  }
};

export default Paper;
