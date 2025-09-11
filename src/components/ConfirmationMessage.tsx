'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function ConfirmationMessage() {
  const searchParams = useSearchParams();
  const showMessage = searchParams.get('message') === 'confirmed';

  if (!showMessage) {
    return null;
  }

  return (
    <div className="w-full max-w-md p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg shadow" role="alert">
      Email confirmed! Please log in to continue.
    </div>
  );
}