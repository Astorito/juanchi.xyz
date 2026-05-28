export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">About Me</h2>

          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p className="text-foreground/90">
              I'm a seasoned Project Manager and Creative Strategist with extensive experience in building cutting-edge
              technology solutions and leading high-performance teams.
            </p>

            <p>
              Throughout my career, I've had the privilege of leading teams of over 250 people, coordinating complex
              international projects across multiple regions. My expertise spans project management, technology
              implementation, and strategic innovation.
            </p>

            <p>
              I specialize in the energy sector, transparency applications, and AI agent development. I'm passionate
              about leveraging technology to solve real-world problems and create meaningful impact.
            </p>

            <p>
              My approach combines strategic thinking with hands-on execution, ensuring that projects not only meet
              their goals but exceed expectations. I thrive in dynamic environments where innovation and collaboration
              drive success.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            <div className="space-y-2">
              <div className="font-bold text-6xl text-primary">250+</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-secondary-foreground text-6xl">5+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-6xl text-primary">8+</div>
              <div className="text-sm text-muted-foreground">Years</div>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-secondary-foreground text-6xl">20+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
