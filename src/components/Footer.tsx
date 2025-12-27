export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-quinary to-quaternary text-white py-16 px-6 overflow-hidden" id="contact">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-tertiary opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary opacity-10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-tertiary rounded-full flex items-center justify-center text-2xl shadow-lg">
                🌟
              </div>
              <h3 className="text-3xl font-bold">Gokul</h3>
            </div>
            <p className="text-primary leading-relaxed mb-6">
              Fitness enthusiast, movie lover, and entrepreneur. Living life with passion, purpose, and dedication to health and art.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all transform hover:scale-110 shadow-md">
                <span className="text-xl">📧</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all transform hover:scale-110 shadow-md">
                <span className="text-xl">📱</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all transform hover:scale-110 shadow-md">
                <span className="text-xl">🎬</span>
              </a>
            </div>
          </div>
          
          {/* Contact Section */}
            <div className="md:col-start-4">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-secondary">▸</span> Connect
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
              <span className="text-secondary mt-1">📧</span>
              <div>
                <p className="text-xs text-primary/70">Email</p>
                <a href="mailto:kupaahealthproducts@gmail.com" className="text-primary hover:text-white transition-colors">
                kupaahealthproducts@gmail.com
                </a>
              </div>
              </li>
              <li className="flex items-start gap-2">
              <span className="text-secondary mt-1">📸</span>
              <div>
                <p className="text-xs text-primary/70">Instagram</p>
                <a href="https://instagram.com/kupaahealthproducts" className="text-primary hover:text-white transition-colors">
                @kupaahealthproducts
                </a>
              </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">📞</span>
              
              <div>
                <p className="text-xs text-primary/70">Mobile</p>
                <a href="tel:+917904675855" className="text-primary hover:text-white transition-colors">
                +91 79046 75855
                </a>
              </div>
              </li>
            </ul>
            </div>
        </div>
        
      </div>
    </footer>
  );
}
