import Image from "next/image"
import { Box, Stack } from "@mui/material"
import { BeigePaper } from "../common/BeigePaper"
import { useSurveyStore } from "../../storage/survey-store"

export function ThirdTaskImages() {
  const {
    firstTaskDownloadURLs,
    thirdTaskIndex,
    thirdTaskDownloadURLs,
    setProgress,
  } = useSurveyStore((state) => ({
    firstTaskDownloadURLs: state.firstTaskDownloadURLs,
    thirdTaskIndex: state.thirdTaskIndex,
    thirdTaskDownloadURLs: state.thirdTaskDownloadURLs,
    setProgress: state.setProgress,
  }))

  const handleImageLoad = () => {
    setProgress(
      (1 / (firstTaskDownloadURLs.length + thirdTaskDownloadURLs.length)) * 100
    )
  }

  return (
    <Stack>
      {thirdTaskDownloadURLs.map((url, index) => (
        <Box
          sx={{
            display: index === thirdTaskIndex ? "inline-flex" : "none",
          }}
          key={index}
        >
          <BeigePaper width="23rem" height="23rem" p="0" borderRadius="0.5rem">
            <Image
              key={index}
              src={url}
              layout="fill"
              style={{
                borderRadius: "0.5rem",
              }}
              onLoad={() => handleImageLoad()}
              alt="animal image"
              priority
            />
          </BeigePaper>
        </Box>
      ))}
    </Stack>
  )
}
