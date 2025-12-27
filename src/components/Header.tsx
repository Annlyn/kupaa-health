export default function Header() {
  return (
    <header className="bg-quinary text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Gokul</div>
          <ul className="flex space-x-8">
            <li>
              <a href="#home" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#interests" className="hover:text-primary transition-colors">
                Passions
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-primary transition-colors">
                What I Do
              </a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-primary transition-colors">
                Journey
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary transition-colors">
                Connect
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
