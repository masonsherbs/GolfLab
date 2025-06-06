import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Trackman Technology", href: "/trackman" },
      { name: "Photo Gallery", href: "/gallery" },
      { name: "Contact", href: "/contact" },
    ],
    membership: [
      { name: "Plans & Pricing", href: "/pricing" },
      { name: "Join Waitlist", href: "/contact" },
      { name: "Member Login", href: "#" },
      { name: "Book Online", href: "#" },
    ],
    support: [
      { name: "FAQ", href: "#" },
      { name: "Member Guide", href: "#" },
      { name: "Technical Support", href: "#" },
      { name: "Facility Rules", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PG</span>
              </div>
              <span className="font-bold text-xl">Premier Golf</span>
            </Link>

            <p className="text-gray-300 mb-6 leading-relaxed">
              An exclusive membership indoor simulator experience with access to
              Trackman, the same technology used by PGA Tour professionals.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  1540 E Fairview Ave, Suite 104
                  <br />
                  Meridian, Idaho 83642
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">208 - 727 - 7256</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  sales@premiergolfsimulator.com
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  24/7 Member Access
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Membership */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Membership</h3>
            <ul className="space-y-3">
              {footerLinks.membership.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © {currentYear} Premier Golf. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <Link to="#" className="hover:text-green-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-green-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-green-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Powered by Trackman */}
        <div className="text-center mt-8 pt-8 border-t border-gray-700">
          <p className="text-orange-400 font-semibold text-sm mb-1">
            POWERED BY
          </p>
          <p className="text-2xl font-bold text-white">TRACKMAN</p>
          <p className="text-gray-400 text-xs mt-1">
            The same technology used by PGA Tour professionals
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
