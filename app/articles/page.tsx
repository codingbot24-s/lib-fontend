'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ArticlesComingSoon() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 dark:bg-black text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 dark:text-white mb-4">Articles Coming Soon!</h1>
      <p className="text-lg text-emerald-800 dark:text-gray-300 max-w-xl mb-6">
        We're preparing a collection of insightful articles. You will be redirected to the homepage shortly.
      </p>
      <span className="inline-block bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200 px-4 py-2 rounded-full font-medium text-sm animate-pulse">
        Redirecting...
      </span>
    </div>
  );
} 