// auth.ts
'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); // Redirect unauthenticated users to the login page
    }
  }, [router]);
};