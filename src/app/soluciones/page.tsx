import SolutionsHero from '@/components/soluciones/SolutionsHero';
import ServicesPackages from '@/components/soluciones/ServicesPackages';
import PackagesGrid from '@/components/soluciones/PackagesGrid';

export default function SolucionesPage() {
  return (
    <>
      <SolutionsHero />
      <ServicesPackages />
      <PackagesGrid />
    </>
  );
}