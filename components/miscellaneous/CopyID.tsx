import { Box, Divider, Stack, Typography } from "@mui/material"
import { BeigePaper } from "../common/BeigePaper"
import { useRouter } from "next/router"
export function CopyID() {
  const router = useRouter()
  const { id } = router.query
  return (
    <Box>
      <BeigePaper width="fit-content" height="fit-content">
        <Stack alignItems="center" spacing={3}>
          <Divider orientation="horizontal" sx={{ width: "100%" }} />
          <Typography variant="h5" textAlign="center">
            {id == undefined
              ? "Wyniki nie zostały zapisane z uwagi na brak ID."
              : "Wyniki badania zostały zapisane. Dziękujemy za udział! Teraz moesz zamknąć stronę i kontynuować badanie na platformie qualtrics."}
          </Typography>
          <Divider orientation="horizontal" sx={{ width: "100%" }} />
        </Stack>
      </BeigePaper>
    </Box>
  )
}
