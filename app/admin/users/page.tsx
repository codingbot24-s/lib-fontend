import type { Metadata } from "next"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const metadata: Metadata = {
  title: "Users Management | Admin Dashboard",
  description: "Manage users in the Islamic Digital Library",
}

// Mock data for users
const users = [
  {
    id: 1,
    username: "ahmed_hassan",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    role: "Admin",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AH",
  },
  {
    id: 2,
    username: "fatima_ali",
    name: "Fatima Ali",
    email: "fatima.ali@example.com",
    role: "User",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "FA",
  },
  {
    id: 3,
    username: "omar_farooq",
    name: "Omar Farooq",
    email: "omar.farooq@example.com",
    role: "User",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "OF",
  },
  {
    id: 4,
    username: "aisha_rahman",
    name: "Aisha Rahman",
    email: "aisha.rahman@example.com",
    role: "Moderator",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AR",
  },
  {
    id: 5,
    username: "bilal_mahmood",
    name: "Bilal Mahmood",
    email: "bilal.mahmood@example.com",
    role: "User",
    status: "Banned",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "BM",
  },
  {
    id: 6,
    username: "zaynab_malik",
    name: "Zaynab Malik",
    email: "zaynab.malik@example.com",
    role: "User",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ZM",
  },
  {
    id: 7,
    username: "yusuf_khan",
    name: "Yusuf Khan",
    email: "yusuf.khan@example.com",
    role: "User",
    status: "Inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "YK",
  },
]

export default function UsersManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-white">Users Management</h1>
          <p className="text-muted-foreground">Manage all users in the Islamic Digital Library</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Users</CardTitle>
            <div className="flex items-center gap-2">
              <Input placeholder="Search users..." className="w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-emerald-100 dark:bg-gray-900 text-emerald-800 dark:text-white text-xs">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    {user.name}
                    <div className="text-xs text-muted-foreground">@{user.username}</div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.role === "Admin"
                          ? "border-emerald-600 text-emerald-600"
                          : user.role === "Moderator"
                            ? "border-blue-600 text-blue-600"
                            : "border-slate-600 text-slate-600"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "Active" ? "default" : "outline"}
                      className={
                        user.status === "Active"
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : user.status === "Banned"
                            ? "border-red-600 text-red-600"
                            : "border-amber-600 text-amber-600"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "Active" ? (
                          <DropdownMenuItem className="text-amber-600">Deactivate User</DropdownMenuItem>
                        ) : user.status === "Banned" ? (
                          <DropdownMenuItem className="text-emerald-600">Unban User</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-emerald-600">Activate User</DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
