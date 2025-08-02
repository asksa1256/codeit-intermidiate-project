'use client';
import { motion } from 'framer-motion';

const variant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  return (
    <motion.footer
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3 }}
      variants={variant}
      className='flex items-center justify-center text-md text-gray-500 mb-10 bg-transparent'
    >
      코드잇 파트3 3팀 중급 프로젝트 - tadak
    </motion.footer>
  );
};

export default Footer;
