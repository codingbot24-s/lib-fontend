import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <CardContent className="space-y-5 px-8 pb-8">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-islamic-green text-sm font-medium">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-green/60" />
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="pl-10 bg-white/60 border border-islamic-green/30 text-islamic-green placeholder:text-muted-green/50 focus:border-islamic-gold focus:ring-islamic-gold/20 h-12 rounded-lg"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-islamic-green text-sm font-medium">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-green/60" />
          <Input
            id="signup-email"
            type="email"
            placeholder="your.email@example.com"
            className="pl-10 bg-white/60 border border-islamic-green/30 text-islamic-green placeholder:text-muted-green/50 focus:border-islamic-gold focus:ring-islamic-gold/20 h-12 rounded-lg"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-islamic-green text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-green/60" />
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className="pl-10 pr-12 bg-white/60 border border-islamic-green/30 text-islamic-green placeholder:text-muted-green/50 focus:border-islamic-gold focus:ring-islamic-gold/20 h-12 rounded-lg"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-12 px-3 text-muted-green/60 hover:text-islamic-green hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-islamic-green text-sm font-medium">
          Confirm Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-green/60" />
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="pl-10 pr-12 bg-white/60 border border-islamic-green/30 text-islamic-green placeholder:text-muted-green/50 focus:border-islamic-gold focus:ring-islamic-gold/20 h-12 rounded-lg"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-12 px-3 text-muted-green/60 hover:text-islamic-green hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <Button className="w-full bg-muted-green hover:bg-islamic-green text-white font-medium h-12 rounded-lg transition-colors">
        Sign Up
      </Button>
      <div className="text-center pt-4">
        <button
          className="text-sm text-muted-green hover:text-green-600 transition-colors"
          onClick={onSwitchToSignIn}
        >
          Already have an account? <span className="text-islamic-green font-medium">Sign In</span>
        </button>
      </div>
    </CardContent>
  );
};

export default SignUpForm; 