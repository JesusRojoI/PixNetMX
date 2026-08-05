import Link from 'next/link';
import Button from '@/components/shared/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-light/20">
      <div className="text-center p-8">
        <h1 className="font-rubik text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-rubik text-2xl font-semibold text-text-primary mb-4">
          Página no encontrada
        </h2>
        <p className="font-inter text-text-secondary mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Button href="/" variant="primary">
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}