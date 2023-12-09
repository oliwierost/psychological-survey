import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SurveyStore {
  reset: () => void
  sortedAnimals: object
  setSortedAnimals: (animal: string) => void
  currentTask: number
  setCurrentTask: (currentTask: number) => void
  firstTaskImages: object
  setFirstTaskImages: (firstTaskImages: string[]) => void
  sortedFirstTaskImages: object
  setSortedFirstTaskImages: (sortedFirstTaskImages: object) => void
  firstTaskIndex: number
  setFirstTaskIndex: () => void
  firstTaskDownloadURLs: string[]
  setFirstTaskDownloadURLs: (urls: string[]) => void
  thirdTaskImages: object
  setThirdTaskImages: (thirdTaskImages: string[]) => void
  sortedThirdTaskImages: object
  setSortedThirdTaskImages: (sortedThirdTaskImages: object) => void
  thirdTaskIndex: number
  setThirdTaskIndex: () => void
  thirdTaskDownloadURLs: string[]
  setThirdTaskDownloadURLs: (urls: string[]) => void
  thirdTaskAnswers: string[]
  setThirdTaskAnswers: (indexes: number[], answer: string) => void
  sortedThirdTaskAnswers: object
  setSortedThirdTaskAnswers: (idx: number) => void
  thirdTaskAnswerTimes: number[]
  setThirdTaskAnswerTimes: (indexes: number[], time: number) => void
  sortedThirdTaskTimes: object
  setSortedThirdTaskTimes: (idx: number) => void
  sortedThirdTaskCorrect: object
  setSortedThirdTaskCorrect: (idx: number) => void
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
  currentTask: 3,
  sortedAnimals: {
    pies: [],
    kot: [],
    swinia: [],
    krowa: [],
    krol: [],
    filler: {
      pies: [],
      kot: [],
      swinia: [],
      krowa: [],
      krol: [],
    },
  },
  firstTaskImages: {},
  sortedFirstTaskImages: {},
  firstTaskIndex: 0,
  firstTaskDownloadURLs: [],
  thirdTaskImages: {},
  sortedThirdTaskImages: {},
  thirdTaskIndex: 0,
  thirdTaskDownloadURLs: [],
  thirdTaskAnswers: [],
  sortedThirdTaskAnswers: {},
  sortedThirdTaskTimes: {},
  sortedThirdTaskCorrect: {},
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
      setSortedAnimals: (animal) =>
        set({
          sortedAnimals: setSortedAnimals(animal, get),
        }),
      setCurrentTask: (currentTask) => set({ currentTask: currentTask }),
      setFirstTaskImages: (firstTaskImages) =>
        set({
          firstTaskImages: setFirstTaskImages(firstTaskImages, get),
        }),
      setSortedFirstTaskImages: (sortedFirstTaskImages) =>
        set({
          sortedFirstTaskImages: sortedFirstTaskImages,
        }),
      setFirstTaskIndex: () =>
        set({ firstTaskIndex: get().firstTaskIndex + 1 }),
      setFirstTaskDownloadURLs: (urls) => set({ firstTaskDownloadURLs: urls }),
      setThirdTaskImages: (thirdTaskImages) =>
        set({
          thirdTaskImages: setThirdTaskImages(thirdTaskImages, get),
        }),
      setSortedThirdTaskImages: (sortedThirdTaskImages) =>
        set({
          sortedThirdTaskImages: sortedThirdTaskImages,
        }),
      setThirdTaskIndex: () =>
        set({ thirdTaskIndex: get().thirdTaskIndex + 1 }),
      setThirdTaskDownloadURLs: (urls) => set({ thirdTaskDownloadURLs: urls }),
      setThirdTaskAnswers: (indexes, answer) =>
        set({
          thirdTaskAnswers: setThirdTaskAnswers(indexes, answer, get),
        }),
      setSortedThirdTaskAnswers: (idx) =>
        set({
          sortedThirdTaskAnswers: setSortedThirdTaskAnswers(idx, get),
        }),
      setThirdTaskAnswerTimes: (indexes, time) =>
        set({
          thirdTaskAnswerTimes: setThirdTaskAnswerTimes(indexes, time, get),
        }),
      setSortedThirdTaskCorrect: (idx) =>
        set({
          sortedThirdTaskCorrect: setSortedThirdTaskCorrect(idx, get),
        }),
      setSortedThirdTaskTimes: (idx) =>
        set({
          sortedThirdTaskTimes: setSortedThirdTaskTimes(idx, get),
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

function setSortedAnimals(animal, get) {
  const animalsPol = {
    dog: "pies",
    cat: "kot",
    pig: "swinia",
    cow: "krowa",
    rabbit: "krol",
  }
  const sortedAnimals = get().sortedAnimals
  const animalGroup = animal.includes("filler") ? "filler" : "animal"
  let animalKind
  Object.values(animalsPol).forEach((animal) => {
    if (animal.includes(animal)) {
      animalKind = animal
    }
  })
  if (
    animalGroup === "filler" &&
    !sortedAnimals[animalGroup][animalKind].includes(animal)
  ) {
    sortedAnimals[animalGroup][animalKind].push(animal)
  } else if (
    animalGroup === "animal" &&
    !sortedAnimals[animalKind].includes(animal)
  ) {
    sortedAnimals[animalKind].push(animal)
  }
  return sortedAnimals
}

function setSortedThirdTaskAnswers(idx, get) {
  const sortedAnswers = get().sortedThirdTaskAnswers
  const sortedThirdTaskImages = get().sortedThirdTaskImages
  const thirdTaskAnswers = get().thirdTaskAnswers
  const answer = thirdTaskAnswers[`zdj${idx + 1}_odp1`]
  const thirdTaskImages = get().thirdTaskImages
  const image = thirdTaskImages[`zad3_zdj${idx + 1}`]
  let propName
  Object.values(sortedThirdTaskImages).forEach((img) => {
    if (img == image) {
      const key = Object.keys(sortedThirdTaskImages).find(
        (key) => sortedThirdTaskImages[key] === img
      )
      const keySplit = key.split("_")
      if (key.includes("filler")) {
        propName = keySplit[1] + "_" + keySplit[2]
      } else {
        propName = keySplit[1]
      }
    }
  })

  return {
    ...sortedAnswers,
    [`zad3_odp_${propName}`]: answer,
  }
}

function setSortedThirdTaskTimes(idx, get) {
  const sortedTimes = get().sortedThirdTaskTimes
  const sortedThirdTaskImages = get().sortedThirdTaskImages
  const thirdTaskTimes = get().thirdTaskAnswerTimes
  const time = thirdTaskTimes[`zdj${idx + 1}_czas1`]
  const thirdTaskImages = get().thirdTaskImages
  const image = thirdTaskImages[`zad3_zdj${idx + 1}`]
  let propName
  Object.values(sortedThirdTaskImages).forEach((img) => {
    if (img == image) {
      const key = Object.keys(sortedThirdTaskImages).find(
        (key) => sortedThirdTaskImages[key] === img
      )
      const keySplit = key.split("_")
      if (key.includes("filler")) {
        propName = keySplit[1] + "_" + keySplit[2]
      } else {
        propName = keySplit[1]
      }
    }
  })

  return {
    ...sortedTimes,
    [`zad3_czas_${propName}`]: time,
  }
}

function setSortedThirdTaskCorrect(idx, get) {
  const sortedCorrect = get().sortedThirdTaskCorrect
  const sortedThirdTaskImages = get().sortedThirdTaskImages
  const thirdTaskCorrect = get().thirdTaskCorrect
  const correct = thirdTaskCorrect[`zdj${idx + 1}_pop1`]
  const thirdTaskImages = get().thirdTaskImages
  const image = thirdTaskImages[`zad3_zdj${idx + 1}`]
  let propName
  Object.values(sortedThirdTaskImages).forEach((img) => {
    if (img == image) {
      const key = Object.keys(sortedThirdTaskImages).find(
        (key) => sortedThirdTaskImages[key] === img
      )
      const keySplit = key.split("_")
      if (key.includes("filler")) {
        propName = keySplit[1] + "_" + keySplit[2]
      } else {
        propName = keySplit[1]
      }
    }
  })
  console.log(`zad3_pop_${propName}`, correct)
  return {
    ...sortedCorrect,
    [`zad3_pop_${propName}`]: correct,
  }
}
