import React, { useState } from 'react';
import { useSignIn } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSwitchToSignUp }) => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isLoaded) return <div>Loading...</div>;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    try {
      if (!signIn) throw new Error('Sign in not initialized');
      const result = await signIn.create({ identifier: email, password });
      if (result.status === 'complete') {
        if (!setActive) throw new Error('Set active not initialized');
        await setActive({ session: result.createdSessionId });
        // redirect or show success
      } else {
        // handle 2FA or other steps if needed
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Sign in failed');
    }
  }

  async function handleOAuth(provider: 'google' | 'facebook') {
    try {
      if (!signIn) throw new Error('Sign in not initialized');
      await signIn.authenticateWithRedirect({
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
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-green/60" />
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="block w-full bg-white border border-gray-300 rounded-md h-11 pl-10 pr-3 text-base placeholder-gray-400 focus:outline-none focus:border-primary-500 transition"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-green/60" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="block w-full bg-white border border-gray-300 rounded-md h-11 pl-10 pr-12 text-base placeholder-gray-400 focus:outline-none focus:border-primary-500 transition"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-12 px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
      <div className="flex flex-col gap-2">
        <Button type="button" variant="outline" onClick={() => handleOAuth('google')} className="w-full bg-gray-300/30 border border-gray-400/40 hover:bg-gray-400/40 transition-colors">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
          </svg>
          Sign in with Google
        </Button>
        <Button type="button" variant="outline" onClick={() => handleOAuth('facebook')} className="w-full bg-gray-300/30 border border-gray-400/40 hover:bg-gray-400/40 transition-colors">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Sign in with Facebook
        </Button>
      </div>
      <div className="text-center pt-4">
        <button className="text-sm text-muted-green hover:text-green-600 transition-colors" onClick={onSwitchToSignUp}>
          Don't have an account? <span className="text-islamic-green font-medium">Sign Up</span>
        </button>
      </div>
    </CardContent>
  );
};

export default SignInForm; 