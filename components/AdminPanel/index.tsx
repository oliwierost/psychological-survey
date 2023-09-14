import { Stack, Tab, Tabs } from "@mui/material"
import { FirstTabPanel } from "./FirstTabPanel"
import { SecondTabPanel } from "./SecondTabPanel"
import { ThirdTabPanel } from "./ThirdTabPanel"
import { useEffect, useState } from "react"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { collection } from "firebase/firestore"

export interface Settings {
  levels: number
  words: string[]
  questions: string[]
  randomAnimals: number
  randomFillers: number
}

export function AdminPanel() {
  const [value, setValue] = useState(0)
  const [settings, setSettings] = useState(null)
  const firestore = useFirestore()
  const settingsRef = collection(firestore, "admin")
  const { data: settingsFields } = useFirestoreCollectionData(settingsRef)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (settingsFields) {
      setSettings(settingsFields[0])
    }
  }, [settingsFields])

  return (
    <Stack height="100%" pt="5rem" spacing={4}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#c4a484",
          },
          "& .MuiTab-root": {
            color: "grey.700",
          },
        }}
      >
        <Tab label="Zdjęcia" />
        <Tab label="Słowa" />
        <Tab label="Pytania" />
      </Tabs>
      <Stack>
        <FirstTabPanel
          value={value}
          index={0}
          settings={settings as Settings}
        />
        <SecondTabPanel
          value={value}
          index={1}
          settings={settings as Settings}
        />
        <ThirdTabPanel
          value={value}
          index={2}
          settings={settings as Settings}
        />
      </Stack>
    </Stack>
  )
}
