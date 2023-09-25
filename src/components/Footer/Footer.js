import React from 'react';

const Footer = () => {
  return (
<footer
className="footer">
  <div>
    <p>
      &copy; {new Date().getFullYear()} EcoTrip. All rights reserved.
    </p>
    <ul>
      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </li>
      <li>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </li>
    </ul>
  </div>
</footer>

  );
};

export default Footer;
