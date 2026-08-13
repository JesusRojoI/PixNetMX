import SolutionsHero from '@/components/soluciones/SolutionsHero';
import ServicesPackages from '@/components/soluciones/ServicesPackages';
import PackagesGrid from '@/components/soluciones/PackagesGrid';
import CustomProductSection from '@/components/soluciones/CustomProductSection';

export default function SolucionesPage() {
  return (
    <>
      <SolutionsHero />
      <ServicesPackages />
      <PackagesGrid />
      <CustomProductSection />
    </>
  );
}