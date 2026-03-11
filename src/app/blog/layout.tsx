import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/30">
      {/* BEGIN: MainHeader */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight">UGC</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
              <Link href="#" className="transition-colors hover:text-foreground">About Product</Link>
              <Link href="#" className="transition-colors hover:text-foreground">Resources</Link>
              <Link href="#" className="transition-colors hover:text-foreground">Enterprise</Link>
              <Link href="#" className="transition-colors hover:text-foreground">Pricing</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              Log in
            </button>
            <button className="rounded-[8px] bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/80">
              Sign up
            </button>
          </div>
        </nav>
      </header>
      {/* END: MainHeader */}

      {children}

      {/* BEGIN: CTAFooterSection */}
      <section className="bg-muted/50 py-32 text-center">
        <h2 className="mb-6 text-3xl font-bold text-foreground">Create with the highest quality platform</h2>
        <div className="flex items-center justify-center gap-4">
          <Link href="#" className="text-sm font-medium hover:underline text-foreground">
            Contact Sales
          </Link>
          <button className="rounded-full bg-foreground px-8 py-3 font-medium text-background transition-all hover:bg-foreground/90">
            Sign up
          </button>
        </div>
      </section>
      {/* END: CTAFooterSection */}

      {/* BEGIN: MainFooter */}
      <footer className="bg-background pt-24 pb-12 border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-5">
            <div className="col-span-2 md:col-span-1">
              <span className="mb-4 block text-xl font-bold text-foreground">UGC</span>
              <div className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
                English
              </div>
            </div>
            
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">General</h4>
              <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Products</Link></li>
                <li><Link href="#" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground">Integrations</Link></li>
                <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Developers</h4>
              <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">API Reference</Link></li>
                <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
                <li><Link href="#" className="hover:text-foreground">Status</Link></li>
                <li><Link href="#" className="hover:text-foreground">GitHub</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Resources</h4>
              <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground">Help Center</Link></li>
                <li><Link href="#" className="hover:text-foreground">Case Studies</Link></li>
                <li><Link href="#" className="hover:text-foreground">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-between gap-6 border-t border-border/40 pt-8 md:flex-row">
            <p className="text-xs text-muted-foreground/60">© 2024 UGC Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-muted-foreground/60 hover:text-foreground transition-colors">
                <span className="sr-only">X</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground/60 hover:text-foreground transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
      {/* END: MainFooter */}
    </div>
  )
}
