import { Snackbar, Alert, Typography, Divider } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useSurveyStore } from "../../storage/survey-store"
import { Slot } from "./Slot"
import { BeigePaper } from "components/common/BeigePaper"
import { BeigeButton } from "components/common/BeigeButton"

export const SecondTask = () => {
  const [word, setWord] = useState("")
  const [letters, setLetters] = useState([])
  const [droppedLetters, setDroppedLetters] = useState([])
  const [toastOpen, setToastOpen] = useState(false)
  const [isSolved, setIsSolved] = useState(false)
  const [isReady, setIsReady] = useState(false)
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
    const droppedWord = droppedLetters.map((l) => l?.letter).join("")
    if (droppedWord === word && droppedWord !== "" && word !== "") {
      setIsSolved(true)
    }
  }, [droppedLetters])
  console.log(word)
  useEffect(() => {
    if (isSolved) {
      setToastOpen(true)
      const timeout = setTimeout(() => {
        if (currentLevel >= words.length) {
          setCurrentTask(3)
          return
        }
        setIsSolved(false)
        setCurrentLevel()
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [isSolved])

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
        <BeigePaper p="1rem" height="20rem">
          <Stack height="100%" justifyContent="space-around">
            <Divider orientation="horizontal" />
            <Stack alignItems="center" spacing={3}>
              <Typography variant="h6" textAlign="center" color="grey.800">
                A teraz poprosimy Cię o ułożenie słów ze wszystkich liter
                wylosowanych przez system. To zadanie będzie polegało na
                ułożeniu trzech różnych słów.
              </Typography>
              <BeigeButton onClick={() => setIsReady(true)}>
                Rozpocznij zadanie
              </BeigeButton>
            </Stack>
            <Divider orientation="horizontal" />
          </Stack>
        </BeigePaper>
      ) : (
        <Stack>
          <Stack spacing={10} alignItems="center" width="fit-content">
            <BeigePaper p="1rem">
              <Typography variant="h6" noWrap>
                Ułóż słowo ze wszystkich liter przedstawionych poniżej.
              </Typography>
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
                  <BeigePaper p="0">
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
                  <BeigePaper p="0">
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
              severity="success"
              sx={{ width: "100%" }}
            >
              Brawo!
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </Stack>
  )
}
