import React from 'react';

export const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-name">Made with<i className="fa fa-heart" />by Himayan © 2020</div>
            <div className="footer-social">
                <a
                    className="animate-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/himayand21"
                >
                    <i className="fa fa-github" />
                </a>
                <a
                    className="animate-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/Himayan7"
                >
                    <i className="fa fa-twitter" />
                </a>
                <a
                    className="animate-3"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/himayan-debnath"
                >
                    <i className="fa fa-linkedin" />
                </a>
            </div>
        </footer>
    );
};