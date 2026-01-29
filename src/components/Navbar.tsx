import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ArrowRight, ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import logo from '@/assets/jldigitalworks-logo.png';
const navLinks = [{
  href: '#hero',
  label: 'Home'
}, {
  href: '#problem',
  label: 'Problems'
}, {
  href: '#solution',
  label: 'Services'
}, {
  label: 'More Services',
  dropdown: [{
    href: '#automation',
    label: 'GHL & Automation'
  }, {
    href: '#tracking',
    label: 'Tracking & Analytics'
  }]
}, {
  href: '#portfolio',
  label: 'Portfolio'
}, {
  href: '#faq',
  label: 'FAQ'
}];
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    theme,
    toggleTheme
  } = useTheme();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll spy logic
      const sections = ['hero', 'problem', 'solution', 'automation', 'tracking', 'portfolio', 'testimonials', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const isDropdownActive = activeSection === '#automation' || activeSection === '#tracking';
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-lg shadow-sm border-b border-border' : 'bg-transparent'}`}>
      <nav className="container-custom mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <img src={logo} alt="JL Digital Works Logo" width="40" height="40" loading="eager" className="w-10 h-10 object-contain" />
            <span className="font-display font-bold text-xl text-foreground hidden sm:block">DIGITAL WORKS</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => 'dropdown' in link ? <div key={link.label} className="relative" ref={dropdownRef}>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className={`font-medium transition-colors relative group flex items-center gap-1 ${isDropdownActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${isDropdownActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </button>

                  {dropdownOpen && <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                      {link.dropdown.map(subLink => <a key={subLink.href} href={subLink.href} onClick={() => setDropdownOpen(false)} className={`block px-4 py-2.5 text-sm font-medium transition-colors ${activeSection === subLink.href ? 'text-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
                          {subLink.label}
                        </a>)}
                    </div>}
                </div> : <a key={link.href} href={link.href} className={`font-medium transition-colors relative group ${activeSection === link.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${activeSection === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>)}
          </div>

          {/* Right Side - Theme Toggle & CTA */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors" aria-label="Toggle theme">
              {theme === 'light' ? <Moon className="w-5 h-5 text-foreground" /> : <Sun className="w-5 h-5 text-foreground" />}
            </button>

            {/* CTA Button */}
            <a href="#contact" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:opacity-90 transition-all">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors" aria-label="Toggle menu">
              {isOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg animate-fade-in">
            <div className="flex flex-col py-4 px-4">
              {navLinks.map(link => 'dropdown' in link ? <div key={link.label} className="flex flex-col">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="py-3 px-4 text-foreground font-medium hover:bg-secondary rounded-lg transition-colors flex items-center justify-between">
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdownOpen && <div className="pl-4">
                        {link.dropdown.map(subLink => <a key={subLink.href} href={subLink.href} onClick={() => {
                setIsOpen(false);
                setDropdownOpen(false);
              }} className="py-2.5 px-4 text-muted-foreground font-medium hover:bg-secondary rounded-lg transition-colors block">
                            {subLink.label}
                          </a>)}
                      </div>}
                  </div> : <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="py-3 px-4 text-foreground font-medium hover:bg-secondary rounded-lg transition-colors">
                    {link.label}
                  </a>)}
              <a href="#contact" onClick={() => setIsOpen(false)} className="mt-4 py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold text-center hover:opacity-90 transition-all flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>}
      </nav>
    </header>;
};