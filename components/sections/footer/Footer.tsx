import { FaEnvelope, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white py-8 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold mb-2">İlayda Yücer | Biyolog | Biyoloji Öğretmeni</h2>
          <p className="text-gray-300">© 2025 Tüm hakları saklıdır.</p>
        </div>

        <div className="flex space-x-8">
          <h1>Benimle İletişime Geçin :</h1>
          <a
            href="mailto:ogretmen@email.com"
            className="flex items-center space-x-2 hover:text-yellow-400 transition-colors duration-300"
          >
            <FaEnvelope size={24} />
            <span>Email</span>
          </a>

          <a
            href="https://www.instagram.com/ogretmen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-pink-500 transition-colors duration-300"
          >
            <FaInstagram size={24} />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
