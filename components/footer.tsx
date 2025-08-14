import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Mail, Phone, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-emerald-900 dark:bg-black text-emerald-100 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-gold dark:text-gray-400 mr-2" />
              <div>
                <h3 className="text-lg font-bold text-white font-display">Bayt al-Kutub</h3>
                <span className="text-xs text-gold dark:text-gray-500 font-arabic">بيت الكتب</span>
              </div>
            </div>
            <p className="text-sm mb-4 text-emerald-200 dark:text-gray-300">
              Bayt al-Kutub is a comprehensive Islamic library dedicated to preserving and sharing Islamic knowledge
              through books, audio, and digital content.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="text-emerald-200 dark:text-gray-400 hover:text-gold dark:hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-emerald-200 dark:text-gray-400 hover:text-gold dark:hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-emerald-200 dark:text-gray-400 hover:text-gold dark:hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-1.41 7.08c.84-.58 1.87-.92 2.98-.92 1.04 0 1.99.29 2.81.77.36.21.65.46.92.73.27.27.47.55.61.88.14.33.22.67.22 1.02 0 .35-.08.69-.24 1.02-.16.33-.39.63-.69.89-.3.26-.66.47-1.08.63-.42.16-.88.23-1.39.23-.38 0-.74-.05-1.07-.14-.33-.09-.63-.22-.89-.38-.26-.16-.48-.36-.65-.58-.17-.23-.3-.48-.38-.75-.08-.27-.13-.54-.14-.82h1.79c.02.17.08.32.17.46.09.14.2.25.34.34.14.09.29.16.46.21.17.05.35.08.53.08.21 0 .41-.03.6-.08.19-.05.35-.13.48-.24.13-.11.24-.24.32-.39.08-.15.12-.33.12-.53 0-.23-.05-.43-.15-.61-.1-.18-.24-.33-.41-.45-.17-.12-.37-.21-.61-.28-.24-.07-.49-.1-.76-.1-.27 0-.53.03-.78.08-.25.05-.48.12-.69.21v-1.61h3.76V8.81h-5.42v3.35c.34-.17.71-.3 1.11-.39.4-.09.82-.13 1.26-.13.47 0 .91.06 1.33.17.42.11.79.28 1.11.51.32.23.57.52.76.87.19.35.28.77.28 1.25 0 .48-.09.91-.27 1.29-.18.38-.43.71-.76.98-.33.27-.73.48-1.2.62-.47.14-.99.21-1.57.21-.42 0-.83-.05-1.23-.14-.4-.09-.76-.24-1.08-.44-.32-.2-.58-.45-.78-.75-.2-.3-.33-.67-.39-1.11h1.79c.05.23.14.43.28.59.14.16.31.29.51.38.2.09.42.16.67.2.25.04.51.06.77.06.26 0 .49-.03.71-.08.22-.05.41-.13.57-.24.16-.11.28-.26.37-.44.09-.18.13-.4.13-.67 0-.2-.04-.38-.12-.53-.08-.15-.2-.28-.36-.38-.16-.1-.35-.18-.58-.23-.23-.05-.49-.08-.77-.08-.29 0-.56.03-.82.08-.26.05-.49.12-.69.21v.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-emerald-200 dark:text-gray-400 hover:text-gold dark:hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm5.46 7.12l-1.97 9.03c-.14.66-.5.84-1.02.52l-2.83-2.09-1.37 1.32c-.15.15-.29.28-.52.28-.34 0-.28-.13-.4-.45l-.89-2.92-2.58-1.17c-.57-.25-.58-.57.12-.84l10.07-3.88c.46-.23.89.11.89.59z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 font-display">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-emerald-200 dark:text-gray-300 hover:text-gold dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-emerald-200 dark:text-gray-300 hover:text-gold dark:hover:text-white transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/darse-nizami" className="text-emerald-200 dark:text-gray-300 hover:text-gold dark:hover:text-white transition-colors">
                  Darse Nizami
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-emerald-200 dark:text-gray-300 hover:text-gold dark:hover:text-white transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-emerald-200 dark:text-gray-300 hover:text-gold dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 font-display">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold dark:text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-emerald-200 dark:text-gray-300">123 Islamic Center St, Knowledge City, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold dark:text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-emerald-200 dark:text-gray-300"></span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold dark:text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-emerald-200 dark:text-gray-300">primecoder8@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-gold dark:text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-emerald-200 dark:text-gray-300">
                  Monday - Friday: 9am - 5pm
                  <br />
                  Saturday: 10am - 2pm
                  <br />
                  Sunday: Closed
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div>
            {/* <h3 className="text-lg font-bold text-white mb-4 font-display">Newsletter</h3>
            <p className="text-sm mb-4 text-emerald-200 dark:text-gray-300">
              Subscribe to our newsletter to receive updates on new books and events.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-emerald-800/50 dark:bg-gray-800 border-emerald-700 dark:border-gray-600 text-white dark:text-white placeholder:text-emerald-300/70 dark:placeholder:text-gray-400"
              />
              <Button className="w-full bg-gold hover:bg-gold/90 dark:bg-white dark:hover:bg-gray-100 text-emerald-900 dark:text-black">Subscribe</Button>
            </div> */}
          {/* </div> */} 
        </div>

        {/* Inspirational Quote */}
        <div className="mt-12 text-center">
          <blockquote className="italic text-emerald-200 dark:text-gray-300 max-w-2xl mx-auto">
            <p className="text-lg font-arabic mb-2">طلب العلم فريضة على كل مسلم</p>
            <p>"Seeking knowledge is an obligation upon every Muslim."</p>
            <cite className="text-sm text-gold dark:text-gray-400 block mt-2">— Prophet Muhammad ﷺ</cite>
          </blockquote>
        </div>

        <Separator className="my-8 bg-emerald-800 dark:bg-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-emerald-200 dark:text-gray-300">© 2025 Bayt al-Kutub. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-emerald-200 dark:text-gray-300 hover:text-gold dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-emerald-200 dark:text-gray-300 hover:text-gold dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-emerald-200 dark:text-gray-300 hover:text-gold dark:hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
