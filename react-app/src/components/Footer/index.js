import React from 'react';
import './Footer.css'

const Footer = () => {

    return (
        <div className='footer-body-div'>
            <div className='about-menu-label-div'>
                {/* <AboutMenu /> */}
                <div className="about-icons">
                                    <div>About:</div>
                                    <a href="https://github.com/BrandonCope" target="_blank" rel="noopener noreferrer">
                                        <div className="about-github">
                                            <i className="fa-brands fa-github"></i>
                                        </div>
                                    </a>
                                    <a href="https://www.linkedin.com/in/brandoncopeland97/" target="_blank" rel="noopener noreferrer">
                                        <div className="about-linkedin">
                                            <i className="fa-brands fa-linkedin"></i>
                                        </div>
                                    </a>
                                </div>
            </div>
        </div>
    );
}

export default Footer;
