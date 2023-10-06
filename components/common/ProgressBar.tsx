import { LinearProgress, Stack, Typography } from "@mui/material"

export function ProgressBar({ progress }) {
  return (
    <Stack spacing={1} width="100%">
      <Typography alignSelf="center" variant="body1">
        {progress == 100 ? "Załadowano!" : "Ładowanie zdjęć..."}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          maxWidth: "100%",
          height: "0.8rem",
          borderRadius: "0.5rem",
          bgcolor: (theme) => theme.palette.grey[400],
          "& .MuiLinearProgress-bar": {
            bgcolor: "black",
            borderRadius: "0.5rem",
          },
        }}
      />
    </Stack>
  )
}
