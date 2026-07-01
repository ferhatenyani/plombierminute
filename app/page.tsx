import {
  getSite, getContact, getServices, getAvantages, getZone,
} from '@/lib/content';
import { Hero } from '@/components/Hero';
import { ServicesSection } from '@/components/ServicesSection';
import { AvantagesSection } from '@/components/AvantagesSection';
import { ZoneSection } from '@/components/ZoneSection';
import { ContactSection } from '@/components/ContactSection';

// Single page. All sections live here, anchored by ID for in-page nav.
export default function HomePage() {
  const site = getSite();
  const contact = getContact();
  const services = getServices();
  const avantages = getAvantages();
  const zone = getZone();

  return (
    <>
      <Hero site={site} contact={contact} />
      <ServicesSection services={services} />
      <AvantagesSection avantages={avantages} site={site} />
      <ZoneSection zone={zone} contact={contact} />
      <ContactSection contact={contact} site={site} />
    </>
  );
}
