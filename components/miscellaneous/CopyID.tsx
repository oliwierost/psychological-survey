import ContentCopy from "@mui/icons-material/ContentCopy"
import { Box, Card, Divider, Stack, Typography } from "@mui/material"
import { BeigePaper } from "../common/BeigePaper"
import { useEffect, useState } from "react"
import { useSurveyStore } from "../../storage/survey-store"

export function CopyID() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [copied, setCopied] = useState(false)
  const { id } = useSurveyStore((state) => ({
    id: state.id,
  }))

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(id)
      setCopied(true)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <Box>
      <BeigePaper width="fit-content" height="fit-content">
        <Stack alignItems="center" spacing={3}>
          <Typography variant="h5">Dziękujemy za udział w badaniu</Typography>
          <Divider orientation="horizontal" sx={{ width: "100%" }} />
          <Box>
            <Typography variant="h5">ID: {id}</Typography>
            <ContentCopy
              onClick={() => handleClick()}
              sx={{
                cursor: "pointer",
                position: "absolute",
                bottom: "0.4rem",
                right: "0.3rem",
              }}
            />
          </Box>
        </Stack>
      </BeigePaper>
      {copied ? (
        <Card
          sx={{
            position: "absolute",
            left: position.x,
            top: position.y - 50,
            textAlign: "center",
            height: "50px",
            px: "1rem",
            bgcolor: (theme) => theme.palette.grey[600],
            color: "white",
          }}
        >
          <Typography lineHeight="50px" variant="h6">
            Skopiowano!
          </Typography>
        </Card>
      ) : null}
    </Box>
  )
}
