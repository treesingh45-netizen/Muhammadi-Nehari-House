import { useState, useEffect } from 'react';
import { MapPin, Phone, Star, Facebook, Instagram, Clock, CheckCircle2, Menu as MenuIcon, X, ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Using high-quality Unsplash placeholders since image generation quota is reached
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1645696301019-35adcc18fc21?q=80&w=2029&auto=format&fit=crop", // Rich curry/nehari look
  nalli: "https://images.pexels.com/photos/18852561/pexels-photo-18852561.jpeg?auto=compress&cs=tinysrgb&w=800", 
  karahi: "https://rookiewithacookie.com/wp-content/uploads/2020/03/IMG_2108-1.jpg",
  naan: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
  interior: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
};

const ORDER_LINK = "https://www.foodpanda.pk/restaurant/hqut/muhammadi-nehari-house-hqut";
const LOGO_URL = "/logo.jpg";

function OrderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-white hover:bg-brand-red transition-colors z-10">
          <X size={18} />
        </button>
        
        <div className="p-8 pb-6 flex flex-col items-center">
          <img src={LOGO_URL} alt="Logo" className="h-20 w-auto mb-6 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
          
          <h2 className="text-xl font-medium text-brand-blue mb-4">Select your order type</h2>
          
          <div className="flex bg-slate-100 rounded-full p-1.5 mb-8 w-full max-w-[280px]">
            <button 
              onClick={() => setOrderType('delivery')}
              className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold transition-all ${orderType === 'delivery' ? 'bg-brand-red text-white shadow-md' : 'text-slate-600 hover:text-brand-blue'}`}
            >
              DELIVERY
            </button>
            <button 
              onClick={() => setOrderType('pickup')}
              className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold transition-all ${orderType === 'pickup' ? 'bg-brand-red text-white shadow-md' : 'text-slate-600 hover:text-brand-blue'}`}
            >
              PICK-UP
            </button>
          </div>

          <h3 className="text-sm font-medium text-brand-blue mb-4">
            {orderType === 'delivery' ? 'Please select your location' : 'Which outlet would you like to pick-up from?'}
          </h3>

          <button className="w-full max-w-[280px] flex items-center justify-center gap-2 bg-brand-red text-white py-3 rounded-full font-bold text-sm mb-6 hover:bg-red-700 transition-colors shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 duration-200">
            <MapPin size={18} />
            Use Current Location
          </button>

          <div className="w-full space-y-3 text-left">
            <div className="relative">
              <select className="w-full p-3.5 pr-10 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red font-medium appearance-none bg-white cursor-pointer transition-colors shadow-sm">
                <option>Lahore</option>
              </select>
              <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            {orderType === 'delivery' ? (
              <div className="relative">
                <select className="w-full p-3.5 pr-10 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red font-medium appearance-none bg-white cursor-pointer transition-colors shadow-sm">
                  <option>Bahria Town</option>
                  <option>Johar Town</option>
                  <option>DHA</option>
                </select>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            ) : (
              <div className="relative">
                <select className="w-full p-3.5 pr-10 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red font-medium appearance-none bg-white cursor-pointer transition-colors shadow-sm">
                  <option>Muhammadi Nehari - Bahria Town</option>
                </select>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            )}
            
            {orderType === 'pickup' && (
              <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 flex flex-col gap-3 shadow-sm pt-4 mt-4">
                <p className="text-[13px] text-slate-600 leading-relaxed"><span className="font-bold text-brand-blue block mb-1 text-sm">Location:</span> Lockton, Bahria Town, Lahore, Pakistan</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-white bg-brand-red font-bold text-sm py-2.5 px-6 rounded-lg text-center hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all shadow self-start">Get Directions</a>
              </div>
            )}
          </div>
        </div>

        <div className="px-8 pb-8 pt-2">
           <a 
             href={ORDER_LINK} 
             target="_blank" 
             rel="noreferrer"
             onClick={onClose}
             className="block w-full bg-brand-red text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 hover:-translate-y-1 transform tracking-wide"
           >
             Select
           </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-pattern text-slate-900 selection:bg-brand-red selection:text-white">
      
      <OrderModal isOpen={showOrderModal} onClose={() => setShowOrderModal(false)} />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md border-b border-gray-100 py-2' : 'bg-[#faf8f5] shadow-sm border-b border-gray-100 py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center relative h-14">
            
            {/* Left Actions & Mobile Logo */}
            <div className="flex items-center gap-3">
              {/* Desktop Left Actions */}
              <div className="hidden lg:flex items-center gap-3">
                <button 
                  onClick={() => setShowOrderModal(true)}
                  className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition shadow-sm"
                >
                  <MapPin size={18} className="fill-white" />
                  <div className="text-left leading-tight">
                    <span className="block text-xs font-bold tracking-wider">Change Branch</span>
                    <span className="block text-[11px] font-medium opacity-90">Bahria Town</span>
                  </div>
                </button>
                
                <a 
                  href="tel:03009005929"
                  className="flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-700 transition shadow-sm"
                >
                  <Phone size={18} className="fill-white" />
                  <span className="text-base tracking-wide">0300 9005929</span>
                </a>
              </div>

              {/* Mobile Logo */}
              <div className="lg:hidden flex flex-col cursor-pointer text-left" onClick={() => window.scrollTo(0,0)}>
                <h1 className="font-serif font-bold text-xl leading-tight text-brand-blue tracking-tight">Muhammadi</h1>
                <p className="text-[10px] uppercase font-bold tracking-widest text-brand-red mt-0.5">Nehari House</p>
              </div>
            </div>

            {/* Logo Center Text (Desktop Only) */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="flex flex-col items-center justify-center cursor-pointer text-center" onClick={() => window.scrollTo(0,0)}>
                <h1 className="font-serif font-bold text-2xl leading-tight text-brand-blue tracking-tight">Muhammadi</h1>
                <p className="text-[11px] uppercase font-bold tracking-widest text-brand-red mt-0.5">Nehari House</p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 lg:gap-4 shrink-0 z-10">
               <button className="hidden md:flex border border-brand-red text-brand-red items-center gap-2 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition">
                  Sign in / Register
                  <User size={18} className="fill-current" />
               </button>
               
               <div className="hidden sm:block w-px h-6 bg-slate-300"></div>

               <button className="relative p-1 text-brand-red hover:text-red-700 transition">
                  <ShoppingCart size={28} className="fill-current" />
                  <span className="absolute top-0 right-0 w-5 h-5 bg-brand-red text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white translate-x-2 -translate-y-1">0</span>
               </button>

               <button className="bg-brand-red text-white p-2 rounded-lg hover:bg-red-700 transition shadow-sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
               </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-xl font-serif font-medium border-b pb-4">About Us</a>
              <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="text-xl font-serif font-medium border-b pb-4">Our Menu</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="text-xl font-serif font-medium border-b pb-4">Gallery</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-xl font-serif font-medium border-b pb-4">Contact</a>
              <button onClick={() => { setMobileMenuOpen(false); setShowOrderModal(true); }} className="mt-4 rounded-xl bg-brand-red px-6 py-4 text-lg font-medium text-white shadow-lg shadow-brand-red/30">
                Order via Foodpanda
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 px-4">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.hero} alt="Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50"></div>
        </div>

        {/* Abstract shapes for background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] rounded-full bg-red-50 blur-3xl opacity-40 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] rounded-full bg-slate-50 blur-3xl opacity-40 pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-brand-red text-sm font-medium mb-6 animate-pulse">
              <Star size={14} className="fill-brand-red" />
              <span>4.3 Rating (1,283 Reviews)</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold font-serif leading-[1.1] text-brand-blue mb-6">
              Authentic Taste of <br/>
              <span className="text-brand-red">Traditional Nehari</span> <br/>
              in Lahore
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Serving the finest, slow-cooked Nehari with rich spices, tender meat, and an unforgettable aroma in the heart of Bahria Town.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setShowOrderModal(true)} className="inline-flex items-center justify-center rounded-xl bg-brand-red px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 hover:-translate-y-0.5 transition-all">
                Order Now
              </button>
              <a href="#menu" className="inline-flex items-center justify-center rounded-xl bg-white border-2 border-slate-200 px-8 py-4 text-base font-semibold text-brand-blue hover:border-brand-red hover:text-brand-red transition-all">
                View Menu
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-brand-red" />
                Bahria Town, Lahore
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-brand-red" />
                Signature Dishes
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Image styling for premium feel */}
            <div className="relative w-full max-w-md lg:max-w-full aspect-[4/5] lg:aspect-auto lg:h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-blue/20 isolate">
              <img src={IMAGES.hero} alt="Authentic Nehari" className="absolute inset-0 w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              
              {/* Floating badge */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                  <span className="text-brand-red font-bold text-xl">#1</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-blue">Signature Dish</p>
                  <p className="text-xs text-slate-500">Beef Nalli Nehari</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-red font-semibold tracking-wide uppercase text-sm mb-2">Our Specialties</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-serif text-brand-blue">Featured Dishes</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Nalli Nehari", desc: "Rich bone marrow curry, slow-cooked overnight.", img: IMAGES.nalli },
              { name: "Mutton Karahi", desc: "Traditional wok-cooked mutton with fresh spices.", img: IMAGES.karahi },
              { name: "Roghni Naan", desc: "Soft, sesame-topped fresh clay oven bread.", img: IMAGES.naan }
            ].map((dish, i) => (
              <div key={i} className="group rounded-2xl bg-slate-50 border border-slate-100 p-4 transition-all hover:shadow-xl hover:shadow-brand-blue/5 hover:border-slate-200">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 relative">
                  <img src={dish.img} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="text-xl items-center font-serif font-bold text-brand-blue mb-2">{dish.name}</h4>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{dish.desc}</p>
                <a href="#menu" className="inline-flex font-semibold text-brand-red text-sm hover:text-red-800 transition-colors">
                  Explore Menu &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24 bg-brand-blue text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden border-4 border-white/10">
                <img src={IMAGES.restaurant} alt="Restaurant Interior" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-red rounded-full flex items-center justify-center p-8 text-center shadow-2xl">
                <div>
                  <span className="block text-4xl font-serif font-bold">100%</span>
                  <span className="text-sm font-medium text-white/90 uppercase tracking-widest">Authentic</span>
                </div>
              </div>
            </div>
            
            <div className="max-w-lg">
              <h2 className="text-brand-red font-semibold tracking-wide uppercase text-sm mb-2">About Us</h2>
              <h3 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">Preserving the Heritage of Taste</h3>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                At Muhammadi Nehari House, we don't just cook food; we craft experiences. Our Nehari is a labor of love, slow-cooked over low heat with a secret blend of traditional spices passed down through generations.
              </p>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                We pride ourselves on using only premium quality ingredients, ensuring that every bite transports you to the rich culinary history of Lahore. Customer trust and satisfaction are the secret ingredients in our recipe for success.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pb-8 border-b border-white/10">
                <div>
                  <h4 className="text-4xl font-serif font-bold text-brand-red mb-2">4.3</h4>
                  <p className="text-sm text-slate-400 font-medium">Customer Rating</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif font-bold text-brand-red mb-2">10k+</h4>
                  <p className="text-sm text-slate-400 font-medium">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-pattern">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-red font-semibold tracking-wide uppercase text-sm mb-2">Discover</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-serif text-brand-blue">Our Menu</h3>
          </div>

          <div className="space-y-16">
            {/* Category: Nehari */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h4 className="text-2xl font-serif font-bold text-brand-blue">Nehari Specials</h4>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {[
                  { name: "Beef Nehari", price: "Rs. 950", desc: "Authentic slow-cooked beef stew with a rich, spicy gravy." },
                  { name: "Maghaz Nehari", price: "Rs. 1400", desc: "Premium Nehari topped with rich, buttery brain masala." },
                  { name: "Nalli Nehari", price: "Rs. 1650", desc: "The ultimate delicacy featuring tender meat and bone marrow." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col border-b border-slate-200 pb-4 border-dashed">
                    <div className="flex justify-between items-baseline mb-1">
                      <h5 className="font-bold text-lg text-brand-blue">{item.name}</h5>
                      <span className="font-bold text-brand-red">{item.price}</span>
                    </div>
                    <p className="text-slate-500 text-sm xl:text-base">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category: BBQ & Karahi */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h4 className="text-2xl font-serif font-bold text-brand-blue">BBQ & Karahi</h4>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {[
                  { name: "Chicken Karahi (Half/Full)", price: "Rs. 1200 / 2200", desc: "Fresh chicken cooked in a wok with tomatoes, green chillies, and ginger." },
                  { name: "Mutton Karahi (Half/Full)", price: "Rs. 1800 / 3400", desc: "Premium mutton wok-fried with our special blend of traditional spices." },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col border-b border-slate-200 pb-4 border-dashed">
                    <div className="flex justify-between items-baseline mb-1">
                      <h5 className="font-bold text-lg text-brand-blue">{item.name}</h5>
                      <span className="font-bold text-brand-red">{item.price}</span>
                    </div>
                    <p className="text-slate-500 text-sm xl:text-base">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              {/* Category: Breads */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <h4 className="text-2xl font-serif font-bold text-brand-blue">Fresh Breads</h4>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { name: "Plain Naan", price: "Rs. 40" },
                    { name: "Roghni Naan", price: "Rs. 80" },
                    { name: "Garlic Naan", price: "Rs. 100" },
                    { name: "Lachha Paratha", price: "Rs. 120" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                      <h5 className="font-medium text-slate-700">{item.name}</h5>
                      <span className="font-medium text-slate-900">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category: Beverages */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <h4 className="text-2xl font-serif font-bold text-brand-blue">Beverages</h4>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { name: "Soft Drinks (Can/Bottle)", price: "Rs. 100 / 150" },
                    { name: "Mineral Water (Small/Large)", price: "Rs. 60 / 100" },
                    { name: "Traditional Lassi (Sweet/Saltish)", price: "Rs. 250" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                      <h5 className="font-medium text-slate-700">{item.name}</h5>
                      <span className="font-medium text-slate-900">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
          
          <div className="mt-16 text-center">
            <button onClick={() => setShowOrderModal(true)} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 hover:-translate-y-0.5 transition-all cursor-pointer">
              Order via Foodpanda 
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={28} className={i < 4 ? "fill-brand-red text-brand-red" : "stroke-brand-red text-transparent"} />
              ))}
            </div>
            <h3 className="text-3xl font-bold font-serif text-brand-blue">Loved by Lahoris</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ali Raza", text: "Easily the best Nalli Nehari in Bahria Town. The meat was so tender it melted in the mouth, and the environment is very family-friendly." },
              { name: "Sara Khan", text: "Ordered their Mutton Karahi and was blown away. Perfect spice levels and they delivered piping hot through Foodpanda." },
              { name: "Ahmad Hassan", text: "Authentic taste! The Roghni Naan with Maghaz Nehari is a combination you cannot miss. Highly recommended for desi food lovers." }
            ].map((review, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
                <div className="text-brand-red text-6xl font-serif absolute top-4 right-6 opacity-20">"</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-brand-red text-brand-red" />)}
                </div>
                <p className="text-slate-600 mb-6 relative z-10 leading-relaxed italic">"{review.text}"</p>
                <div className="font-bold text-brand-blue">— {review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-slate-900">
        <div className="flex flex-col md:flex-row h-[60vh] min-h-[400px]">
           <div className="w-full md:w-1/3 h-full relative group overflow-hidden">
             <img src={IMAGES.hero} alt="Food" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
           </div>
           <div className="w-full md:w-1/3 h-full relative group overflow-hidden">
             <img src={IMAGES.interior} alt="Restaurant" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
           </div>
           <div className="w-full md:w-1/3 h-full relative group overflow-hidden">
             <img src={IMAGES.nalli} alt="Food" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            <div>
              <h2 className="text-brand-red font-semibold tracking-wide uppercase text-sm mb-2">Visit Us</h2>
              <h3 className="text-4xl font-bold font-serif text-brand-blue mb-8">Drop by or Get in Touch</h3>
              
              <div className="space-y-8 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-red" size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-blue mb-1">Our Location</h5>
                    <p className="text-slate-600">Lockton, Bahria Town<br/>Lahore, Pakistan</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <Phone className="text-brand-red" size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-blue mb-1">Call for Orders/Reservations</h5>
                    <p className="text-slate-600 font-medium">0300 9005929</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <Clock className="text-brand-red" size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-blue mb-1">Opening Hours</h5>
                    <p className="text-slate-600">Mon - Sun: 12:00 PM – 1:00 AM</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white hover:bg-brand-red transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white hover:bg-brand-red transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white hover:bg-brand-red transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.58-1.19 5.14-3.23 6.6-2.09 1.5-4.8 1.94-7.25 1.14-2.47-.79-4.32-2.73-4.9-5.23-.62-2.61.18-5.46 2.06-7.23 1.81-1.72 4.39-2.28 6.78-1.55l.06 4.35c-1.63-.44-3.51-.01-4.52 1.34-1.03 1.36-1.07 3.39-.14 4.8 1.02 1.55 3.29 2.02 4.96.95 1.4-0.9 2.05-2.58 1.98-4.24-.03-4.52-.02-9.05-.03-13.57.17-.03.35-.04.53-.06z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Map Placeholder or Form */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
               <h4 className="text-2xl font-serif font-bold text-brand-blue mb-6">Send a Message</h4>
               <form className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                   <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                   <input type="text" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                 </div>
                 <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                 <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"></textarea>
                 <button type="button" className="w-full bg-brand-blue text-white font-medium py-4 rounded-lg hover:bg-brand-red transition-colors shadow-lg">
                   Send Message
                 </button>
               </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/923009005929" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-500/30 hover:scale-110 transition-transform z-50">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>

      {/* Footer */}
      <footer className="bg-brand-blue text-white/60 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
             <img src={LOGO_URL} alt="MNH Logo" className="h-12 w-auto object-contain" onError={(e) => { e.currentTarget.style.display='none'; }} />
             <span className="font-serif font-bold text-white text-xl">Muhammadi Nehari House</span>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm mb-8">
            <a href="mailto:info@muhammadineharihouse.com" className="hover:text-white transition-colors">info@muhammadineharihouse.com</a>
            <span className="hidden md:inline">•</span>
            <a href="mailto:orders@muhammadineharihouse.com" className="hover:text-white transition-colors">orders@muhammadineharihouse.com</a>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Muhammadi Nehari House. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
