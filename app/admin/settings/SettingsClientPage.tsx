"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Palette, Bell, Shield, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function SettingsClientPage() {




  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    newUserRegistration: true,
    newBookUploads: true,
    systemUpdates: true,
    weeklyReports: false,
    userFeedback: true,
  })

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    requireEmailVerification: true,
    twoFactorAuth: false,
    passwordMinLength: "8",
    passwordRequireSpecialChar: true,
    passwordRequireNumber: true,
    sessionTimeout: "60",
  })





  // Handle toggle change
  const handleToggleChange = (setting: string, section: string) => {
    if (section === 'appearance') {
      setAppearanceSettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
    } else if (section === 'notification') {
      setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
    } else if (section === 'security') {
      setSecuritySettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
    }
  }

  // Handle security settings change
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSecuritySettings((prev) => ({ ...prev, [name]: value }))
  }

  // Save settings
  const saveSettings = (section: string) => {
    // In a real app, this would save to the backend
    console.log(`Saving ${section} settings`)
    // Show success message
    alert(
      `${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-emerald-900">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your Islamic Digital Library settings
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage general settings for your Islamic Digital Library
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="library-name">Library Name</Label>
                <Input id="library-name" defaultValue="Bayt al-Kutub Islamic Library" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="library-description">Library Description</Label>
                <Textarea
                  id="library-description"
                  defaultValue="A comprehensive digital library of Islamic books, articles, and resources."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="contact@baytkutub.org" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                    <SelectItem value="ur">Urdu</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="id">Indonesian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public-registration">Public Registration</Label>
                  <div className="text-sm text-muted-foreground">
                    Allow users to register without approval
                  </div>
                </div>
                <Switch id="public-registration" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the appearance of your Islamic Digital Library
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="light">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Input id="primary-color" type="color" defaultValue="#059669" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <Input id="secondary-color" type="color" defaultValue="#d4af37" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable dark mode for the library
                  </div>
                </div>
                <Switch id="dark-mode" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable Email Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Send email notifications for important events
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.enableEmailNotifications}
                    onCheckedChange={() =>
                      handleToggleChange('enableEmailNotifications', 'notification')
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New User Registration</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Notify administrators when new users register
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newUserRegistration}
                    onCheckedChange={() =>
                      handleToggleChange('newUserRegistration', 'notification')
                    }
                    disabled={!notificationSettings.enableEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Book Uploads</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Notify administrators when new books are uploaded
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newBookUploads}
                    onCheckedChange={() =>
                      handleToggleChange('newBookUploads', 'notification')
                    }
                    disabled={!notificationSettings.enableEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">System Updates</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Notify administrators about system updates and maintenance
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={() =>
                      handleToggleChange('systemUpdates', 'notification')
                    }
                    disabled={!notificationSettings.enableEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Reports</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Send weekly summary reports to administrators
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={() =>
                      handleToggleChange('weeklyReports', 'notification')
                    }
                    disabled={!notificationSettings.enableEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">User Feedback</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Notify administrators when users submit feedback
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.userFeedback}
                    onCheckedChange={() =>
                      handleToggleChange('userFeedback', 'notification')
                    }
                    disabled={!notificationSettings.enableEmailNotifications}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-emerald-700 hover:bg-emerald-800 text-white"
                  onClick={() => saveSettings('notification')}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Verification</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Require email verification for new accounts
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.requireEmailVerification}
                    onCheckedChange={() =>
                      handleToggleChange('requireEmailVerification', 'security')
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable two-factor authentication for admin accounts
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={() =>
                      handleToggleChange('twoFactorAuth', 'security')
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-min-length">Minimum Password Length</Label>
                  <Input
                    id="password-min-length"
                    type="number"
                    name="passwordMinLength"
                    value={securitySettings.passwordMinLength}
                    onChange={handleSecurityChange}
                    min="8"
                    max="32"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Special Characters Required</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Require special characters in passwords
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.passwordRequireSpecialChar}
                    onCheckedChange={() =>
                      handleToggleChange('passwordRequireSpecialChar', 'security')
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Numbers Required</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Require numbers in passwords
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.passwordRequireNumber}
                    onCheckedChange={() =>
                      handleToggleChange('passwordRequireNumber', 'security')
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    name="sessionTimeout"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                    min="15"
                    max="1440"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-emerald-700 hover:bg-emerald-800 text-white"
                  onClick={() => saveSettings('security')}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
