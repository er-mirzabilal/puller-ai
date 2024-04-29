import { palette } from "@/theme/Palette";
import { Box, Button, Typography } from "@mui/material";
import { FC, useState } from "react";
import "./CustomButtons.css";
import { CustomButtonVariants, UserProps } from "@/utils/types";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { Menu } from "@/components/Menu";

interface buttonProps {
  variant: CustomButtonVariants;
  text?: string;
  selectData?: UserProps;
  onClick?: () => void;
}

const CustomButton: FC<buttonProps> = ({
  variant,
  selectData,
  text,
  onClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isImage =
    variant === "select" && selectData?.avatar
      ? selectData.avatar
      : "/default-avatar.png";

  switch (variant) {
    case "smallbutton":
      return (
        <div className="container-btn-small">
          <Button
            sx={{
              borderRadius: "8px",
              backgroundColor: "#7a8089",
              height: "22px !important",
              width: "40px !important",
              pr: 0,
              pl: 0,
              pt: 1.2,
              m: 0,
              mt: -0.6,
              ":hover": {
                backgroundColor: "rgb(95,112,125)",
              },
            }}
            onClick={onClick}
            variant="outlined"
          >
            <Typography variant="text-xs" sx={{ color: "#e6e6e6" }}>
              {text}
            </Typography>
          </Button>
        </div>
      );
    case "rounded-SQL":
      return (
        <div className="container-round-btn">
          <Button
            sx={{
              borderRadius: "50px",
              border: `1px solid var(--vison-pro-stock, ${palette.base.white})`,
              backgroundColor: "#425459",
              width: 82,
              height: 40,
              py: 2,
              px: 4,
              transition: "background 3.3s ease",
              ":hover": {
                // backgroundColor: "rgb(95,112,125)",
                background:
                  "linear-gradient(54deg, rgba(108,33,177,1) 16%, rgba(26,138,169,1) 100%)",
                borderRadius: "50px",
              },
            }}
            onClick={onClick}
            variant="outlined"
          >
            <Typography variant="text-md-bold">{text}</Typography>
          </Button>
        </div>
      );
    case "select":
      const menuItems = [
        {
          text: "Logout",
        },
      ];
      return (
        <div className="container-round-btn">
          <Button
            sx={{
              borderRadius: "50px",
              border: `1px solid var(--vison-pro-stock, ${palette.base.white})`,
              background: "rgb(115,129,133) !important",
              width: 122,
              height: 48,
              py: 2,
              px: 4,
              ":hover": {
                borderRadius: "50px !important",
                background: "rgb(95,112,125) !important",
              },
            }}
            variant="outlined"
            onClick={handleMenuOpen}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Image
                width={50}
                height={50}
                src={isImage}
                alt="profile-picture"
              />
              <Typography variant="text-md-bold">{selectData?.name}</Typography>

              <Icon icon="arrowDown" />
            </Box>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            menuItems={menuItems}
            onClose={handleMenuClose}
          />
        </div>
      );
    case "round":
      return (
        <div className="round-btn-container">
          <Button
            variant="text"
            sx={{
              borderRadius: "100%",
              bgcolor: "rgb(90,93,105)",
              p: 0,
              minWidth: 20,
              width: "20px !important",
              height: "20px !important",
              ":hover": {
                borderRadius: "100%",

                backgroundColor: "rgb(95,112,125)",
              },
            }}
          >
            {text}
          </Button>
        </div>
      );
    case "request-history":
      return (
        <div className="requestHistory-btn-container">
          <Button
            variant="text"
            sx={{
              "@keyframes exitGradient": {
                "0%": {
                  background:
                    "linear-gradient(126deg, rgba(108,33,177,1) 16%, rgba(26,138,169,1) 100%)",
                },
                "100%": {
                  background:
                    "linear-gradient(to top left, rgba(108,33,177,1), transparent)",
                },
              },
              width: "216px",
              color: "#5d92fe",
              border: "none",
              backgroundColor: "#263f50",
              transition: "background 0.3s ease",
              borderRadius: "8px",
              "&:hover": {
                color: palette.base.white,
                background: "rgba(105,65,198,255)",
                borderRadius: "8px",
              },
              "&:hover, &:focus": {
                border: "none",
                borderRadius: "8px",
              },
              "&:not(:hover)": {
                animation: "exitGradient 0.3s ease ",
              },
            }}
          >
            {text}
          </Button>
        </div>
      );
  }
};

export default CustomButton;
