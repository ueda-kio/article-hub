'use client';

// import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

// const Provider = ({ children, session }: { children: React.ReactNode; session: Session }) => (
//   <SessionProvider session={session}>{children}</SessionProvider>
// );
const Provider = ({ children }: { children: React.ReactNode }) => <SessionProvider>{children}</SessionProvider>;

export default Provider;
