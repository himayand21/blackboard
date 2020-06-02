import React from 'react';

export const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-name">Made with<i className="far fa-heart" />by Himayan<i className="far fa-copyright" />2020</div>
            <div className="footer-social">
                <a
                    className="animate-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/himayand21"
                >
                    <i className="fab fa-github" />
                </a>
                <a
                    className="animate-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/Himayan7"
                >
                    <i className="fab fa-twitter" />
                </a>
                <a
                    className="animate-3"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/himayan-debnath"
                >
                    <i className="fab fa-linkedin-in" />
                </a>
            </div>
        </footer>
    );
};