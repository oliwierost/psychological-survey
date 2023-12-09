import axios from "axios"
import { Stack, Typography } from "@mui/material"
import { Question } from "./Question"
import { ThirdTaskImages } from "./ThirdTaskImages"
import { BeigePaper } from "components/common/BeigePaper"
import { BeigeButton } from "../common/BeigeButton"
import { useSurveyStore } from "storage/survey-store"
import { useEffect, useState } from "react"
import { ThirdTaskQuestion } from "./ThirdTaskQuestion"
import { ArrowForward, Done } from "@mui/icons-material"
import { useRouter } from "next/router"

export function ThirdTask() {
  const [isReady, setIsReady] = useState(false)
  const {
    setCurrentTask,
    firstTaskImages,
    sortedFirstTaskImages,
    setThirdTaskIndex,
    thirdTaskImages,
    sortedThirdTaskImages,
    thirdTaskIndex,
    thirdTaskAnswers,
    thirdTaskAnswerTimes,
    thirdTaskCorrect,
    setThirdTaskCorrect,
    sortedThirdTaskAnswers,
    sortedThirdTaskTimes,
    setSortedThirdTaskCorrect,
    sortedThirdTaskCorrect,
    questions,
  } = useSurveyStore((state) => ({
    setCurrentTask: state.setCurrentTask,
    firstTaskImages: state.firstTaskImages,
    sortedFirstTaskImages: state.sortedFirstTaskImages,
    thirdTaskAnswers: state.thirdTaskAnswers,
    thirdTaskImages: state.thirdTaskImages,
    sortedThirdTaskImages: state.sortedThirdTaskImages,
    thirdTaskIndex: state.thirdTaskIndex,
    setThirdTaskIndex: state.setThirdTaskIndex,
    sortedThirdTaskAnswers: state.sortedThirdTaskAnswers,
    setSortedThirdTaskAnswers: state.setSortedThirdTaskAnswers,
    thirdTaskAnswerTimes: state.thirdTaskAnswerTimes,
    thirdTaskCorrect: state.thirdTaskCorrect,
    setThirdTaskCorrect: state.setThirdTaskCorrect,
    setSortedThirdTaskCorrect: state.setSortedThirdTaskCorrect,
    sortedThirdTaskTimes: state.sortedThirdTaskTimes,
    sortedThirdTaskCorrect: state.sortedThirdTaskCorrect,
    questions: state.questions,
  }))
  const router = useRouter()
  const { id } = router.query

  const updateSheet = async () => {
    if (id === undefined) return
    console.log(sortedThirdTaskTimes)
    const data = {
      id: id,
      ...firstTaskImages,
      ...thirdTaskImages,
      ...sortedFirstTaskImages,
      ...sortedThirdTaskImages,
      ...thirdTaskAnswers,
      ...sortedThirdTaskAnswers,
      ...thirdTaskAnswerTimes,
      ...thirdTaskCorrect,
      ...sortedThirdTaskTimes,
      ...sortedThirdTaskCorrect,
    }
    axios.post(
      "https://script.google.com/macros/s/AKfycbxPu2k-FfNOUhrVoAXBQXSU6LYwz0IGNmIWatugB9CCEHNMRorSOi-4p2Hh_Kb0UHs0cQ/exec",
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
      setThirdTaskCorrect([thirdTaskIndex, 0], "Błędna")
    } else {
      setThirdTaskCorrect([thirdTaskIndex, 0], "Poprawna")
    }
  }

  const handleClick = async () => {
    checkAnswer()
    setSortedThirdTaskCorrect(thirdTaskIndex)
    if (thirdTaskIndex < Object.values(thirdTaskImages).length - 1) {
      setThirdTaskIndex()
    }
  }

  const handleReady = () => {
    setIsReady(true)
  }

  useEffect(() => {
    if (thirdTaskCorrect[`zdj${thirdTaskIndex + 1}_pop1`] !== undefined) {
      updateSheet()
      setCurrentTask(4)
    }
  }, [thirdTaskCorrect])

  return (
    <Stack width="100%" height="100%" justifyContent="space-between">
      <Stack
        display={isReady ? "inline-flex" : "none"}
        width="100%"
        height="100%"
        spacing={2}
        alignItems="center"
        direction="column"
        justifyContent="center"
      >
        <ThirdTaskImages />
        <Stack
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          width="100%"
        >
          <BeigePaper p="1rem">
            <Stack width="100%">
              {questions.map((question, questionIndex) => (
                <Question
                  question={question}
                  questionIndex={questionIndex}
                  key={questionIndex}
                />
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
            <Stack
              width="100%"
              justifyContent="center"
              alignItems="center"
              direction="row"
              spacing={1}
            >
              <Typography variant="h6">
                {thirdTaskIndex == Object.values(thirdTaskImages).length - 1
                  ? "Zakończ"
                  : "Dalej"}
              </Typography>
              {thirdTaskIndex == Object.values(thirdTaskImages).length - 1 ? (
                <Done fontSize="small" />
              ) : (
                <ArrowForward fontSize="small" />
              )}
            </Stack>
          </BeigeButton>
        </Stack>
      </Stack>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={5}
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
