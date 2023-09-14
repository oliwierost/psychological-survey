import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import {
  Alert,
  Chip,
  Divider,
  Grid,
  IconButton,
  OutlinedInput,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material"
import { Settings } from "./index"
import { BeigeButton } from "components/common/BeigeButton"
import { useEffect, useState } from "react"
import { useFirestore } from "reactfire"
import { doc, updateDoc } from "firebase/firestore"
import { BeigePaper } from "components/common/BeigePaper"

interface TabPanelProps {
  index: number
  value: number
  settings: Settings
}

export function SecondTabPanel({ value, index, settings }: TabPanelProps) {
  const [levels, setLevels] = useState(0)
  const [words, setWords] = useState([])
  const [newWord, setNewWord] = useState("")
  const [toastOpen, setToastOpen] = useState(false)
  const firestore = useFirestore()

  useEffect(() => {
    setLevels(settings?.levels)
  }, [settings])

  useEffect(() => {
    setWords(settings?.words)
  }, [settings])

  const handleSave = async () => {
    const settingsRef = doc(firestore, "admin", "Settings")
    await updateDoc(settingsRef, {
      levels: levels,
      words: words,
    })
  }
  const handleReset = () => {
    setLevels(settings.levels)
    setWords(settings.words)
  }

  const handleAddWord = () => {
    if (newWord === "" || words.includes(newWord)) {
      setToastOpen(true)
      return
    }
    setWords((prevWords) => [...prevWords, newWord])
    setNewWord("")
  }

  const handleDeleteWord = (index) => {
    setWords((prevWords) => prevWords.filter((_, i) => i !== index))
  }

  return (
    <Stack role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Stack justifyContent="center" spacing={2}>
          <BeigePaper>
            <Stack justifyContent="space-evenly" direction="row" spacing={2}>
              <BeigeButton width="18rem" onClick={() => handleSave()}>
                Zapisz
              </BeigeButton>
              <Divider orientation="vertical" flexItem />
              <BeigeButton width="18rem" onClick={() => handleReset()}>
                Przywróć domyślne
              </BeigeButton>
            </Stack>
          </BeigePaper>
          <BeigePaper>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography alignSelf="center">
                Zmień poziom trudności (liczba słów do odgadnięcia)
              </Typography>
              <Divider orientation="vertical" flexItem />
              <OutlinedInput
                type="number"
                value={levels}
                onChange={(e) => setLevels(e.target.value as unknown as number)}
              />
            </Stack>
          </BeigePaper>
          <BeigePaper>
            <Stack spacing={2}>
              <Stack
                direction="row"
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography align="center">
                  Dodaj słowa do odgadnięcia (po jednym)
                </Typography>
                <Divider orientation="vertical" flexItem />
                <OutlinedInput
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="np. Krzesło, Drzewo..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddWord()
                    }
                  }}
                  endAdornment={
                    <IconButton onClick={() => handleAddWord()}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  }
                />
              </Stack>
              <Divider />
              <Grid container spacing={2} justifyContent="flex-start">
                {words.map((chip, index) => (
                  <Grid item>
                    <Chip
                      key={index}
                      label={chip}
                      onDelete={() => handleDeleteWord(index)}
                    />
                  </Grid>
                ))}
              </Grid>
              <Divider />
            </Stack>
          </BeigePaper>
        </Stack>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        autoHideDuration={2000}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Słowo nie może się powtarzać!
        </Alert>
      </Snackbar>
    </Stack>
  )
}
