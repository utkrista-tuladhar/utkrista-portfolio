/**
 * Portfolio Home Page
 * 
 * Design: Modern Minimalist Professional
 * - Dark charcoal background with teal accents
 * - Clean typography hierarchy with Poppins headings
 * - Asymmetric layout with strategic whitespace
 * - Smooth scroll-triggered animations
 * 
 * Data Structure:
 * - All content is imported from separate data files
 * - Components use loops to render data dynamically
 * - Easy to maintain and update content
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Github, Linkedin, Mail, ChevronDown, ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";
import { projectsData, openSourceProjects, personalProjects } from "@/data/projects";
import { technicalSkills, toolsAndSkills, languages } from "@/data/skills";
import { contactData, quickFacts } from "@/data/contact";
import { clientsData } from "@/data/clients";

// Animated Section Wrapper Component
function AnimatedSection({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`transition-all duration-700 ${isVisible ? "animate-slide-up" : "opacity-0 translate-y-10"} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const [clientCarouselIndex, setClientCarouselIndex] = useState(0);

  const nextClient = () => {
    setClientCarouselIndex((prev) => (prev + 1) % clientsData.length);
  };

  const prevClient = () => {
    setClientCarouselIndex((prev) => (prev - 1 + clientsData.length) % clientsData.length);
  };

  const visibleClients = [
    clientsData[clientCarouselIndex],
    clientsData[(clientCarouselIndex + 1) % clientsData.length],
    clientsData[(clientCarouselIndex + 2) % clientsData.length],
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container flex items-center justify-between h-16">
          <div className="text-xl font-bold font-poppins">UT</div>
          <div className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection("experience")}
              className="text-sm hover:text-accent transition-colors hover-text-accent"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm hover:text-accent transition-colors hover-text-accent"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-sm hover:text-accent transition-colors hover-text-accent"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm hover:text-accent transition-colors hover-text-accent"
            >
              Contact
            </button>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent/10 transition-colors hover-scale"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-accent" />
            ) : (
              <Moon size={20} className="text-accent" />
            )}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
        style={{
          backgroundImage: "url(/images/hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className="space-y-6 animate-fade-in"
            style={{
              opacity: Math.max(0, 1 - scrollY / 500),
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight">
                {portfolioData.name.split(" ")[0]}
                <br />
                <span className="text-accent">{portfolioData.name.split(" ")[1]}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                {portfolioData.title} | {portfolioData.subtitle}
              </p>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              {portfolioData.bio}
            </p>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Get in Touch
              </Button>
              <a
                href="/assets/Utkrista-Tuladhar-Resume.pdf"
                download="Utkrista-Tuladhar-Resume.pdf"
                className="inline-flex items-center justify-center px-4 py-2 border border-accent text-accent hover:bg-accent/10 rounded-md transition-colors font-medium"
              >
                View Resume
              </a>
            </div>

            <div className="flex gap-6 pt-4">
              <a
                href={portfolioData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={portfolioData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${portfolioData.socialLinks.email}`}
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="hidden md:block relative h-96 flex items-center justify-center animate-scale-in">
            <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-accent/30">
              <img
                src={portfolioData.profilePhoto}
                alt="Utkrista Tuladhar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-accent" size={24} />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 border-t border-border">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-5xl font-bold mb-16">Experience</h2>
          </AnimatedSection>

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <AnimatedSection key={exp.id} className="stagger-animation" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <div className="md:col-span-1">
                    <h3 className="text-xl font-bold text-accent animate-glow">
                      {exp.startDate} - {exp.endDate}
                    </h3>
                    <p className="text-muted-foreground mt-2">{exp.location}</p>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold">{exp.title}</h4>
                      <p className="text-lg text-accent">{exp.company}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                    {exp.highlights.length > 0 && (
                      <ul className="space-y-2 text-muted-foreground">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-accent">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {index < experienceData.length - 1 && <div className="h-px bg-border mt-12" />}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 border-t border-border">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-5xl font-bold mb-16">Featured Projects</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <AnimatedSection key={project.id} style={{ animationDelay: `${index * 100}ms` }}>
                <Card className="bg-card border-border hover:border-accent transition-colors group overflow-hidden hover-lift">
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-accent">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 pt-4 flex-wrap">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12">
            <div className="p-8 bg-card border border-border rounded-lg">
              <h3 className="text-xl font-bold mb-4">Open Source & Personal Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {openSourceProjects.map((project) => (
                  <a
                    key={project.title}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-accent hover:underline"
                  >
                    {project.title} <ExternalLink size={16} />
                  </a>
                ))}
                {personalProjects.map((project) => (
                  <div key={project} className="text-muted-foreground">
                    {project}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Clients Carousel Section */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-5xl font-bold mb-4">Trusted by Amazing Clients</h2>
            <p className="text-lg text-muted-foreground mb-12">I have had the privilege of working with these wonderful brands and organizations</p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {visibleClients.map((client, idx) => (
                  <div
                    key={client.id}
                    className="flex flex-col items-center justify-center p-8 bg-background border border-border rounded-lg hover:border-accent transition-all duration-300 transform hover:scale-105 animate-scale-in hover-lift"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="w-24 h-24 mb-4 flex items-center justify-center bg-background rounded-lg">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="max-w-20 max-h-20 object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center">{client.name}</h3>
                    {client.description && (
                      <p className="text-sm text-muted-foreground text-center mt-2">{client.description}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <div className="flex justify-center gap-4 mt-12">
                <button
                  onClick={prevClient}
                  className="p-2 rounded-full border border-border hover:border-accent hover:bg-accent/10 transition-colors hover-scale"
                  aria-label="Previous client"
                >
                  <ChevronLeft size={24} className="text-accent" />
                </button>
                <div className="flex items-center gap-2">
                  {clientsData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setClientCarouselIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === clientCarouselIndex ? "bg-accent w-8" : "bg-border"
                      }`}
                      aria-label={`Go to client ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextClient}
                  className="p-2 rounded-full border border-border hover:border-accent hover:bg-accent/10 transition-colors hover-scale"
                  aria-label="Next client"
                >
                  <ChevronRight size={24} className="text-accent" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 border-t border-border">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-5xl font-bold mb-16">Skills & Expertise</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <AnimatedSection>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
                  <div className="space-y-3">
                    {technicalSkills.map((skill, idx) => (
                      <div
                        key={skill}
                        className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-accent transition-colors animate-slide-up hover-glow"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Tools & Other Skills */}
            <AnimatedSection>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Tools & Other Skills</h3>
                  <div className="space-y-3">
                    {toolsAndSkills.map((skill, idx) => (
                      <div
                        key={skill}
                        className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-accent transition-colors animate-slide-up hover-glow"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Languages</h3>
                  <div className="space-y-2">
                    {languages.map((lang, idx) => (
                      <div
                        key={lang}
                        className="flex items-center gap-2 animate-slide-up"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <span className="text-accent">•</span>
                        <span>{lang}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 border-t border-border">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-5xl font-bold mb-16">Education</h2>
          </AnimatedSection>

          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <AnimatedSection key={edu.id} style={{ animationDelay: `${index * 100}ms` }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <div className="md:col-span-1">
                    <h3 className="text-xl font-bold text-accent animate-glow">
                      {edu.startDate} - {edu.endDate}
                    </h3>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-2xl font-bold">{edu.degree}</h4>
                    <p className="text-lg text-accent">{edu.institution}, {edu.location}</p>
                  </div>
                </div>
                {index < educationData.length - 1 && <div className="h-px bg-border mt-8" />}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 border-t border-border">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-5xl font-bold mb-16">Get In Touch</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm always interested in hearing about new projects and opportunities. Whether you
                  have a question or just want to say hello, feel free to reach out!
                </p>

                <div className="space-y-4">
                  {contactData.map((contact, idx) => (
                    <div
                      key={contact.type}
                      className="flex gap-4 items-start animate-slide-in-left"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      {contact.type === "email" && <Mail className="text-accent mt-1" size={20} />}
                      {contact.type === "linkedin" && (
                        <Linkedin className="text-accent mt-1" size={20} />
                      )}
                      {contact.type === "github" && <Github className="text-accent mt-1" size={20} />}
                      {contact.type === "phone" && (
                        <div className="text-accent mt-1">📱</div>
                      )}
                      <div>
                        <p className="font-medium">{contact.label}</p>
                        <a href={contact.href} className="text-accent hover:underline">
                          {contact.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-card border border-border rounded-lg p-8 animate-scale-in">
                <h3 className="text-2xl font-bold mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  {quickFacts.map((fact, idx) => (
                    <div
                      key={fact.label}
                      className="animate-slide-up"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">
                        {fact.label}
                      </p>
                      <p className="text-lg font-medium">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 {portfolioData.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href={portfolioData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={portfolioData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${portfolioData.socialLinks.email}`}
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
