const books = [
  {
    id: 1,
    title: "The Sealed Nectar",
    author: "Safiur-Rahman Al-Mubarakpuri",
    arabicTitle: "الرحيق المختوم",
    coverUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 2,
    title: "Riyadh as-Saliheen",
    author: "Imam An-Nawawi",
    arabicTitle: "رياض الصالحين",
    coverUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 3,
    title: "The Quran: English Translation",
    author: "Abdullah Yusuf Ali",
    arabicTitle: "القرآن الكريم",
    coverUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 4,
    title: "Ihya Ulum al-Din",
    author: "Imam Al-Ghazali",
    arabicTitle: "إحياء علوم الدين",
    coverUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 5,
    title: "Purification of the Heart",
    author: "Hamza Yusuf",
    coverUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 6,
    title: "The Divine Reality",
    author: "Hamza Andreas Tzortzis",
    coverUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 7,
    title: "Muhammad: His Life Based on the Earliest Sources",
    author: "Martin Lings",
    coverUrl: "/placeholder.svg?height=300&width=200",
  },
]

const scholars = [
  {
    id: 1,
    name: "Imam Al-Ghazali",
    arabicName: "أبو حامد الغزالي",
    era: "1058-1111 CE",
    specialty: "Philosophy, Sufism, Theology",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Ibn Taymiyyah",
    arabicName: "ابن تيمية",
    era: "1263-1328 CE",
    specialty: "Fiqh, Hadith, Tafsir",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Imam Malik",
    arabicName: "مالك بن أنس",
    era: "711-795 CE",
    specialty: "Hadith, Fiqh",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Ibn Kathir",
    arabicName: "ابن كثير",
    era: "1300-1373 CE",
    specialty: "Tafsir, History",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Imam Bukhari",
    arabicName: "محمد بن إسماعيل البخاري",
    era: "810-870 CE",
    specialty: "Hadith",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
]

const topics = [
  {
    id: 1,
    name: "Tawheed",
    description: "The oneness of Allah in all of its aspects",
    count: 124,
  },
  {
    id: 2,
    name: "Fiqh",
    description: "Islamic jurisprudence and legal rulings",
    count: 215,
  },
  {
    id: 3,
    name: "Hadith",
    description: "Sayings and actions of Prophet Muhammad ﷺ",
    count: 310,
  },
  {
    id: 4,
    name: "Tafsir",
    description: "Interpretation and explanation of the Quran",
    count: 178,
  },
  {
    id: 5,
    name: "Seerah",
    description: "Biography of Prophet Muhammad ﷺ",
    count: 95,
  },
  {
    id: 6,
    name: "Tasawwuf",
    description: "Islamic spirituality and mysticism",
    count: 87,
  },
]

// Function to filter items based on search query
function filterItems(items: any[], query: string, fields: string[]) {
  const lowerQuery = query.toLowerCase()
  return items.filter((item) => {
    return fields.some((field) => {
      const value = item[field]
      return value && value.toLowerCase().includes(lowerQuery)
    })
  })
}

// Main search function
export async function searchLibrary(query: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Filter books, scholars, and topics based on the query
  const filteredBooks = filterItems(books, query, ["title", "author", "arabicTitle"])
  const filteredScholars = filterItems(scholars, query, ["name", "arabicName", "specialty"])
  const filteredTopics = filterItems(topics, query, ["name", "description"])

  // Return the filtered results
  return {
    books: filteredBooks.slice(0, 5), // Limit to 5 results per category
    scholars: filteredScholars.slice(0, 3),
    topics: filteredTopics.slice(0, 3),
  }
}
