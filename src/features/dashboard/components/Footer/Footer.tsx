import styels from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styels.container}>
      <div className={styels.logo}>ProfCast</div>
      <div className={styels.text}>@ All rights reserved</div>
    </div>
  );
};

export default Footer;
