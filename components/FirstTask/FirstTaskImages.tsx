"use client"
import Image from "next/image"
import { Box, Stack } from "@mui/material"
import { useEffect } from "react"
import { BeigePaper } from "../common/BeigePaper"
import { useSurveyStore } from "storage/survey-store"

export function FirstTaskImages() {
  const {
    currentTask,
    setCurrentTask,
    firstTaskIndex,
    setFirstTaskIndex,
    firstTaskDownloadURLs,
    thirdTaskDownloadURLs,
    progress,
    setProgress,
  } = useSurveyStore((state) => ({
    currentTask: state.currentTask,
    setCurrentTask: state.setCurrentTask,
    firstTaskIndex: state.firstTaskIndex,
    setFirstTaskIndex: state.setFirstTaskIndex,
    firstTaskDownloadURLs: state.firstTaskDownloadURLs,
    thirdTaskDownloadURLs: state.thirdTaskDownloadURLs,
    progress: state.progress,
    setProgress: state.setProgress,
  }))

  useEffect(() => {
    if (currentTask === 1) {
      const interval = setInterval(() => {
        setFirstTaskIndex()
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [currentTask])

  useEffect(() => {
    if (
      firstTaskIndex === firstTaskDownloadURLs.length - 1 &&
      progress >= 100
    ) {
      setCurrentTask(2)
    }
  }, [firstTaskIndex])

  const handleImageLoad = () => {
    setProgress(
      (1 / (firstTaskDownloadURLs.length + thirdTaskDownloadURLs.length)) * 100
    )
  }

  return (
    <Stack>
      {firstTaskDownloadURLs.map((url, index) => (
        <Box
          sx={{
            display: index === firstTaskIndex ? "block" : "none",
          }}
          height="30rem"
          width="30rem"
        >
          <BeigePaper>
            <Image
              key={index}
              src={url}
              layout="fill"
              objectFit="contain"
              style={{
                borderRadius: "0.5rem",
                transform: "scale(0.9)",
              }}
              priority
              onLoad={() => handleImageLoad()}
              alt="animal image"
            />
          </BeigePaper>
        </Box>
      ))}
    </Stack>
  )
}
