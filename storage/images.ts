import { listAll, ref } from "firebase/storage"

export const getImageNames = async (storage) => {
  const animals = []
  const categoriesRef = ref(storage, "")
  const categoriesItems = await listAll(categoriesRef)
  const categories = categoriesItems.prefixes
    .map((category) => category.name)
    .filter((category) => category !== "fillers1" && category !== "fillers2")
  await Promise.all(
    categories.map(async (category) => {
      const categoryRef = ref(storage, category)
      const imageNameItems = await listAll(categoryRef)
      const imageNames = imageNameItems.items.map(
        (item) => category + "/" + item.name
      )
      animals.push(imageNames)
    })
  )
  console.log(animals)
  const firstFillersRef = ref(storage, "fillers1")
  const firstFillersItems = await listAll(firstFillersRef)
  const firstFillers = firstFillersItems.items.map(
    (item) => "fillers1/" + item.name
  )
  const secondFillersRef = ref(storage, "fillers2")
  const secondFillersItems = await listAll(secondFillersRef)
  const secondFillers = secondFillersItems.items.map(
    (item) => "fillers2/" + item.name
  )
  const animalsSliced = animals.map((animalArr) =>
    animalArr.map((image) => image.split(".")[0].slice(0, -1))
  )

  const animalsSets = animalsSliced.map((animalArr) =>
    animalArr.filter((v, i, a) => a.indexOf(v) === i)
  )

  const animalsPaired = animalsSets.map((animalArr) =>
    animalArr.map((image) => [image + "a.jpg", image + "b.jpg"])
  )

  const images = { animals: animalsPaired, firstFillers, secondFillers }
  return images
}

export const getRandomImages = async (storage) => {
  const { animals, firstFillers, secondFillers } = await getImageNames(storage)
  const { firstAnimals, thirdAnimals } = getRandomAnimals(animals)
  const firstTaskImages = [...firstAnimals, ...firstFillers].sort(
    () => Math.random() - 0.5
  )
  const thirdTaskImages = [...thirdAnimals, ...secondFillers].sort(
    () => Math.random() - 0.5
  )

  return {
    firstTaskImages: firstTaskImages,
    thirdTaskImages: thirdTaskImages,
  }
}

type Animal = string
type AnimalPair = [Animal, Animal]

function getRandomAnimals(animals: AnimalPair[][]): [Animal[], AnimalPair[][]] {
  const firstAnimals: Animal[] = []
  const remainingAnimals: AnimalPair[] = []
  console.log("animals", animals)
  animals.forEach((animalArr) => {
    animalArr.forEach((animalPair) => {
      if (Math.random() < 0.5) {
        firstAnimals.push(animalPair[0])
        remainingAnimals.push(animalPair[1])
      } else {
        firstAnimals.push(animalPair[1])
        remainingAnimals.push(animalPair[0])
      }
    })
  })

  return {
    firstAnimals,
    thirdAnimals: remainingAnimals,
  }
}
