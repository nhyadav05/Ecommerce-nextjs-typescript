"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Auth(Component:any) {
  return () => {
    const router = useRouter();

    useEffect(() => {
      // Check if user is authenticated
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        router.push('/'); // Redirect to login page if not logged in
      }
    }, []);

    return <Component />;
  };
}
