"use client"

import Link from "next/link"
import Button from "../Button"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg-root/80 border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-brand)] to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">ST</span>
          </div>
          <span className="font-bold text-sm sm:text-base md:text-lg hidden xs:inline">
            Smart Tasks
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-4 md:gap-6">
          <Link
            href="/dashboard"
            className="text-fg-default hover:text-[var(--color-brand)] transition-colors text-xs sm:text-sm"
          >
            Dashboard
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 text-fg-default hover:bg-[var(--color-brand-soft)] rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="w-5 h-5" />
          ) : (
            <Bars3Icon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-border-subtle bg-bg-root/95 backdrop-blur">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/dashboard"
              className="block text-fg-default hover:text-[var(--color-brand)] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-center"
              >
                Login
              </Button>
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" className="w-full justify-center">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
