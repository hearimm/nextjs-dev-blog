import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center p-4">
      <div className="flex gap-4">
        <a href="https://www.linkedin.com/in/hyuk-choi/" className="text-gray-400 hover:text-gray-300">
          <FaLinkedin size={24} />
        </a>
        <a href="https://github.com/hearimm" className="text-gray-400 hover:text-gray-300">
          <FaGithub size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-300">
          <SiNotion size={24} />
        </a>
      </div>
      <p className="mt-4 text-gray-600">
        © {new Date().getFullYear()} 그냥개발자. All rights reserved.
      </p>
    </footer>
  );
};
