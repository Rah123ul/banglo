import { Link } from 'react-router-dom';

const Footer = () => {
  const linkClass = "text-gray-600 hover:text-[#be3a34] transition-colors text-sm";
  const headingStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#4a1d1d',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    marginBottom: '20px'
  };

  return (
    <>
      {/* Footer Image Section */}
      <section className="relative w-full">
        <img
          src={process.env.PUBLIC_URL + "/footer.png"}
          alt="SNS Club Footer"
          className="w-full h-[130px] object-cover"
        />
      </section>

      {/* Footer */}
      <footer className="bg-[#E4E4E4] py-14 relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #000000 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="container mx-auto px-6 relative z-10">

          {/* ── MOBILE LAYOUT (hidden on md+) ── */}
          <div className="md:hidden flex flex-col items-center">

            {/* Logo & Branding - Centered */}
            <div className="flex flex-col items-center mb-10">
              <img
                src={process.env.PUBLIC_URL + "/snslogo.png"}
                alt="SNS Club Logo"
                className="w-16 h-16 mb-4 opacity-90"
              />
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.3rem',
                fontWeight: 700,
                color: '#4a1d1d',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                SNS CLUB
              </h3>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                Science & Spirituality Club<br />
                NIT Calicut
              </p>
            </div>

            {/* CLUB & WORK - Side by Side */}
            <div className="grid grid-cols-2 gap-16 mb-10 w-full max-w-xs">
              {/* CLUB */}
              <div className="flex flex-col items-center">
                <h4 style={headingStyle}>CLUB</h4>
                <div className="flex flex-col items-center gap-3">
                  <Link to="/overview" className={linkClass}>About Us</Link>
                  <Link to="/founder" className={linkClass}>Founder</Link>
                  <Link to="/events" className={linkClass}>Events</Link>
                  <Link to="/admin" className={linkClass}>Admin</Link>
                </div>
              </div>

              {/* WORK */}
              <div className="flex flex-col items-center">
                <h4 style={headingStyle}>WORK</h4>
                <div className="flex flex-col items-center gap-3">
                  <Link to="/activities" className={linkClass}>Activities</Link>
                  <Link to="/science" className={linkClass}>Science</Link>
                  <Link to="/spirituality" className={linkClass}>Spirituality</Link>
                </div>
              </div>
            </div>

            {/* CONNECT - Centered */}
            <div className="flex flex-col items-center mb-6">
              <h4 style={headingStyle}>CONNECT</h4>
              <div className="flex gap-4">
                <SocialIcon href="https://www.instagram.com/sns_nitc/" label="Instagram" icon="instagram" />
                <SocialIcon href="https://www.youtube.com/@snsclubnitc" label="YouTube" icon="youtube" />
                <SocialIcon href="https://www.linkedin.com/company/sns-club-nitc/" label="LinkedIn" icon="linkedin" />
              </div>
            </div>
          </div>

          {/* ── DESKTOP LAYOUT (hidden on mobile) ── */}
          <div className="hidden md:grid md:grid-cols-4 gap-8">

            {/* Column 1: Logo & Branding */}
            <div className="flex flex-col items-start">
              <img
                src={process.env.PUBLIC_URL + "/snslogo.png"}
                alt="SNS Club Logo"
                className="w-16 h-16 mb-4 opacity-90"
              />
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.3rem',
                fontWeight: 700,
                color: '#4a1d1d',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                SNS CLUB
              </h3>
              <p className="text-gray-600 text-sm text-left leading-relaxed">
                Science & Spirituality Club<br />
                NIT Calicut
              </p>
            </div>

            {/* Column 2: CLUB */}
            <div className="flex flex-col items-start">
              <h4 style={headingStyle}>CLUB</h4>
              <div className="flex flex-col gap-3">
                <Link to="/overview" className={linkClass}>About Us</Link>
                <Link to="/founder" className={linkClass}>Founder</Link>
                <Link to="/events" className={linkClass}>Events</Link>
                <Link to="/admin" className={linkClass}>Admin</Link>
              </div>
            </div>

            {/* Column 3: WORK */}
            <div className="flex flex-col items-start">
              <h4 style={headingStyle}>WORK</h4>
              <div className="flex flex-col gap-3">
                <Link to="/activities" className={linkClass}>Activities</Link>
                <Link to="/science" className={linkClass}>Science</Link>
                <Link to="/spirituality" className={linkClass}>Spirituality</Link>
              </div>
            </div>

            {/* Column 4: CONNECT */}
            <div className="flex flex-col items-start">
              <h4 style={headingStyle}>CONNECT</h4>
              <div className="flex gap-4 flex-wrap">
                <SocialIcon href="https://www.instagram.com/science_and_spirituality_nitc/p/DUTi1SMkvBN/" label="Instagram" icon="instagram" />
                <SocialIcon href="https://www.youtube.com/@SNS_NIT_CALICUT" label="YouTube" icon="youtube" />
                <SocialIcon href="https://www.linkedin.com/company/science-spirituality-club-nit-calicut/posts/?feedView=all" label="LinkedIn" icon="linkedin" />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              &copy; 2025 SNS Club, NIT Calicut. Built with curiosity.
            </p>
            <p className="text-gray-500 text-xs italic">
              "सत्यमेव जयते" — Truth alone triumphs
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};

/* ── Reusable Social Icon Component ── */
function SocialIcon({ href, label, icon }) {
  const paths = {
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    youtube: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
      aria-label={label}
    >
      <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center transition-all group-hover:border-[#be3a34] group-hover:bg-[#be3a34]/10">
        <svg className="w-5 h-5 text-gray-600 group-hover:text-[#be3a34] transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d={paths[icon]} />
        </svg>
      </div>
    </a>
  );
}

export default Footer;