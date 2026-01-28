/**
 * Portfolio Home Page
 * 
 * Design: Modern Minimalist Professional
 * - Dark charcoal background with teal accents
 * - Clean typography hierarchy with Poppins headings
 * - Asymmetric layout with strategic whitespace
 * - Smooth scroll-triggered animations
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container flex items-center justify-between h-16">
          <div className="text-xl font-bold font-poppins">UT</div>
          <div className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection("experience")}
              className="text-sm hover:text-accent transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm hover:text-accent transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-sm hover:text-accent transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm hover:text-accent transition-colors"
            >
              Contact
            </button>
          </div>
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
                Utkrista
                <br />
                <span className="text-accent">Tuladhar</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Angular Developer | Web Application Specialist
              </p>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Dedicated Angular developer with 3+ years of experience building dynamic, responsive web applications. Specialized in creating scalable components, optimizing performance, and delivering exceptional user experiences.
            </p>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Get in Touch
              </Button>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                View Resume
              </Button>
            </div>

            <div className="flex gap-6 pt-4">
              <a
                href="https://linkedin.com/in/utkrista-tuladhar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/utkrista-tuladhar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:utktul10@gmail.com"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="hidden md:block relative h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-lg" />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-accent" size={24} />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 border-t border-border">
        <div className="container">
          <h2 className="text-5xl font-bold mb-16">Experience</h2>

          <div className="space-y-12">
            {/* Code Himalaya */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <h3 className="text-xl font-bold text-accent">Aug 2023 - Present</h3>
                <p className="text-muted-foreground mt-2">Kupondole, Lalitpur</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-2xl font-bold">Angular Developer</h4>
                  <p className="text-lg text-accent">Code Himalaya Pvt. Ltd.</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Building and maintaining web applications using Angular, HTML, CSS, and JavaScript. Designing scalable, reusable components following best practices and design patterns. Implementing efficient routing, data binding, and services with dependency injection.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Implemented server-side rendering for SEO optimization</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Mentored junior developers on best practices</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Led frontend team on multiple production applications</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* IMS Software */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <h3 className="text-xl font-bold text-accent">Jun 2022 - Aug 2023</h3>
                <p className="text-muted-foreground mt-2">Tripureshwor, Kathmandu</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-2xl font-bold">Associate Software Engineer (Angular)</h4>
                  <p className="text-lg text-accent">IMS Software Pvt. Ltd.</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Analyzed software requirements, addressed bugs, and implemented features. Designed and developed web-based software focusing on POS systems, inventory management, and accounting applications.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Applied agile development methodologies</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Utilized Git for version control and team collaboration</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Provided comprehensive codebase documentation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Technorio */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <h3 className="text-xl font-bold text-accent">Dec 2021 - May 2022</h3>
                <p className="text-muted-foreground mt-2">Shankhamul, Kathmandu</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-2xl font-bold">Web Developer Intern</h4>
                  <p className="text-lg text-accent">Technorio Inc.</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Gained hands-on experience in web development with focus on HTML, CSS, and JavaScript. Developed strong understanding of component-based architecture and interactive UI design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 border-t border-border">
        <div className="container">
          <h2 className="text-5xl font-bold mb-16">Featured Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hiperbrains */}
            <Card className="bg-card border-border hover:border-accent transition-colors group overflow-hidden">
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                  Hiperbrains Job Portal
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive job portal application with video conferencing, whiteboard sharing, and payment integration.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Online video conferencing with whiteboard</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Firebase push notifications</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>OTP verification via Twilio</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>PayPal & Stripe integration</span>
                  </li>
                </ul>
                <div className="flex gap-2 pt-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">Angular</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">Firebase</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">Stripe</span>
                </div>
              </div>
            </Card>

            {/* Case Status */}
            <Card className="bg-card border-border hover:border-accent transition-colors group overflow-hidden">
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                  Case Status Management
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Legal case management system for tracking and monitoring court cases in India with real-time updates.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Case search and tracking</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Real-time notifications</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>User-friendly interface</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Improved case management efficiency</span>
                  </li>
                </ul>
                <div className="flex gap-2 pt-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">Angular</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">REST API</span>
                </div>
              </div>
            </Card>

            {/* SSF */}
            <Card className="bg-card border-border hover:border-accent transition-colors group overflow-hidden">
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                  Social Security Fund (SSF)
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Government social security fund tracking and administration system for Nepal.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Fund tracking and administration</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Accurate financial records</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Government compliance</span>
                  </li>
                </ul>
                <div className="flex gap-2 pt-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">Angular</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">Government</span>
                </div>
              </div>
            </Card>

            {/* HR Accounting */}
            <Card className="bg-card border-border hover:border-accent transition-colors group overflow-hidden">
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                  HR Accounting & Inventory
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive business management system integrating user management, inventory, and accounting.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>User management system</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Inventory tracking</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Basic accounting functions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Enhanced organizational efficiency</span>
                  </li>
                </ul>
                <div className="flex gap-2 pt-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">Angular</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">Full-Stack</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 p-8 bg-card border border-border rounded-lg">
            <h3 className="text-xl font-bold mb-4">Open Source & Personal Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://github.com/utkrista-tuladhar/movie-review-app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent hover:underline"
              >
                Movie Review App <ExternalLink size={16} />
              </a>
              <a
                href="https://github.com/utkrista-tuladhar/expense-tracker-app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent hover:underline"
              >
                Expense Tracker <ExternalLink size={16} />
              </a>
              <div className="text-muted-foreground">
                Hand Sign Language Recognition (Final Year Project)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 border-t border-border">
        <div className="container">
          <h2 className="text-5xl font-bold mb-16">Skills & Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
                <div className="space-y-4">
                  {[
                    { skill: "Angular", level: 95 },
                    { skill: "TypeScript", level: 90 },
                    { skill: "HTML & CSS", level: 95 },
                    { skill: "JavaScript", level: 90 },
                    { skill: "Server-Side Rendering", level: 85 },
                    { skill: "REST APIs", level: 90 },
                  ].map((item) => (
                    <div key={item.skill}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{item.skill}</span>
                        <span className="text-accent text-sm">{item.level}%</span>
                      </div>
                      <div className="h-2 bg-card rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all duration-500"
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools & Other Skills */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Tools & Other Skills</h3>
                <div className="space-y-3">
                  {[
                    "Git & Version Control",
                    "Webpack & Module Bundlers",
                    "Firebase",
                    "Payment Integration (Stripe, PayPal)",
                    "Agile Development",
                    "Adobe Photoshop",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-accent transition-colors"
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
                  {["Nepali (Native)", "English (Fluent)", "Nepal Bhasa"].map((lang) => (
                    <div key={lang} className="flex items-center gap-2">
                      <span className="text-accent">•</span>
                      <span>{lang}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 border-t border-border">
        <div className="container">
          <h2 className="text-5xl font-bold mb-16">Education</h2>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <h3 className="text-xl font-bold text-accent">Sep 2024 - Present</h3>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-2xl font-bold">MBA</h4>
                <p className="text-lg text-accent">Lincoln International College, Kathmandu</p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <h3 className="text-xl font-bold text-accent">Oct 2017 - Oct 2022</h3>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-2xl font-bold">BSc. CSIT (Computer Science & IT)</h4>
                <p className="text-lg text-accent">Prime College, Kathmandu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 border-t border-border">
        <div className="container">
          <h2 className="text-5xl font-bold mb-16">Get In Touch</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hello, feel free to reach out!
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <Mail className="text-accent mt-1" size={20} />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:utktul10@gmail.com"
                      className="text-accent hover:underline"
                    >
                      utktul10@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Linkedin className="text-accent mt-1" size={20} />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a
                      href="https://linkedin.com/in/utkrista-tuladhar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      linkedin.com/in/utkrista-tuladhar
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Github className="text-accent mt-1" size={20} />
                  <div>
                    <p className="font-medium">GitHub</p>
                    <a
                      href="https://github.com/utkrista-tuladhar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      github.com/utkrista-tuladhar
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="text-accent mt-1">📱</div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+977-9843139157" className="text-accent hover:underline">
                      +977-9843139157
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Location</p>
                  <p className="text-lg font-medium">Kathmandu, Nepal</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Experience</p>
                  <p className="text-lg font-medium">3+ Years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Specialization</p>
                  <p className="text-lg font-medium">Angular & Frontend Development</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Currently</p>
                  <p className="text-lg font-medium">Open to Opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Utkrista Tuladhar. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://linkedin.com/in/utkrista-tuladhar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/utkrista-tuladhar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:utktul10@gmail.com"
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
