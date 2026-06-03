import { getContact } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function ContactPage() {
  const contact = getContact();
  return (
    <main className="max-w-[640px] mx-auto">
      <PageHeader
        label={contact.header.label}
        subtitle={contact.header.subtitle}
      />
    </main>
  );
}
