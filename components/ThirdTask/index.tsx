import axios from "axios"
import { Stack } from "@mui/material"
import { Question } from "./Question"
import { ThirdTaskImages } from "./ThirdTaskImages"
import { BeigePaper } from "components/common/BeigePaper"
import { BeigeButton } from "../common/BeigeButton"
import { useSurveyStore } from "storage/survey-store"
import { useState } from "react"
import { ThirdTaskQuestion } from "./ThirdTaskQuestion"

export function ThirdTask() {
  const [isReady, setIsReady] = useState(false)
  const {
    id,
    setCurrentTask,
    firstTaskImages,
    setThirdTaskIndex,
    thirdTaskImages,
    thirdTaskIndex,
    thirdTaskAnswers,
    thirdTaskAnswerTimes,
    thirdTaskCorrect,
    setThirdTaskCorrect,
    questions,
  } = useSurveyStore((state) => ({
    id: state.id,
    setCurrentTask: state.setCurrentTask,
    firstTaskImages: state.firstTaskImages,
    thirdTaskAnswers: state.thirdTaskAnswers,
    thirdTaskImages: state.thirdTaskImages,
    thirdTaskIndex: state.thirdTaskIndex,
    setThirdTaskIndex: state.setThirdTaskIndex,
    thirdTaskAnswerTimes: state.thirdTaskAnswerTimes,
    thirdTaskCorrect: state.thirdTaskCorrect,
    setThirdTaskCorrect: state.setThirdTaskCorrect,
    questions: state.questions,
  }))

  const updateSheet = async () => {
    const data = {
      id: id,
      ...firstTaskImages,
      ...thirdTaskImages,
      ...thirdTaskAnswers,
      ...thirdTaskAnswerTimes,
      ...thirdTaskCorrect,
    }
    axios.post(
      "https://script.google.com/macros/s/AKfycbzzFQSoOLTJqApJciDfIDJoHVO6Br3c9Q42hFDR7g_d1zo9DSphAyieFQXSrBW9LXrCcg/exec",
      JSON.stringify(data)
    )
  }

  const checkAnswer = () => {
    const currentImage = thirdTaskImages[`zad3_zdj${thirdTaskIndex + 1}`]
    const currentAnswer = thirdTaskAnswers[`zdj${thirdTaskIndex + 1}_odp1`]
    if (
      (currentImage.includes("fillers") && currentAnswer == "Tak") ||
      (!currentImage.includes("fillers") && currentAnswer == "Nie")
    ) {
      setThirdTaskCorrect([thirdTaskIndex, 0], "Nie")
    } else {
      setThirdTaskCorrect([thirdTaskIndex, 0], "Tak")
    }
  }

  const handleClick = () => {
    checkAnswer()
    if (thirdTaskIndex < Object.values(thirdTaskImages).length - 1) {
      setThirdTaskIndex()
    } else {
      updateSheet()
      setCurrentTask(4)
    }
  }

  const handleReady = () => {
    setIsReady(true)
  }

  return (
    <Stack width="100%" height="100%" justifyContent="space-between">
      <Stack
        display={isReady ? "inline-flex" : "none"}
        width="100%"
        spacing={2}
        alignItems="center"
        direction="column"
      >
        <ThirdTaskImages />
        <Stack
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          width="100%"
        >
          <BeigePaper>
            <Stack pb="2rem" width="100%">
              {questions.map((question, questionIndex) => (
                <Question question={question} questionIndex={questionIndex} />
              ))}
            </Stack>
          </BeigePaper>
          <BeigeButton
            onClick={() => handleClick()}
            disabled={questions
              .map((question, questionIndex) => {
                return (
                  thirdTaskAnswers[
                    `zdj${thirdTaskIndex + 1}_odp${questionIndex + 1}`
                  ] === undefined
                )
              })
              .some((answer) => answer === true)}
          >
            Następne zdjęcie
          </BeigeButton>
        </Stack>
      </Stack>
      <Stack
        alignItems="center"
        justifyContent="space-evenly"
        display={isReady ? "none" : "inline-flex"}
        height="100%"
      >
        <ThirdTaskQuestion />
        <BeigeButton onClick={() => handleReady()}>
          Rozpocznij zadanie
        </BeigeButton>
      </Stack>
    </Stack>
  )
}
