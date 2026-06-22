import { Mail, Linkedin, Twitter } from "lucide-react"

const BG = "#f5f4f1"

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 lg:py-32 px-6 lg:px-8"
      style={{ background: BG, borderTop: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
            style={{ color: "#111111" }}
          >
            Let&apos;s Work Together
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#666" }}>
            Interested in collaborating on your next project? Let&apos;s connect and discuss how we can create something
            exceptional together.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:juanchi.martinezv@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-opacity hover:opacity-75"
            style={{ background: "#111111", color: "#f5f4f1" }}
          >
            <Mail className="h-5 w-5" />
            Contact me
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 pt-8">
          <a
            href="https://www.linkedin.com/in/juan-martinez-viademonte-4058972b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-50"
            style={{ color: "#333" }}
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://x.com/home?lang=es"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-50"
            style={{ color: "#333" }}
          >
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </div>
    </section>
  )
}
