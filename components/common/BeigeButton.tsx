import { Button, Typography } from "@mui/material"
import { BeigePaper } from "./BeigePaper"

export function BeigeButton({
  onClick = () => null,
  children,
  borderRadius = "0.5rem",
  width = "fit-content",
  height = "fit-content",
  disabled = false,
}) {
  return (
    <BeigePaper borderRadius={borderRadius} width={width} height={height} p={0}>
      <Button
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        disableElevation
        sx={{
          py: "1rem",
          px: "2rem",
          width: width,
          height: height,
          textTransform: "none",
          bgcolor: "#cbcaab",
          color: "grey.800",
          borderRadius: borderRadius,
          "&:hover": {
            bgcolor: "#c4a484",
          },
        }}
      >
        <Typography variant="h5" noWrap>
          {children}
        </Typography>
      </Button>
    </BeigePaper>
  )
}
