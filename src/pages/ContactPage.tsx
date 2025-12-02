import React, { useState, useEffect } from 'react';
import { Phone, Mail, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import ContactFooter from '../components/ContactFooter';
import { useLocation } from 'react-router-dom';

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });

  const location = useLocation();

  // 🚀 Correção: sempre que entrar nessa página, volta ao topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const formspreeUrl = 'https://formspree.io/f/manroyar';
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const response = await fetch(formspreeUrl, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (response.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f7f5f2]">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center pt-28 pb-12 px-4 sm:px-6">
        
        <h1 className="text-5xl md:text-6xl font-serif font-extrabold text-stone-900 mb-12 border-b-4 border-[#5C4033] pb-4 tracking-wide text-center md:text-left">
          Get in Touch
        </h1>
        <p className="text-stone-600 text-lg mb-10 max-w-3xl text-center md:text-left">
          We’d love to hear from you. Fill out the form or reach us directly via email or phone.
        </p>

        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden p-10 flex flex-col md:flex-row gap-10">
          
          <div className="md:w-2/3">
            {status === 'success' ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="font-serif text-3xl text-stone-800 mb-2">Message Sent!</h3>
                <p className="text-stone-500 mb-8">Thank you for reaching out. We will contact you shortly.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-[#5C4033] font-bold border-b-2 border-[#5C4033] hover:text-stone-800 transition-colors pb-1"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-semibold text-stone-600">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                      className="mt-1 px-4 py-3 border border-stone-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#5C8D4A]/40 focus:border-[#5C8D4A] outline-none transition-all bg-stone-50 hover:border-[#5C8D4A]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-sm font-semibold text-stone-600">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                      className="mt-1 px-4 py-3 border border-stone-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#5C8D4A]/40 focus:border-[#5C8D4A] outline-none transition-all bg-stone-50 hover:border-[#5C8D4A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-semibold text-stone-600">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="mt-1 px-4 py-3 border border-stone-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#5C8D4A]/40 focus:border-[#5C8D4A] outline-none transition-all bg-stone-50 hover:border-[#5C8D4A]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm font-semibold text-stone-600">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                      className="mt-1 px-4 py-3 border border-stone-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#5C8D4A]/40 focus:border-[#5C8D4A] outline-none transition-all bg-stone-50 hover:border-[#5C8D4A]"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="message" className="text-sm font-semibold text-stone-600">Your Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    required
                    className="mt-1 px-4 py-3 border border-stone-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#5C8D4A]/40 focus:border-[#5C8D4A] outline-none transition-all bg-stone-50 resize-none hover:border-[#5C8D4A]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full mt-4 bg-[#5C8D4A] text-white font-semibold py-4 rounded-xl hover:scale-105 transform transition-all duration-300 shadow-lg flex justify-center items-center gap-3"
                >
                  {status === 'submitting' ? 'Sending...' : <>Send Message <Send className="w-5 h-5" /></>}
                </button>
              </form>
            )}
          </div>

          <div className="md:w-1/3 flex flex-col justify-center border-l border-stone-200 pl-8 space-y-8">
            <h2 className="text-2xl font-serif font-bold text-stone-800 mb-4">Contact Info</h2>
            

            <a
              href="mailto:nastia_m@hotmail.com"
              className="text-stone-800 hover:text-[#5C4033] transition-all flex items-center gap-4 text-lg font-medium"
            >
              <Mail className="w-7 h-7 text-[#5C4033]" />
              nastia_m@hotmail.com
            </a>

            <a
              href="tel:+14046435225"
              className="text-stone-800 hover:text-[#5C4033] transition-all flex items-center gap-4 text-lg font-medium"
            >
              <Phone className="w-7 h-7 text-[#5C4033]" />
              +1 404-643-5225
            </a>
          </div>
        </div>
      </main>

      <ContactFooter />
    </div>
  );
};

export default ContactPage;

