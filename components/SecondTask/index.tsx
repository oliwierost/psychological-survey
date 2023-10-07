import { Snackbar, Alert, Typography, Divider, Box } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useSurveyStore } from "../../storage/survey-store"
import { BeigePaper } from "components/common/BeigePaper"
import { Slot } from "./Slot"
import { BeigeButton } from "components/common/BeigeButton"
import { ArrowForward, ArrowRight, ArrowRightAlt } from "@mui/icons-material"

export const SecondTask = () => {
  const [word, setWord] = useState("")
  const [letters, setLetters] = useState([])
  const [droppedLetters, setDroppedLetters] = useState([])
  const [toastOpen, setToastOpen] = useState(false)
  const [isSolved, setIsSolved] = useState(false)
  const [isSkipped, setIsSkipped] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [showSkip, setShowSkip] = useState(false)
  const { setCurrentTask, currentLevel, setCurrentLevel, words } =
    useSurveyStore((state) => ({
      setCurrentTask: state.setCurrentTask,
      currentLevel: state.currentLevel,
      setCurrentLevel: state.setCurrentLevel,
      words: state.words,
    }))

  const pickAndScrambleWord = () => {
    const randomWord = words[currentLevel - 1]
    const scrambled = randomWord.split("").sort(() => Math.random() - 0.5)
    if (scrambled.join("") === randomWord) {
      pickAndScrambleWord()
      return
    }
    setWord(randomWord.toUpperCase())
    setLetters(() =>
      scrambled.map((letter, index) => ({
        letter: letter.toUpperCase(),
        index,
      }))
    )
    setDroppedLetters(() => Array(scrambled.length).fill(null))
  }

  useEffect(() => {
    pickAndScrambleWord()
  }, [currentLevel])

  useEffect(() => {
    //show skip button after 10 seconds
    const timeout = setTimeout(() => {
      if (!isReady) return
      setShowSkip(true)
    }, 10000)
    return () => clearTimeout(timeout)
  }, [isReady, currentLevel])

  useEffect(() => {
    const droppedWord = droppedLetters.map((l) => l?.letter).join("")
    if (droppedWord === word && droppedWord !== "" && word !== "") {
      setIsSolved(true)
    }
  }, [droppedLetters])

  useEffect(() => {
    if (isSolved || isSkipped) {
      setToastOpen(true)
      const timeout = setTimeout(() => {
        if (currentLevel >= words.length) {
          setCurrentTask(3)
          return
        }
        setIsSolved(false)
        setIsSkipped(false)
        setCurrentLevel()
        setShowSkip(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [isSolved, isSkipped])

  const handleSlotClick = (index) => {
    if (!droppedLetters[index]) return
    setDroppedLetters((prev) => {
      const newState = [...prev]
      const removedLetter = newState[index]
      newState[index] = null
      setLetters((prev) => {
        const newState = [...prev]
        newState[removedLetter.index] = removedLetter
        return newState
      })
      return newState
    })
  }

  const handleLetterClick = (index) => {
    if (!letters[index]) return
    const emptySlotIndex = droppedLetters.indexOf(null)
    if (emptySlotIndex === -1) return
    setDroppedLetters((prev) => {
      const newState = [...prev]
      newState[emptySlotIndex] = letters[index]
      return newState
    })
    setLetters((prev) => {
      const newState = [...prev]
      newState[index] = null
      return newState
    })
  }

  return (
    <Stack alignItems="center" width="100%">
      {!isReady ? (
        <Stack
          alignItems="center"
          spacing={5}
          height="100%"
          justifyContent="center"
        >
          <BeigePaper height="fit-content">
            <Stack spacing={1} height="100%">
              <Divider orientation="horizontal" />
              <Typography variant="body1" textAlign="justify" color="grey.800">
                A teraz poprosimy Cię o ułożenie słów ze wszystkich liter
                wylosowanych przez system. To zadanie będzie polegało na
                ułożeniu trzech różnych słów.
              </Typography>
              <Divider orientation="horizontal" />
            </Stack>
          </BeigePaper>
          <BeigeButton onClick={() => setIsReady(true)}>
            Rozpocznij zadanie
          </BeigeButton>
        </Stack>
      ) : (
        <Stack position="relative">
          <Stack spacing={10} alignItems="center" width="fit-content">
            <BeigePaper p="1rem">
              <Typography variant="body1" textAlign="center">
                Ułóż słowo ze wszystkich liter przedstawionych poniżej.
              </Typography>
              {showSkip ? (
                <Box position="absolute" top="80%" right="5%">
                  <BeigeButton
                    px="1rem"
                    py="0.5rem"
                    onClick={() => setIsSkipped(true)}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body1">Pomiń</Typography>
                      <ArrowForward fontSize="medium" />
                    </Stack>
                  </BeigeButton>
                </Box>
              ) : null}
            </BeigePaper>
            <Stack
              spacing={2}
              alignItems="center"
              width="100%"
              sx={{ userSelect: "none" }}
            >
              <Stack
                direction="row"
                width="100%"
                spacing={1}
                justifyContent="center"
              >
                {droppedLetters.map((letter, index) => (
                  <BeigePaper p="0" key={index}>
                    <Slot
                      letter={letter}
                      index={index}
                      onClick={handleSlotClick}
                    />
                  </BeigePaper>
                ))}
              </Stack>
              <Stack
                direction="row"
                width="100%"
                spacing={1}
                justifyContent="center"
              >
                {letters.map((letter, index) => (
                  <BeigePaper p="0" key={index}>
                    <Slot
                      letter={letter}
                      index={index}
                      onClick={handleLetterClick}
                    />
                  </BeigePaper>
                ))}
              </Stack>
            </Stack>
          </Stack>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={toastOpen}
            onClose={() => setToastOpen(false)}
            autoHideDuration={2000}
          >
            <Alert
              onClose={() => setToastOpen(false)}
              severity={isSolved ? "success" : "info"}
              sx={{ width: "100%" }}
            >
              {isSolved ? "Brawo!" : "Pominięto!"}
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </Stack>
  )
}
