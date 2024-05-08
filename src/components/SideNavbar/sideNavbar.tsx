"use client";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import MuiListItemButton from "@/theme/overrides/listItemButton";
import { Icon } from "../Icon";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "../logo";
import { SideBar_Data } from "@/utils/data";
import { palette } from "@/theme/Palette";
import "./sideNavbar.css";
import { Paper } from "../Paper";
import { CURRENT_MODE, MODES } from "@/utils/constants";
import { AlertModal } from "@/modals/AlertModal";

const SideNavbar = () => {
  const Route = useRouter();
  const pathname = usePathname();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const path = pathname.split("/")[1];
  const drawerWidth = 200;
  const handleAlert = (isAlert: boolean) => {
    if (CURRENT_MODE === MODES.PILOT && isAlert) {
      setIsOpenAlert(true);
    }
  };
  useEffect(() => {
    if (pathname === "/") {
      Route.push("/request");
    }
  }, [Route, pathname]);
  return (
    <Box
      sx={{
        width: drawerWidth,
      }}
    >
      <Drawer
        sx={{
          position: "static",
          flexShrink: 0,
          borderRight: `1px solid ${palette.color.gray[150]} `,
          background: palette.linearGradient.lightGray,
          "& .MuiDrawer-paper": {
            width: drawerWidth,

            boxSizing: "border-box",
            borderRight: `1px solid ${palette.color.gray[150]} `,
            background: palette.linearGradient.lightGray,
            boxShadow:
              "0px 1.127px 3.38px 0px rgba(255, 255, 255, 0.25) inset, 0px 0.501px 12.02px -0.501px rgba(0, 0, 0, 0.18)",
            backdropFilter: "blur(30px)",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "20px",
            minHeight: "100vh",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                mt: "20px",
              }}
            >
              <Logo variant="default" />
              {CURRENT_MODE === MODES.PILOT && (
                <Paper
                  variant="light-border"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "50px",
                    width: "fit-content",
                    padding: "0px 8px",
                    mr: "10px",
                    mt: "-15px",
                    backgroundColor: "#263f50",
                    border: 0,
                  }}
                >
                  <Typography
                    sx={{
                      background:
                        "linear-gradient(274deg, rgba(141,107,255,1) 2%, rgba(91,145,252,1) 50%, rgba(6,191,250,1) 99%)",
                      fontSize: "10px",
                      fontWeight: "900",
                      "$-webkit-background-clip": "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                    variant="text-xxs-bold"
                  >
                    Private Beta
                  </Typography>
                </Paper>
              )}
            </Box>

            <Box>
              <List>
                {SideBar_Data.map((item, index) => (
                  <ListItem key={index}>
                    <Link
                      href={item.link === "alert" ? "#" : item.link}
                      style={{ width: "100%" }}
                    >
                      <div className="navbar-container">
                        <MuiListItemButton
                          sx={{
                            display: "flex",
                            gap: "12px",
                            color: palette.base.white,
                            border:
                              path === item.name
                                ? "1px solid #8f8f94"
                                : "1px solid transparent",
                            background:
                              path === item.name.toLowerCase()
                                ? "rgb(118,119,124)"
                                : path === "" && index === 0
                                  ? "rgb(118,119,124)"
                                  : "",
                          }}
                          onClick={() =>
                            handleAlert(item.link === "alert" ? true : false)
                          }
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                            }}
                          >
                            <Icon width={18} height={18} icon={item.icon} />
                          </ListItemIcon>

                          <ListItemText
                            sx={{
                              fontSize: "14px",
                            }}
                            primary={item.name}
                          />
                        </MuiListItemButton>
                      </div>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          <Box>
            <List>
              {CURRENT_MODE === MODES.DEMO &&
                [
                  {
                    name: "Administration",
                    img: <Icon width={18} height={18} icon="adminIcon" />,
                  },
                ].map((text, index) => (
                  <ListItem key={index}>
                    <div className="navbar-container">
                      <MuiListItemButton
                        sx={{
                          color: palette.base.white,
                          border:
                            path === text.name
                              ? "1px solid #8f8f94"
                              : "1px solid transparent",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                          }}
                        >
                          {text.img}
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            fontSize: "14px",
                          }}
                          primary={text.name}
                        />
                      </MuiListItemButton>
                    </div>
                  </ListItem>
                ))}
            </List>
          </Box>
        </Box>
      </Drawer>
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </Box>
  );
};

export default SideNavbar;
