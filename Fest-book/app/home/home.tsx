'use client';

import { useState, useRef } from "react";
import { FaUser, FaCalendarAlt, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Spline from '@splinetool/react-spline';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white text-2xl font-black tracking-tighter"
          >
            FEST<span className="text-purple-500">BOOK</span>
          </motion.div>

          <ul className="hidden md:flex space-x-8 text-white font-medium">
            {['About', 'Events', 'Contact'].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`#${item.toLowerCase()}`} className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                  {item === 'About' && <FaUser />}
                  {item === 'Events' && <FaCalendarAlt />}
                  {item === 'Contact' && <FaEnvelope />}
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {!isSignedIn && (
              <Link href="/customer/sign-in">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-colors"
                >
                  Login
                </motion.button>
              </Link>
            )}
            <button
              className="md:hidden text-white text-2xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 border-t border-white/10 px-6 py-4 text-white text-center space-y-4 overflow-hidden"
            >
              {['About', 'Events', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="flex items-center justify-center gap-2 hover:text-purple-400 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Spline scene="https://prod.spline.design/6Wq1Q7YInLlpZ70O/scene.splinecode" />
        </div>

        <motion.div
          style={{ scale, opacity, y }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
          >
            CELEBRATE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              EVERY MOMENT
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10"
          >
            Experience the future of event management. Seamlessly plan, coordinate, and execute unforgettable experiences with cutting-edge tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/"
              className="px-10 py-4 bg-white text-black font-black rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              GET STARTED
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-gray-500">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-10 rounded-full bg-gradient-to-b from-purple-500 to-transparent"
          />
        </motion.div>
      </section>

      {/* Role Selection */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ y: -10 }}
              className="group relative p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-4xl font-bold mb-4">I'm a Guest</h3>
              <p className="text-gray-400 mb-8">Discover and join amazing events happening around you.</p>
              <Link href="/customer/sign-in" className="inline-block px-8 py-3 bg-purple-600 rounded-full font-bold hover:bg-purple-500 transition-colors">
                Join as Guest
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="group relative p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-4xl font-bold mb-4">I'm an Organizer</h3>
              <p className="text-gray-400 mb-8">Create and manage your events with professional tools.</p>
              <Link href="/organiser/login" className="inline-block px-8 py-3 bg-pink-600 rounded-full font-bold hover:bg-pink-500 transition-colors">
                Host Event
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <motion.h2
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                className="text-5xl font-black mb-8"
              >
                REDEFINING <br />
                <span className="text-purple-500">EVENT MANAGEMENT</span>
              </motion.h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                Organizing a festival is no small feat, but with Fest Book, event management becomes smarter, faster, and more efficient.
                Our platform empowers event organizers, venue managers, and vendors with cutting-edge tools to streamline planning.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time analytics & engagement tracking",
                  "Seamless vendor and venue coordination",
                  "Integrated ticketing and social features"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 p-1">
                <div className="w-full h-full rounded-[calc(1.5rem-1px)] bg-black overflow-hidden flex items-center justify-center">
                   <div className="text-8xl font-black text-white/10 rotate-12 select-none">
                    FESTBOOK
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section id="events" className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-4">OUR SERVICES</h2>
            <p className="text-gray-400">Everything you need for a successful event</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Weddings", image: "/wedding.jpg", desc: "Elegant coordination and decor for your special day." },
              { title: "Photography", image: "/Photo & Video Shoot.jpg", desc: "Capturing moments that last a lifetime." },
              { title: "Catering", image: "/Food Supply.jpg", desc: "Exquisite culinary experiences for every palate." },
              { title: "Stationery", image: "/Invitation Cards.jpg", desc: "Bespoke designs for your event invitations." },
              { title: "Decorations", image: "/Stage Decorations.jpg", desc: "Transforming venues into magical spaces." },
              { title: "Logistics", image: "/vehicle.jpg", desc: "Smooth transportation and guest management." },
            ].map((event, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="group relative h-[400px] rounded-3xl overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${event.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {event.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4">GET IN TOUCH</h2>
              <p className="text-gray-400">Ready to start planning? We're here to help.</p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                className="w-full rounded-2xl border border-white/10 px-6 py-4 bg-white/5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                type="text"
                placeholder="Name"
                required
              />
              <input
                className="w-full rounded-2xl border border-white/10 px-6 py-4 bg-white/5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                type="email"
                placeholder="Email"
                required
              />
              <textarea
                className="w-full md:col-span-2 rounded-2xl border border-white/10 px-6 py-4 bg-white/5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                placeholder="How can we help you?"
                rows={4}
                required
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="md:col-span-2 py-4 bg-white text-black font-black rounded-2xl hover:bg-purple-500 hover:text-white transition-all"
                type="submit"
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="text-3xl font-black mb-6 tracking-tighter">FESTBOOK</div>
              <p className="text-gray-400 max-w-sm mb-6">
                Redefining the festival experience through technology and design. Join us in creating unforgettable moments.
              </p>
              <div className="flex gap-4">
                {/* Social icons could go here */}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Sitemap</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="#about" className="hover:text-white">About</Link></li>
                <li><Link href="#events" className="hover:text-white">Events</Link></li>
                <li><Link href="#contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>support@festbook.com</li>
                <li>+91 89254 25514</li>
                <li>500 Event St, Los Angeles, USA</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:row justify-between items-center pt-12 border-t border-white/5 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} FESTBOOK. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">PRIVACY POLICY</a>
              <a href="#" className="hover:text-white">TERMS OF SERVICE</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
