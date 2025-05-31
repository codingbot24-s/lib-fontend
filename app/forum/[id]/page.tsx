import Header from "@/components/header"
import ThreadView from "@/components/forum/thread-view"
import ReplyList from "@/components/forum/reply-list"
import ReplyForm from "@/components/forum/reply-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, BellOff } from "lucide-react"
import Link from "next/link"

export default function ThreadPage({ params }: { params: { id: string } }) {
  // This would normally be fetched from a database based on the ID
  const thread = {
    id: Number.parseInt(params.id),
    title: "Understanding the concept of Tawheed in modern context",
    content: `
      <p>Assalamu alaikum wa rahmatullahi wa barakatuh,</p>
      
      <p>I've been studying the concept of Tawheed (Islamic monotheism) and would like to understand how it applies in our modern world. Specifically, I'm interested in how the three categories of Tawheed (Rububiyyah, Uluhiyyah, and Asma wa Sifat) manifest in contemporary society.</p>
      
      <p>For example, how do we maintain Tawheed al-Uluhiyyah (oneness in worship) in a world full of distractions and material pursuits? How do we recognize subtle forms of shirk that might not be obvious?</p>
      
      <p>I would appreciate insights from those knowledgeable in aqeedah, particularly with references from the Quran and authentic Sunnah.</p>
      
      <p>JazakAllah khair.</p>
    `,
    author: {
      id: 1,
      name: "Ahmad Ibrahim",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Regular",
      joinDate: "January 2023",
      posts: 47,
      reputation: 156,
    },
    category: "Aqeedah",
    tags: ["Tawheed", "Beginner", "Modern"],
    createdAt: "May 15, 2025, 14:32",
    replies: 12,
    views: 145,
    isSubscribed: true,
  }

  // Sample replies
  const replies = [
    {
      id: 1,
      content: `
        <p>Wa alaikum assalam wa rahmatullahi wa barakatuh,</p>
        
        <p>This is an excellent question. The concept of Tawheed is timeless, but its application requires understanding of our current context.</p>
        
        <p>Regarding Tawheed al-Uluhiyyah in modern times, we face challenges like materialism, celebrity worship, and excessive attachment to social media validation. These can become forms of "worship" when we prioritize them over Allah's commands.</p>
        
        <p>The Prophet ﷺ said: "Wretched is the slave of the dinar and the dirham" (Bukhari), which reminds us about attachment to wealth. Today, this extends to many forms of status symbols.</p>
        
        <p>I recommend reading "Kitab at-Tawheed" by Sheikh Muhammad ibn Abdul-Wahhab for a comprehensive understanding of these concepts.</p>
      `,
      author: {
        id: 2,
        name: "Ustadh Bilal Ahmad",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Scholar",
        joinDate: "March 2020",
        posts: 1243,
        reputation: 4892,
      },
      createdAt: "May 15, 2025, 15:10",
      likes: 24,
      isLiked: true,
    },
    {
      id: 2,
      content: `
        <p>I'd like to add to what Ustadh Bilal mentioned.</p>
        
        <p>For Tawheed ar-Rububiyyah (Lordship), modern challenges include relying too much on "systems" rather than Allah. For example, we might put complete trust in economic systems, medical systems, or political systems, forgetting that Allah is the ultimate controller of all affairs.</p>
        
        <p>For Tawheed al-Asma wa Sifat (Names and Attributes), we face challenges from philosophies that attempt to redefine concepts like justice, mercy, or wisdom in ways that contradict what Allah has revealed about Himself.</p>
        
        <p>The Quran reminds us: "There is nothing like unto Him" (42:11), which establishes the uniqueness of Allah in all aspects.</p>
      `,
      author: {
        id: 3,
        name: "Sarah Abdullah",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Regular",
        joinDate: "August 2022",
        posts: 187,
        reputation: 543,
      },
      createdAt: "May 15, 2025, 16:45",
      likes: 18,
      isLiked: false,
    },
    {
      id: 3,
      content: `
        <p>JazakAllah khair for the insightful responses.</p>
        
        <p>I've been thinking about how social media affects our Tawheed. When we constantly seek validation through likes and shares, aren't we giving others a type of authority that should belong only to Allah?</p>
        
        <p>Also, I've noticed how algorithms decide what we see and believe. This seems like a modern challenge to Tawheed that our predecessors didn't face.</p>
      `,
      author: {
        id: 1,
        name: "Ahmad Ibrahim",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Regular",
        joinDate: "January 2023",
        posts: 47,
        reputation: 156,
      },
      createdAt: "May 16, 2025, 09:22",
      likes: 7,
      isLiked: false,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/forum">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Discussions
              </Link>
            </Button>
          </div>

          <Button variant="outline" size="sm" className="flex items-center gap-1">
            {thread.isSubscribed ? (
              <>
                <BellOff className="h-4 w-4" />
                <span>Unsubscribe</span>
              </>
            ) : (
              <>
                <Bell className="h-4 w-4" />
                <span>Subscribe</span>
              </>
            )}
          </Button>
        </div>

        <ThreadView thread={thread} />

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
            Replies ({replies.length})
          </h3>

          <ReplyList replies={replies} />

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">Post a Reply</h3>

            <ReplyForm />
          </div>
        </div>
      </main>
    </div>
  )
}
