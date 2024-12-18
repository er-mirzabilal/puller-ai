import {
  Box,
  TableCell,
  TableRow,
  TableHead as MuiTableHead,
} from "@mui/material";
import { FC } from "react";

interface TableHeadProps {
  columns: string[];
  isFilter?: boolean;
}

const TableHead: FC<TableHeadProps> = ({ columns, isFilter }) => {
  return (
    <MuiTableHead
      sx={{
        bgcolor: "transparent",
        position: "sticky",
        top: 0,
        // background: rgb(46,38,70);
        borderRadius: "0px !important",
        background: isFilter
          ? "linear-gradient(86deg, rgba(50,38,72, 1) 0%, rgba(35,41,64,1) 50%, rgba(25,48,60,1) 100%)"
          : "",
      }}
    >
      <TableRow sx={{ borderRadius: "0px !important" }}>
        {columns?.map((column) => (
          <TableCell
            key={column}
            sx={{
              border: "none",
              backgroundColor: "transparent",
              padding: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {column}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;
