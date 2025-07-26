import ContactForm from "@/components/Forms/ContactForm";
import Link from "next/link";

const ContactUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Get in Touch
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Send us a message

          </h2>
          <ContactForm />
        </div>

        {/* Contact Details and Map Section */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Contact Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span className="text-2xl text-blue-600">📍</span>
                <p className="text-gray-600 leading-relaxed">
                  Ward no 02, North of Madhepura College, Madhepura, Bihar,
                  852113
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl text-blue-600">📞</span>
                <Link
                  href="tel:+917295890160"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  +91 7295890160
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl text-blue-600">✉️</span>
                <Link
                  href="mailto:contact@iistbihar.com"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  contact@iistbihar.com
                </Link>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Find Us</h2>
            <div className="h-[350px] w-full overflow-hidden rounded-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.8275121219584!2d87.00459287552611!3d25.634699577708976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f035ba9a702767%3A0x594ac61762918098!2sIIST%20Bihar!5e0!3m2!1sen!2sin!4v1706025328044!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
