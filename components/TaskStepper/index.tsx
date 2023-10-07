import BallotIcon from "@mui/icons-material/Ballot"
import { Step, StepLabel, Stepper, Typography } from "@mui/material"
import { Photo, Extension, CheckBox } from "@mui/icons-material"
import { useSurveyStore } from "../../storage/survey-store"
import { useEffect, useState } from "react"

export function TaskStepper() {
  const [activeStep, setActiveStep] = useState(0)
  const { currentTask } = useSurveyStore((state) => ({
    currentTask: state.currentTask,
  }))
  const steps = ["Oglądaj zdjęcia", "Ułóż wyraz", "Opowiedz na pytania"]
  const stepperIcons = [<Photo />, <Extension />, <BallotIcon />]

  useEffect(() => {
    setActiveStep(currentTask - 1)
  }, [currentTask])

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{ width: "100%", justifySelf: "flex-start" }}
    >
      {steps.map((label, index) => {
        return (
          <Step key={label} completed key={index}>
            <StepLabel
              icon={index < activeStep ? <CheckBox /> : stepperIcons[index]}
            >
              <Typography>{label}</Typography>
            </StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}
