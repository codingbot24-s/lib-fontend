"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, Bell, Shield, LogOut } from "lucide-react"

interface ProfileSectionProps {
  user: {
    name: string
    email: string
    joinDate: string
    avatar: string
    readingStats: {
      booksRead: number
      pagesRead: number
      hoursRead: number
      currentlyReading: number
    }
  }
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    bio: "Passionate about Islamic literature and history. Currently studying the works of classical scholars and contemporary thinkers.",
    location: "Toronto, Canada",
    website: "https://example.com",
    interests: "Tafsir, Hadith, Islamic History, Comparative Religion",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    readingReminders: true,
    newContentAlerts: true,
    weeklyDigest: false,
    scholarUpdates: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: true,
    showReadingActivity: true,
    shareNotes: false,
    allowRecommendations: true,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handlePrivacyToggle = (setting: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handleSaveProfile = () => {
    // In a real app, this would save to the backend
    console.log("Saving profile:", profileData)
    // Show success message
    alert("Profile updated successfully!")
  }

  return (
    <div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400"
          >
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400"
          >
            <Shield className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      className="min-h-[100px] border-gray-300 dark:border-gray-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={profileData.website}
                        onChange={handleProfileChange}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests</Label>
                    <Input
                      id="interests"
                      name="interests"
                      value={profileData.interests}
                      onChange={handleProfileChange}
                      className="border-gray-300 dark:border-gray-700"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Separate interests with commas (e.g., Tafsir, Hadith, Islamic History)
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={handleSaveProfile}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                    Profile Picture
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4 border-2 border-emerald-200 dark:border-emerald-800">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-800 text-2xl">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button className="bg-emerald-700 hover:bg-emerald-800 text-white mb-2">Upload New Picture</Button>
                  <Button variant="outline" className="text-gray-500 dark:text-gray-400">
                    Remove
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                    Account Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start text-amber-600 dark:text-amber-400">
                    <Settings className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 dark:text-red-400">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive email notifications about your account and activity
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Reading Reminders</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get reminders to continue your reading progress
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.readingReminders}
                    onCheckedChange={() => handleNotificationToggle("readingReminders")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Content Alerts</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Be notified when new books or content is added to the library
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newContentAlerts}
                    onCheckedChange={() => handleNotificationToggle("newContentAlerts")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Digest</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive a weekly summary of new content and community activity
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyDigest}
                    onCheckedChange={() => handleNotificationToggle("weeklyDigest")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Scholar Updates</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get notified about new content from scholars you follow
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.scholarUpdates}
                    onCheckedChange={() => handleNotificationToggle("scholarUpdates")}
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Public Profile</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow other users to view your profile and reading statistics
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.publicProfile}
                    onCheckedChange={() => handlePrivacyToggle("publicProfile")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Show Reading Activity</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Display your reading progress and activity to other users
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.showReadingActivity}
                    onCheckedChange={() => handlePrivacyToggle("showReadingActivity")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Share Notes</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Make your reading notes visible to other users
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.shareNotes}
                    onCheckedChange={() => handlePrivacyToggle("shareNotes")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Allow Recommendations</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive personalized book and content recommendations based on your reading history
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.allowRecommendations}
                    onCheckedChange={() => handlePrivacyToggle("allowRecommendations")}
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">Save Privacy Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
