import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import { Button } from "../Button";

interface alertCardProps {
  name?: string;
  avatar: string;
  product?: string;
  price?: number;
  time: string;
  description?: string;
  type: "user" | "option";
  dataLength: number;
  index: number;
}

const AlertCard: FC<alertCardProps> = ({
  name,
  avatar,
  price,
  product,
  time,
  type,
  description,
  dataLength,
  index,
}) => {
  switch (type) {
    case "user":
      return (
        <Box
          display={"flex"}
          flexDirection={"column"}
          bgcolor={"rgb(64,76,89)"}
          sx={{
            borderBottomLeftRadius: index === dataLength - 1 ? "14px" : 0,
            borderBottomRightRadius: index === dataLength - 1 ? "14px" : 0,
          }}
        >
          <Divider sx={{ bgcolor: "rgb(62,64,71)" }} />
          <Box
            padding={"1rem"}
            display={"flex"}
            alignItems={"center"}
            gap={"1rem"}
          >
            <Image src={avatar} alt="avatar" width={48} height={48} />
            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant="text-md-regular">
                <Typography variant="text-md-semibold">{name} </Typography>
                placed a new order for
                <Typography variant="text-md-semibold"> {product} </Typography>
                totaling
                <Typography variant="text-md-semibold"> ${price}</Typography>
              </Typography>
              <Typography variant="text-sm">{time}</Typography>
            </Box>
          </Box>
          <Divider sx={{ bgcolor: "rgb(62,64,71)" }} />
        </Box>
      );
    case "option":
      return (
        <Box
          display={"flex"}
          flexDirection={"column"}
          bgcolor={"rgb(64,76,89)"}
          sx={{
            borderBottomLeftRadius: index === dataLength - 1 ? "14px" : 0,
            borderBottomRightRadius: index === dataLength - 1 ? "14px" : 0,
          }}
        >
          <Divider sx={{ bgcolor: "rgb(62,64,71)" }} />
          <Box
            padding={"1rem"}
            display={"flex"}
            alignItems={"flex-start"}
            gap={"1rem"}
          >
            <Image src={avatar} alt="avatar" width={48} height={48} />
            <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
              <Typography variant="text-md-semibold">{description}</Typography>
              <Button
                sx={{
                  minHeight: 32,
                  minWidth: 170,
                  width: 170,
                  height: "32px !important",
                  p: 0,
                }}
                variant="outlined"
                label="Explore segmentation"
              />
              <Typography variant="text-sm">{time}</Typography>
            </Box>
          </Box>

          <Divider sx={{ bgcolor: "rgb(62,64,71)" }} />
        </Box>
      );
  }
};

export default AlertCard;