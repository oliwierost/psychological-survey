import { Box, Container, Divider, Stack, Typography } from "@mui/material"
import { BeigeButton } from "components/common/BeigeButton"
import { BeigePaper } from "components/common/BeigePaper"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getRandomImages } from "storage/images"
import { useFirestore, useFirestoreDocData, useStorage } from "reactfire"
import { useSurveyStore } from "storage/survey-store"
import { getDownloadURL, ref } from "firebase/storage"
import { doc, query } from "firebase/firestore"
import { Client, HydrationProvider } from "react-hydration-provider"
import { nanoid } from "nanoid"
import { useRouter } from "next/router"

export default function index() {
  const {
    reset: resetStore,
    setFirstTaskImages,
    setFirstTaskDownloadURLs,
    setThirdTaskImages,
    setThirdTaskDownloadURLs,
    setId,
    setWords,
    setQuestions,
  } = useSurveyStore((state) => ({
    reset: state.reset,
    setFirstTaskDownloadURLs: state.setFirstTaskDownloadURLs,
    setFirstTaskImages: state.setFirstTaskImages,
    setThirdTaskDownloadURLs: state.setThirdTaskDownloadURLs,
    setThirdTaskImages: state.setThirdTaskImages,
    setId: state.setId,
    setWords: state.setWords,
    setQuestions: state.setQuestions,
  }))
  const [tempFirstImages, setTempFirstImages] = useState([])
  const [tempThirdImages, setTempThirdImages] = useState([])
  const storage = useStorage()
  const firestore = useFirestore()
  const settingsRef = doc(firestore, "admin/Settings")
  const { data: settings } = useFirestoreDocData(settingsRef)
  const router = useRouter()
  const { id } = router.query

  const setImages = async () => {
    const { firstTaskImages: firstImages, thirdTaskImages: thirdImages } =
      await getRandomImages(storage)
    setTempFirstImages(firstImages)
    setTempThirdImages(thirdImages)
  }

  const setImageURLs = async (images, task) => {
    try {
      if (images.length > 0) {
        const promises = images.map((imageName) => {
          const imageRef = ref(storage, imageName)
          return getDownloadURL(imageRef)
        })
        const urls = await Promise.all(promises)
        if (task === 1) {
          setFirstTaskDownloadURLs(urls)
        } else {
          setThirdTaskDownloadURLs(urls)
        }
      }
    } catch (error) {
      console.error("Error fetching image URLs:", error)
    }
  }

  useEffect(() => {
    setFirstTaskImages(tempFirstImages)
    setThirdTaskImages(tempThirdImages)
    setImageURLs(tempFirstImages, 1)
    setImageURLs(tempThirdImages, 3)
  }, [tempFirstImages, tempThirdImages])

  const setSurveyId = () => {
    setId(id)
  }

  useEffect(() => {
    resetStore()
    setImages()
    setSurveyId()
  }, [])

  useEffect(() => {
    const selectedWords = []
    while (selectedWords.length < settings?.levels) {
      const randomIndex = Math.floor(Math.random() * settings?.words.length)
      const randomWord = settings?.words[randomIndex]
      if (!selectedWords.includes(randomWord)) {
        selectedWords.push(randomWord)
      }
    }
    setWords(selectedWords)
    setQuestions(settings?.questions)
  }, [settings])

  return (
    <Box bgcolor="#fffff0">
      <Container
        maxWidth="md"
        sx={{
          height: "100vh",
        }}
        bgcolor="#fffff0"
      >
        <HydrationProvider>
          <Client>
            <Stack
              alignItems="center"
              spacing={5}
              height="100%"
              justifyContent="center"
            >
              <BeigePaper height="fit-content">
                <Divider orientation="horizontal" />
                <Stack height="100%" justifyContent="space-around" spacing={1}>
                  <Typography
                    variant="body1"
                    textAlign="justify"
                    color="grey.800"
                  >
                    To zadanie dotyczy procesów poznawczych zaangażowanych w
                    postrzeganie obiektów. Za chwilę zobaczysz 30 fotografii
                    przedstawiające różne zwierzęta. Fotografie będą zmieniały
                    się same w równym tempie. Przyglądaj się prezentowanym
                    zwierzętom najlepiej jak potrafisz, ponieważ po prezentacji
                    nastąpią zadania sprawdzające Twoją spostrzegawczość.
                  </Typography>
                  <Divider orientation="horizontal" />
                  <Typography
                    variant="body1"
                    textAlign="justify"
                    color="grey.800"
                    alignSelf="center"
                  >
                    Jeśli jesteś gotowy/a, aby obejrzeć zdjęcia kliknij „Dalej”.
                  </Typography>
                  <Divider orientation="horizontal" />
                </Stack>
              </BeigePaper>
              <Link
                href={{
                  pathname: "/badanie",
                  query: { id },
                }}
                passHref
              >
                <a>
                  <BeigeButton>
                    {id == undefined ? "Brak id!" : "Dalej"}
                  </BeigeButton>
                </a>
              </Link>
            </Stack>
          </Client>
        </HydrationProvider>
      </Container>
    </Box>
  )
}
