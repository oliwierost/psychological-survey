import { FirebaseStorage, getDownloadURL, ref } from "firebase/storage"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SurveyStore {
  reset: () => void
  currentTask: number
  setCurrentTask: (currentTask: number) => void
  firstTaskImages: object
  setFirstTaskImages: (firstTaskImages: string[]) => void
  firstTaskIndex: number
  setFirstTaskIndex: () => void
  firstTaskDownloadURLs: string[]
  setFirstTaskDownloadURLs: (urls: string[]) => void
  thirdTaskImages: object
  setThirdTaskImages: (thirdTaskImages: string[]) => void
  thirdTaskIndex: number
  setThirdTaskIndex: () => void
  thirdTaskDownloadURLs: string[]
  setThirdTaskDownloadURLs: (urls: string[]) => void
  thirdTaskAnswers: string[]
  setThirdTaskAnswers: (indexes: number[], answer: string) => void
  thirdTaskAnswerTimes: number[]
  setThirdTaskAnswerTimes: (indexes: number[], time: number) => void
  thirdTaskCorrect: string[]
  setThirdTaskCorrect: (indexes: number[], correct: string) => void
  currentLevel: number
  setCurrentLevel: () => void
  id: string
  setId: (id: string) => void
  progress: number
  setProgress: (progress: number) => void
  words: string[]
  setWords: (words: string[]) => void
  questions: string[]
  setQuestions: (questions: string[]) => void
}

const initialState = {
  currentTask: 0,
  firstTaskImages: {},
  firstTaskIndex: 0,
  firstTaskDownloadURLs: [],
  thirdTaskImages: {},
  thirdTaskIndex: 0,
  thirdTaskDownloadURLs: [],
  thirdTaskAnswers: [],
  thirdTaskAnswerTimes: [],
  thirdTaskCorrect: [],
  currentLevel: 1,
  id: null,
  progress: 0,
  words: [],
  questions: [],
}

export const useSurveyStore = create(
  persist<SurveyStore>(
    (set, get) => ({
      ...initialState,
      reset: () => set(initialState),
      setCurrentTask: (currentTask) => set({ currentTask: currentTask }),
      setFirstTaskImages: (firstTaskImages) =>
        set({
          firstTaskImages: setFirstTaskImages(firstTaskImages, get),
        }),
      setFirstTaskIndex: () =>
        set({ firstTaskIndex: get().firstTaskIndex + 1 }),
      setFirstTaskDownloadURLs: (urls) => set({ firstTaskDownloadURLs: urls }),
      setThirdTaskImages: (thirdTaskImages) =>
        set({
          thirdTaskImages: setThirdTaskImages(thirdTaskImages, get),
        }),
      setThirdTaskIndex: () =>
        set({ thirdTaskIndex: get().thirdTaskIndex + 1 }),
      setThirdTaskDownloadURLs: (urls) => set({ thirdTaskDownloadURLs: urls }),
      setThirdTaskAnswers: (indexes, answer) =>
        set({
          thirdTaskAnswers: setThirdTaskAnswers(indexes, answer, get),
        }),
      setThirdTaskAnswerTimes: (indexes, time) =>
        set({
          thirdTaskAnswerTimes: setThirdTaskAnswerTimes(indexes, time, get),
        }),
      setThirdTaskCorrect: (indexes, correct) =>
        set({
          thirdTaskCorrect: setThirdTaskCorrect(indexes, correct, get),
        }),
      setCurrentLevel: () => set({ currentLevel: get().currentLevel + 1 }),
      setId: (id) => set({ id: id }),
      setProgress: (progress) =>
        set({
          progress: get().progress + progress,
        }),
      setWords: (words) => set({ words: words }),
      setQuestions: (questions) => set({ questions: questions }),
    }),
    {
      name: "survey-storage",
    }
  )
)

function setFirstTaskImages(images, get) {
  const firstTaskImages = get().firstTaskImages
  images.forEach((image, index) => {
    const propertyName = `zad1_zdj${index + 1}`
    firstTaskImages[propertyName] = image
  })
  return firstTaskImages
}

function setThirdTaskImages(images, get) {
  const thirdTaskImages = get().thirdTaskImages
  images.forEach((image, index) => {
    const propertyName = `zad3_zdj${index + 1}`
    thirdTaskImages[propertyName] = image
  })
  return thirdTaskImages
}

function setThirdTaskAnswers(indexes, answer, get) {
  const thirdTaskAnswers = get().thirdTaskAnswers
  const updatedAnswers = {
    ...thirdTaskAnswers,
    [`zdj${indexes[0] + 1}_odp${indexes[1] + 1}`]: answer,
  }
  return updatedAnswers
}

function setThirdTaskAnswerTimes(indexes, time, get) {
  const thirdTaskAnswerTimes = get().thirdTaskAnswerTimes

  const updatedTimes = {
    ...thirdTaskAnswerTimes,
    [`zdj${indexes[0] + 1}_czas${indexes[1] + 1}`]: time,
  }
  return updatedTimes
}

function setThirdTaskCorrect(indexes, correct, get) {
  const thirdTaskAnswerCorrect = get().thirdTaskCorrect

  const updatedCorrect = {
    ...thirdTaskAnswerCorrect,
    [`zdj${indexes[0] + 1}_pop${indexes[1] + 1}`]: correct,
  }
  return updatedCorrect
}
