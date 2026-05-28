export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Juanchi. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Built with passion and precision.</p>
        </div>
      </div>
    </footer>
  )
}
