import { contactData } from "@/data/contact";
import { portfolioData } from "@/data/portfolio";
import { snappy, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ActionButton, Reveal, RevealItem, SectionHeading } from "./primitives";

const ICONS = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  phone: Phone,
} as const;

/** Live clock in Utkrista's timezone, so "is it a reasonable hour to call" is answerable. */
function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: portfolioData.timezone,
        }).format(new Date()),
      );

    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="font-mono text-[11px] text-subtle">
      {time} local
    </span>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const email = portfolioData.socialLinks.email;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions or a non-secure origin;
      // fall back to telling the user the address rather than failing silently.
      toast.error(`Couldn't copy. The address is ${email}`);
    }
  };

  return (
    <button
      onClick={copy}
      className="group inline-flex items-center gap-2.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {email}
      <span className="grid h-7 w-7 place-items-center rounded-md border border-border transition-colors group-hover:border-border-strong">
        {copied ? (
          <Check size={12} className="text-accent-2" />
        ) : (
          <Copy size={12} />
        )}
      </span>
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 py-24 sm:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl ring-hairline">
          {/* Panel ambience, kept inside the rounded clip. */}
          <div aria-hidden className="bg-dots absolute inset-0 opacity-70" />
          <div
            aria-hidden
            className="absolute -left-20 -top-24 h-[28rem] w-[28rem] rounded-full blur-[110px]"
            style={{ background: "var(--glow-a)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-16 h-[24rem] w-[24rem] rounded-full blur-[110px]"
            style={{ background: "var(--glow-b)" }}
          />

          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <SectionHeading
              index="05"
              eyebrow="Contact"
              title={
                <>
                  Let's build something{" "}
                  <span className="font-serif italic font-normal text-gradient-accent">
                    worth using
                  </span>
                </>
              }
              lead="I'm open to full-stack engineering roles, and happy to talk through a problem even if it doesn't turn into one."
            />

            <Reveal className="mt-12 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
              <RevealItem>
                <div className="flex flex-col gap-7">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                      Email
                    </span>
                    <CopyEmail />
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    {contactData
                      .filter((contact) => contact.type !== "email")
                      .map((contact) => {
                        const Icon = ICONS[contact.type as keyof typeof ICONS] ?? Mail;
                        return (
                          <motion.a
                            key={contact.type}
                            href={contact.href}
                            target={contact.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            whileHover={{ x: 2 }}
                            transition={snappy}
                            className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Icon size={15} className="text-subtle group-hover:text-accent" />
                            <span className="link-underline">{contact.value}</span>
                          </motion.a>
                        );
                      })}
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-2" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {portfolioData.location}
                    </span>
                    <span className="text-border-strong">/</span>
                    <LocalTime />
                  </div>
                </div>
              </RevealItem>

              <RevealItem>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={snappy}
                  className="flex flex-wrap gap-3"
                >
                  <ActionButton href={`mailto:${portfolioData.socialLinks.email}`}>
                    Get in touch
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </ActionButton>
                  <ActionButton
                    href={portfolioData.resume}
                    download="Utkrista-Tuladhar-Resume.pdf"
                    variant="outline"
                  >
                    Download résumé
                  </ActionButton>
                </motion.div>
              </RevealItem>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
