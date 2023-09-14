import { LinearProgress, Stack, Typography } from "@mui/material"

export function ProgressBar({ progress }) {
  return (
    <Stack spacing={1}>
      <Typography alignSelf="center">Ładowanie zdjęć...</Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          width: "30rem",
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
