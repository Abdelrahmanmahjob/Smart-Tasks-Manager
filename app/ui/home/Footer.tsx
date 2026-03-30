import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-bg-root/50 backdrop-blur">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-brand)] to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">ST</span>
              </div>
              <span className="font-bold text-sm sm:text-base">
                Smart Tasks
              </span>
            </div>
            <p className="text-fg-muted text-xs sm:text-sm">
              Your smart task management solution
            </p>
          </div>

          {/* Product Links */}
          <div>
            <p className="font-semibold text-sm mb-4">Product</p>
            <ul className="space-y-2 text-xs sm:text-sm text-fg-muted">
              <li>
                <Link
                  href="#"
                  className="hover:text-fg-default transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-fg-default transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-fg-default transition-colors"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <p className="font-semibold text-sm mb-4">Company</p>
            <ul className="space-y-2 text-xs sm:text-sm text-fg-muted">
              <li>
                <Link
                  href="#"
                  className="hover:text-fg-default transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-fg-default transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-fg-default transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <p className="font-semibold text-sm mb-4">Legal</p>
            <ul className="space-y-2 text-xs sm:text-sm text-fg-muted">
              <li>
                <Link
                  href="#"
                  className="hover:text-fg-default transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-fg-default transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border-subtle pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <p className="text-fg-muted text-xs sm:text-sm text-center sm:text-left">
            © 2026 Smart Tasks Manager. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-fg-muted hover:text-fg-default transition-colors text-xs sm:text-sm"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-fg-muted hover:text-fg-default transition-colors text-xs sm:text-sm"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="text-fg-muted hover:text-fg-default transition-colors text-xs sm:text-sm"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
