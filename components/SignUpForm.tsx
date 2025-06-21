import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/router"

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToSignIn }) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isLoaded) return <div>Loading...</div>;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!signUp) throw new Error('Sign up not initialized');
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName: fullName,
      });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        // redirect or show success
      } else {
        // handle verification if needed
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: 'google') {
    try {
      if (!signUp) throw new Error('Sign up not initialized');
      await signUp.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: window.location.origin,
        redirectUrlComplete: window.location.origin
      });
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'OAuth failed');
    }
  }

  return (
    <CardContent className="space-y-6 px-8 pb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-green/60 dark:text-gray-400" />
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="block w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md h-11 pl-10 pr-3 text-base placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 dark:focus:border-white transition text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-green/60 dark:text-gray-400" />
            <Input
              id="signup-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="block w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md h-11 pl-10 pr-3 text-base placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 dark:focus:border-white transition text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-green/60 dark:text-gray-400" />
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="block w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md h-11 pl-10 pr-3 text-base placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 dark:focus:border-white transition text-gray-900 dark:text-white"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-12 px-3 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Clerk CAPTCHA Element */}
        <div id="clerk-captcha"></div>
        
        {error && <div className="text-red-500 dark:text-red-400 text-sm">{error}</div>}
        <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </form>
      <div className="flex flex-col gap-2">
        <Button type="button" variant="outline" onClick={() => handleOAuth('google')} className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
          </svg>
          Sign up with Google
        </Button>
      </div>
      <div className="text-center pt-4">
        <button className="text-sm text-muted-green dark:text-gray-400 hover:text-green-600 dark:hover:text-white transition-colors" onClick={onSwitchToSignIn}>
          Already have an account? <span className="text-islamic-green dark:text-white font-medium">Sign In</span>
        </button>
      </div>
    </CardContent>
  );
};

export default SignUpForm; 