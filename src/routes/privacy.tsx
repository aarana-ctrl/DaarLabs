import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteChrome";
import { CONTACT_EMAIL } from "@/lib/contact-shared";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — DaarLabs" },
      { name: "description", content: "How DaarLabs handles your data." },
      { property: "og:title", content: "Privacy Policy — DaarLabs" },
      { property: "og:description", content: "How DaarLabs handles your data." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Privacy,
});

/** Bumped by hand whenever the policy text below changes. */
const LAST_UPDATED = "31 July 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-foreground mb-3">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Privacy() {
  return (
    <PageShell>
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Legal</p>
        <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight mb-6">
          Privacy Policy
        </h1>
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-16">
          Last updated — {LAST_UPDATED}
        </p>

        <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
          <Section title="1. Who this covers">
            <p>
              DaarLabs is an independent studio run by Aaditya Rana. This policy covers this
              website and the apps we build and operate — <strong>Liquid</strong>,{" "}
              <strong>Tabs</strong>, <strong>TaskFlow</strong>, and <strong>RidePool</strong> — along
              with anything else we ship under the DaarLabs name unless that product publishes its
              own policy.
            </p>
            <p>
              The short version: we collect the minimum an app needs to work, we don't sell it, we
              don't run ads, and we don't build advertising profiles out of it.
            </p>
          </Section>

          <Section title="2. Signing in">
            <p>
              Most of our apps use Google Sign-In (and, in some apps, Sign in with Apple) through
              Firebase Authentication. When you sign in this way, Google or Apple authenticates you
              and shares a small amount of basic profile information with us — typically your name,
              your email address, your profile picture, and a unique account identifier.
            </p>
            <p>
              We never see, receive, or store your Google or Apple password, and we never handle
              your two-factor codes. You can review or revoke our access at any time from your
              Google Account's third-party connections page or your Apple ID settings.
            </p>
            <p>
              RidePool additionally restricts sign-up to school-affiliated email domains
              (.edu and .k12), so the email address you sign in with is also used to confirm you
              belong to a participating school.
            </p>
          </Section>

          <Section title="3. What each app stores">
            <p>
              Beyond your account details, each app stores the content you create in it so it can
              sync across your devices:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-gold/60">
              <li>
                <strong>Liquid</strong> — your degree plan, saved programs, and the audit snapshots
                described in section 4.
              </li>
              <li>
                <strong>Tabs</strong> — the tables you belong to, session buy-ins and results, guest
                player entries, and settlement records.
              </li>
              <li>
                <strong>TaskFlow</strong> — your tasks and their due dates, plus any calendar feed
                URLs you add (Canvas, Gradescope, or a course site). We fetch those feeds through a
                serverless proxy to read your assignments; we don't use them for anything else.
              </li>
              <li>
                <strong>RidePool</strong> — your role, the events you post or join, ride offers and
                requests, and your credit balance.
              </li>
            </ul>
          </Section>

          <Section title="4. Liquid and your university data">
            <p>
              Liquid is the one product that reads data from a university system, so it deserves its
              own explanation.
            </p>
            <p>
              Liquid's companion browser extension runs in your own browser, on your own machine,
              using the University of Washington session you are already signed in to. With it,
              Liquid reads your DARS degree audit, program and course catalog data from MyPlan,
              grade distributions from DawgPath, and instructor ratings from RateMyProfessors, and
              sends that data to your own Liquid account so it can be shown back to you.
            </p>
            <p>
              The extension never asks for your NetID, your password, or a 2FA code, never
              circumvents university bot protections or request signing, and never sends your data
              to anyone but your own account. The shared course catalog is published once by us and
              served read-only, so individual users never have to scrape it themselves.
            </p>
            <p>
              DaarLabs is not affiliated with, endorsed by, or acting on behalf of the University of
              Washington. Your use of university systems remains subject to their own policies.
            </p>
          </Section>

          <Section title="5. Contacting us through this site">
            <p>
              If you use the contact form, we receive the name, email address, and message you
              submit, and we use them only to reply. Messages are delivered to us by email through
              Resend.
            </p>
          </Section>

          <Section title="6. How we use information">
            <p>
              We use what we collect to authenticate you, to operate and sync the features you're
              using, to keep our apps working and secure, and to respond when you contact us.
            </p>
            <p>
              We do not sell personal data, share it with data brokers, use it for advertising, or
              use it to build advertising or marketing profiles. Data obtained through Google
              Sign-In and other Google APIs is handled in line with the Google API Services User
              Data Policy, including its Limited Use requirements.
            </p>
          </Section>

          <Section title="7. Who processes data for us">
            <p>
              We keep the list of third parties short, and each one only receives what it needs to
              perform its function:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-gold/60">
              <li>
                <strong>Google Firebase</strong> — authentication and database storage for our apps.
              </li>
              <li>
                <strong>Vercel</strong> and <strong>Render</strong> — hosting for our web apps and
                APIs.
              </li>
              <li>
                <strong>Resend</strong> — delivery of contact-form messages.
              </li>
            </ul>
            <p>
              We may also disclose information if we're legally required to, or where it's necessary
              to investigate abuse or protect someone's safety.
            </p>
          </Section>

          <Section title="8. Security and retention">
            <p>
              Data is transmitted over encrypted connections and stored with our providers under
              access rules that restrict each account to its own data. No system is perfectly
              secure, but we don't store passwords, and we try to hold as little as possible in the
              first place.
            </p>
            <p>
              We keep your information for as long as your account is active. Ask us to delete your
              account and we'll remove your personal data and the content tied to it, except where
              we're required to retain something. Shared records that other people also rely on —
              for example a poker session in Tabs that other players are part of — may persist in
              anonymised form.
            </p>
          </Section>

          <Section title="9. Your choices">
            <p>
              You can access and edit most of your information from inside each app, revoke our
              access from your Google or Apple account settings, remove the Liquid extension at any
              time, or email us to request a copy or deletion of your data. Depending on where you
              live, you may have additional rights over your personal information; write to us and
              we'll honour them.
            </p>
          </Section>

          <Section title="10. Children">
            <p>
              Our apps are built for university and high-school communities and are not intended for
              children under 13. We don't knowingly collect personal information from anyone under
              13, and we'll delete it if we learn we have.
            </p>
          </Section>

          <Section title="11. Changes">
            <p>
              If this policy changes in a way that matters, we'll update the date at the top of this
              page and, where the change is significant, tell you in the app.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              Questions about this policy, or a request about your data, can go to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </PageShell>
  );
}
