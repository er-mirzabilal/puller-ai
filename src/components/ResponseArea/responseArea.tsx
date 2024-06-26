import { palette } from "@/theme/Palette";
import { Box, Skeleton, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { Paper } from "../Paper";
import "./responseArea.css";
import { Prompt, UpdateVariables } from "@/utils/types";
import { getFormatedDescription, replaceIdWithVariable } from "@/utils/common";

interface ResponseAreaProps {
  prompt?: Prompt;
  handleUpdate?: (value: UpdateVariables) => void;
  isLoading?: boolean;
  handleMouseUp: () => void;
  isEditingText?: boolean;
  textSelected?: string;
  indiceStart?: number;
  indiceEnd?: number;
}

const ResponseArea: FC<ResponseAreaProps> = ({
  prompt,
  handleUpdate,
  isLoading,
  handleMouseUp,
  isEditingText,
  textSelected,
  indiceStart,
  indiceEnd,
}) => {
  const companyName = localStorage.getItem("companyName");
  const SelectedVariableId = localStorage.getItem("variableId");
  const responseTxt = useMemo(() => {
    const handleClickVariable = (value: UpdateVariables) => {
      // Perform action when a variable value is clicked
      if (handleUpdate) {
        handleUpdate(value);
      }
    };

    return replaceIdWithVariable(
      prompt as Prompt,
      handleClickVariable,
      companyName as string
    );
  }, [prompt, SelectedVariableId]);

  const FormatedDescription = useMemo(() => {
    return getFormatedDescription(prompt as Prompt);
  }, [isEditingText]);
  return (
    <>
      {/* response description */}
      <Paper
        variant="dark-border"
        sx={{
          border: `1px solid ${palette.color.gray[700]}`,
          height: "fit-content",
          padding: 1.2,
          gap: 1,
          pb: 5,
          m: 0,
          mt: 1,
        }}
      >
        {/* <Typography
          variant={"display-xs"}
          sx={{
            width: "98%",
            pr: 5,
            pt: 1,
            m: "auto",
            textAlign: "start",
            color: isOpenSelectBar
              ? palette.opacity.lightGray
              : palette.base.white,
          }}
          component="p"
        >
          The data request will give you transaction level data (from the
          <Tooltip
            variant="info"
            title="Seasonal Transactions"
            description="“TXN_SZNAL” table . This query uses a table called Transactions that contains the following columns:"
          >
            <Typography
              variant={"display-xs"}
              onClick={handleOpenSelectBar}
              sx={{
                borderRadius: "8px",
                bgcolor: isOpenSelectBar ? palette.base.white : "",
                color: isOpenSelectBar ? palette.color.midnightPlum : "",
                mx: "5px",
                pb: "3px",
                pr: "4px",
                ":hover": {
                  backgroundColor: palette.color.gray[600],
                },
              }}
            >
              {variable}
            </Typography>
          </Tooltip>
          ) for the past 52 weeks, ending March 15, 2024, grouped by week and by
          Store ID. It only covers product SKUs that include Flyease technology,
          which is determined from INT DB for Product ID values 1234 and 5678
        </Typography> */}
        {/* gif loader */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "flex-start",
            mt: 1,
          }}
        >
          {/* <Box>
            <Box sx={{ transform: "scale(200%)", mt: 0.7 }}>
              <Icon icon="logoIcon" height={30} width={30} />
            </Box>
          </Box> */}
          {isLoading ? (
            <>
              <pre
                style={{
                  width: "100%",
                  paddingRight: 50,
                  margin: "auto",
                  textAlign: "start",
                }}
              >
                <Skeleton style={{ width: "100%", margin: "0", height: 32 }} />
                <Skeleton style={{ width: "100%", margin: "0", height: 32 }} />
                <Skeleton style={{ width: "80%", margin: "0", height: 32 }} />
              </pre>
            </>
          ) : (
            <Typography
              variant="display-xs-response"
              sx={{
                width: "98%",
                pr: 5,
                m: "auto",
                textAlign: "start",
                color: palette.base.white,
              }}
              component="div"
              className="animated-genrated-text"
              onMouseUp={isEditingText ? () => {} : handleMouseUp}
            >
              {isEditingText ? (
                <>
                  {FormatedDescription?.slice(0, indiceStart ?? 0)}
                  <span style={{ background: "#7a8089" }}>{textSelected}</span>
                  {FormatedDescription?.slice(indiceEnd ?? 0)}
                </>
              ) : (
                responseTxt
              )}
            </Typography>
          )}
        </Box>
      </Paper>

      {/* <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
        {/* origninal text *
        <Paper
          variant="dark-border"
          sx={{
            border: `1px solid ${palette.color.gray[700]}`,
            height: "fit-content",
            margin: 0,
            padding: 1,
            width: "100%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // animation: "fallingEffect 0.5s ease forwards",
            position: "relative",
            zIndex: 10,
            // opacity: 0,
          }}
        >
          <Box
            sx={{
              width: "98%",
              m: "auto",
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                width: "80%",
              }}
            >
              <Typography variant="text-xs-bold">Original</Typography>
              {isLoading ? (
                <Skeleton style={{ width: "90%", margin: "auto" }} />
              ) : (
                <Typography
                  className="animated-genrated-text"
                  variant="text-xs-regular"
                  color={palette.color.gray[300]}
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {content?.original}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "122px" }}>
              <Button
                sx={{
                  width: "122px",
                  height: "38px !important",
                }}
                disabled={isLoading}
                onClick={handleUpdate}
                label="Run Query"
                variant="contained"
              />
            </Box>
          </Box>
        </Paper>
        {/* down text *
        <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
          {isLoading ? (
            <Skeleton style={{ width: "90%", margin: "auto" }} />
          ) : (
            <Typography variant="text-sm" color={palette.color.gray[300]}>
              This query is estimated to take X minutes and will be
              approximately X size.
              <span style={{ textDecoration: "underline" }}>
                <CustomLink color="#90919b" variant="simple" href="#">
                  Need to optimize?
                </CustomLink>
              </span>
            </Typography>
          )}
        </Box>
      </Box> */}
    </>
  );
};
export default ResponseArea;
