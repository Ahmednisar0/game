import Link from 'next/link';
import Image from 'next/image';
import { 
  FaCcVisa,
  FaCcMastercard,
  FaCcApplePay,
  FaPaypal,
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube 
} from 'react-icons/fa';
import { SiGooglepay } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Customer Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">CUSTOMER SERVICES</h3>
            <ul className="space-y-2">
              <li><Link href="/support" className="hover:text-pink-400 transition-colors">Help Home</Link></li>
              <li><Link href="/support" className="hover:text-pink-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/support" className="hover:text-pink-400 transition-colors">Delivery & Collection</Link></li>
              <li><Link href="/support" className="hover:text-pink-400 transition-colors">Returns Policy</Link></li>
              <li><Link href="/support" className="hover:text-pink-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">INFORMATION</h3>
            <ul className="space-y-2">
              <li><Link href="/support" className="hover:text-pink-400 transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li><Link href="/support" className="hover:text-pink-400 transition-colors">Promotional Terms</Link></li>
              <li><Link href="/support" className="hover:text-pink-400 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Payment Methods - Icons Only */}
          <div>
            <h3 className="font-bold text-lg mb-4">PAYMENT METHODS</h3>
            <div className="flex flex-wrap gap-4">
              <FaCcVisa size={28} className="text-blue-800" title="Visa" />
              <FaCcMastercard size={28} className="text-red-600" title="Mastercard" />
              <FaPaypal size={28} className="text-blue-600" title="PayPal" />
              <FaCcApplePay size={28} className="text-black" title="Apple Pay" />
              <SiGooglepay size={28} className="text-black" title="Google Pay" />
              <div className="relative w-7 h-7" title="Debit Card">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2" fill="#1A1A1A"/>
                  <rect x="6" y="8" width="12" height="8" rx="1" fill="#F0F0F0"/>
                  <path d="M6 12H18" stroke="#1A1A1A" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
      <div className="border-t border-gray-300 mt-10 pt-6">
  <div className="flex flex-col md:flex-row justify-between items-center">
    <div className="mb-4 md:mb-0">
      <Link href="/">
        <Image 
          src="/images/logoo.png" 
          alt="GAME Logo" 
          width={300}  // Increased from 200
          height={150} // Increased from 100
          className="h-16 w-auto" // Increased from h-10
        />
      </Link>
    </div>

            <div className="text-sm text-center md:text-left mb-4 md:mb-0">
              <div className="flex flex-wrap justify-center gap-4">
                <span>© 2025 Game Retail Limited</span>
                <Link href="/privacy" className="hover:text-pink-400 transition-colors">Privacy Policy</Link>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link href="#" className="hover:text-pink-400 transition-colors">
                <FaFacebook size={20} />
              </Link>
              <Link href="#" className="hover:text-pink-400 transition-colors">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" className="hover:text-pink-400 transition-colors">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="hover:text-pink-400 transition-colors">
                <FaYoutube size={20} />
              </Link>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-600 text-center">
            <p>
              Elite Hits UK LTD (Company Registration No: 16427807), trading as 'GAME CAFE | Consoles & Games', is authorised and regulated by the Financial Conduct Authority (FCA) as a credit broker and not a lender.
            </p>
            <p className="mt-2">
              Registered Office: 203 West Street, Fareham, Hampshire, England, PO16 0EN
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;