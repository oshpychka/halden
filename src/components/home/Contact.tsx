import { RequestForm } from "@/components/forms/RequestForm";
import { Container } from "@/components/layout/Container";
import { site } from "@/data/site";
import { formatUsPhone } from "@/lib/validate";

export function Contact() {
  return (
    <section
      id="request"
      aria-labelledby="contact-heading"
      className="bg-sand/60 py-20"
    >
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="contact-heading" className="font-display text-headline">
            Request a private presentation
          </h2>
          <p className="mt-4 text-muted">
            At the sales gallery with the model residence, or by video with your
            saved layouts on screen.
          </p>
          <dl className="mt-8 grid gap-4 text-sm">
            <div>
              <dt className="text-muted">Sales gallery</dt>
              <dd className="mt-1">{site.gallery.street}, Miami</dd>
            </div>
            {site.gallery.hours.map((row) => (
              <div key={row.days}>
                <dt className="text-muted">{row.days}</dt>
                <dd className="tabular mt-1">{row.time}</dd>
              </div>
            ))}
            <div>
              <dt className="text-muted">Phone</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${site.phone}`}
                  className="tabular inline-flex min-h-11 items-center text-lg whitespace-nowrap hover:text-bay"
                >
                  {formatUsPhone(site.phone)}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <RequestForm />
        </div>
      </Container>
    </section>
  );
}
