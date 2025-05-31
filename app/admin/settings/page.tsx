import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Settings | Admin Dashboard",
  description: "Settings for the Islamic Digital Library",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-emerald-900">Settings</h1>
        <p className="text-muted-foreground">Manage your Islamic Digital Library settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage general settings for your Islamic Digital Library</CardDescription>
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
                  <div className="text-sm text-muted-foreground">Allow users to register without approval</div>
                </div>
                <Switch id="public-registration" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the appearance of your Islamic Digital Library</CardDescription>
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
                <Select defaultValue="emerald">
                  <SelectTrigger id="primary-color">
                    <SelectValue placeholder="Select primary color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emerald">Emerald</SelectItem>
                    <SelectItem value="teal">Teal</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="font">Font</Label>
                <Select defaultValue="noto-serif">
                  <SelectTrigger id="font">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="noto-serif">Noto Serif</SelectItem>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="open-sans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="rtl-support">RTL Support</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable right-to-left text direction for Arabic content
                  </div>
                </div>
                <Switch id="rtl-support" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure notification settings for your Islamic Digital Library</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <div className="text-sm text-muted-foreground">Send email notifications for important events</div>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-book-notifications">New Book Notifications</Label>
                  <div className="text-sm text-muted-foreground">Notify users when new books are added</div>
                </div>
                <Switch id="new-book-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="user-registration-notifications">User Registration Notifications</Label>
                  <div className="text-sm text-muted-foreground">Notify admins when new users register</div>
                </div>
                <Switch id="user-registration-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-notifications">System Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications about system updates and maintenance
                  </div>
                </div>
                <Switch id="system-notifications" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security settings for your Islamic Digital Library</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                  <div className="text-sm text-muted-foreground">
                    Require two-factor authentication for admin accounts
                  </div>
                </div>
                <Switch id="two-factor-auth" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="content-approval">Content Approval</Label>
                  <div className="text-sm text-muted-foreground">Require admin approval for new content</div>
                </div>
                <Switch id="content-approval" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ip-logging">IP Logging</Label>
                  <div className="text-sm text-muted-foreground">Log IP addresses for security monitoring</div>
                </div>
                <Switch id="ip-logging" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
