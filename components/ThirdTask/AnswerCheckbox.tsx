import CircleIcon from "@mui/icons-material/Circle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { useSurveyStore } from "storage/survey-store"

export function AnswerCheckbox({ questionIndex, answer }) {
  const [displayTime, setDisplayTime] = useState(null)
  const {
    currentTask,
    thirdTaskIndex,
    thirdTaskAnswers,
    setThirdTaskAnswers,
    setThirdTaskAnswerTimes,
  } = useSurveyStore((state) => ({
    currentTask: state.currentTask,
    thirdTaskIndex: state.thirdTaskIndex,
    thirdTaskAnswers: state.thirdTaskAnswers,
    setThirdTaskAnswers: state.setThirdTaskAnswers,
    setThirdTaskAnswerTimes: state.setThirdTaskAnswerTimes,
    thirdTaskAnswerTimes: state.thirdTaskAnswerTimes,
  }))

  const getDisplayTime = () => {
    const time = new Date().getTime()
    setDisplayTime(time)
  }

  useEffect(() => {
    getDisplayTime()
  }, [thirdTaskIndex, currentTask])

  const handleChange = (event) => {
    const time = new Date().getTime()
    const answerTime = time - displayTime
    setThirdTaskAnswers([thirdTaskIndex, questionIndex], event.target.value)
    setThirdTaskAnswerTimes([thirdTaskIndex, questionIndex], answerTime / 1000)
  }

  return (
    <FormControlLabel
      sx={{
        position: "relative",
      }}
      checked={
        thirdTaskAnswers[`zdj${thirdTaskIndex + 1}_odp${questionIndex + 1}`] ===
        answer.label
      }
      onChange={handleChange}
      key={answer.label}
      value={answer.label}
      control={
        <Checkbox
          checkedIcon={
            <Stack
              width="fit-content"
              height="fit-content"
              bgcolor="#fffff0"
              alignItems="center"
              justifyContent="center"
            >
              <CircleIcon
                sx={{
                  color: grey[700],
                }}
              />
            </Stack>
          }
          icon={
            <Stack
              width="fit-content"
              height="fit-content"
              bgcolor="#fffff0"
              justifyContent="center"
            >
              <RadioButtonUncheckedIcon />
            </Stack>
          }
        />
      }
      label={
        <Typography noWrap position="absolute" bottom="-1.5rem">
          {answer.label}
        </Typography>
      }
      labelPlacement="bottom"
    />
  )
}
