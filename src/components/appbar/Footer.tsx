import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="flex justify-center items-center text-white text-base font-semibold min-h-[5vh] bg-[#1E1E1E] py-5">
      <Link to={'https://icn-filkom.ub.ac.id'}>&#169;2023 All Rights Reserved ICN-FILKOM</Link>
    </footer>
  );
};

export default Footer;
