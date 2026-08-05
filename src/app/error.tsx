'use client';

import { useEffect } from 'react';
import Button from '@/components/shared/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-light/20">
      <div className="text-center p-8">
        <h2 className="font-rubik text-3xl font-bold text-primary mb-4">
          Algo salió mal
        </h2>
        <p className="font-inter text-text-secondary mb-6">
          Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
        </p>
        <Button onClick={reset} variant="primary">
          Reintentar
        </Button>
      </div>
    </div>
  );
}