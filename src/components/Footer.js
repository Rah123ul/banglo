import { Link } from 'react-router-dom';

const Footer = () => {
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
      <footer className="bg-[#E4E4E4] py-12 relative">
        {/* Subtle paper texture overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
          }}
        />

        <div className="container mx-auto px-6 text-center text-gray-600 relative z-10">
          <p className="text-lg mb-2">
            &copy; 2025 SNS Club. Founded with curiosity and built with community.
          </p>
          <p className="mt-2">
            For inquiries, please reach out to{' '}
            <a
              href="mailto:founder@snsclub.org"
              className="underline hover:text-[#be3a34] transition-colors font-semibold"
            >
              founder@snsclub.org
            </a>
          </p>

          {/* Additional Links */}
          <div className="mt-6 flex justify-center gap-6 text-sm ">
            <a href="#" className="hover:text-[#F4F0E4] transition-colors">Privacy Policy</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-[#be3a34] transition-colors">Terms of Service</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-[#be3a34] transition-colors">Contact Us</a>
            <span className="text-gray-400">|</span>
            <Link to="/admin" className="hover:text-[#be3a34] transition-colors">Admin Login</Link>
          </div>

          {/* Sanskrit Quote */}
          <p className="mt-6 text-sm italic text-gray-500">
            "सत्यमेव जयते" — Truth alone triumphs
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;