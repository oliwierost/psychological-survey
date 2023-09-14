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
import { BeigePaper } from "components/common/BeigePaper"
import { useEffect, useState } from "react"
import { useFirestore } from "reactfire"
import { Settings } from "./index"
import { doc, updateDoc } from "firebase/firestore"
import { BeigeButton } from "components/common/BeigeButton"

interface TabPanelProps {
  index: number
  value: number
  settings: Settings
}

export function ThirdTabPanel({ value, index, settings }: TabPanelProps) {
  const [questions, setQuestions] = useState([])
  const [newQuestion, setNewQuestion] = useState("")
  const [toastOpen, setToastOpen] = useState(false)
  const firestore = useFirestore()

  const handleSave = async () => {
    const settingsRef = doc(firestore, "admin", "Settings")
    await updateDoc(settingsRef, {
      questions: questions,
    })
  }
  const handleReset = () => {
    setQuestions(settings.questions)
  }

  const handleAddQuestion = () => {
    if (newQuestion === "" || questions.includes(newQuestion)) {
      setToastOpen(true)
      return
    }
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion])
    setNewQuestion("")
  }

  const handleDeleteWord = (index) => {
    setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index))
  }

  useEffect(() => {
    setQuestions(settings?.questions)
  }, [settings])

  return (
    <Stack role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Stack alignItems="flex-start" spacing={2}>
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
            <Stack spacing={4}>
              <Stack spacing={4} width="100%">
                <Typography alignSelf="start" noWrap>
                  Dodaj pytania do zadania trzeciego (po jednym)
                </Typography>
                <Divider orientation="horizontal" flexItem />
                <OutlinedInput
                  sx={{ width: "100%" }}
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="np. Czy widziałeś już to zwierzę?"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddQuestion()
                    }
                  }}
                  endAdornment={
                    <IconButton onClick={() => handleAddQuestion()}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  }
                />
              </Stack>
              <Divider orientation="horizontal" flexItem />
              <Grid container spacing={2} justifyContent="flex-start">
                {questions.map((chip, index) => (
                  <Grid item>
                    <Chip
                      key={index}
                      label={chip}
                      onDelete={() => handleDeleteWord(index)}
                    />
                  </Grid>
                ))}
              </Grid>
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
          Pytanie nie może się powtarzać!
        </Alert>
      </Snackbar>
    </Stack>
  )
}
