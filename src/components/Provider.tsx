'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

const Provider = ({ children }: { children: React.ReactNode }) => <SessionProvider>{children}</SessionProvider>;

export default Provider;
