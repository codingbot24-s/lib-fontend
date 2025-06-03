import type { Metadata } from "next"
import { TopicsManagement } from "@/components/admin/topics-managment" 

export const metadata: Metadata = {
  title: "Manage Topics | Bayt al-Kutub Admin",
  description: "Manage topics for the Islamic Digital Library",
}

export default function TopicsPage() {
  return <TopicsManagement />
}
