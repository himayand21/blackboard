import React, {useState} from 'react';

import deleteSVG from '../../assets/delete.svg';
import noteSVG from '../../assets/note.svg';
import organiseSVG from '../../assets/organise.svg';
import pinSVG from '../../assets/pin.svg';
import shareSVG from '../../assets/share.svg';
import shareLinkSVG from '../../assets/share_link.svg';
import thoughtsSVG from '../../assets/thoughts.svg';
import codeSVG from '../../assets/code.svg';

const EMAIL_ID = 'solutions.blackboard@gmail.com';

const boxes = [
    {
        image: thoughtsSVG,
        message: 'We come across a million ideas a day. But more often than not, they go unnoticed. And what could have been a disrupting vision, only becomes something you once thought was possible.'
    },
    {
        image: noteSVG,
        message: 'Introducing Blackboard - here you can pen down your thoughts using our rich text editor. Be it a tasklist or a class essay, our editor can cater to all your needs seamlessly.'
    },
    {
        image: organiseSVG,
        message: 'A lot of notes can be messy. Which is why you can assign them to specific boards, so that you never lose a thing.'
    },
    {
        image: pinSVG,
        message: 'Priority is key. Keeping that in mind, every note comes with a pin option to put it right on top of your dashboard.'
    },
    {
        image: deleteSVG,
        message: `Don't like your note? Delete and you will never have to see it again.`
    },
    {
        image: shareSVG,
        message: 'Share your thoughts with other Blackboard users and get their feedback in the comments section.'
    },
    {
        image: shareLinkSVG,
        message: 'You can also choose to generate a link to your note by making it public to all Blackboard users.'
    },
    {
        image: codeSVG,
        message: (
            <span>This project is open sourced in
                <a href="https://github.com/himayand21/blackboard" target="_blank" rel="noreferrer">Github.</a>
                If you love what we do, drop us a star. For any query regarding the application, mail us at
                <a href={`mailto:${EMAIL_ID}`} target="_blank" rel="noreferrer">{EMAIL_ID}</a>
            </span>
        )
    }
];

export const Tour = () => {
    const [selected, setSelected] = useState(0);
    return (
        <div className="tour-box">
            <div className="tour-left-button">
                {(selected === 0) ? null : (
                    <span
                        className="standard-interactive"
                        onClick={() => setSelected(selected - 1)}
                    >
                        <i className="fas fa-chevron-left" />
                    </span>
                )}
            </div>
            {boxes.map((each, index) => {
                return (
                    <div
                        className="tour-box-image-wrapper"
                        key={`tour-image-${index}`}
                        style={{display: selected === index ? 'block' : 'none'}}
                    >
                        <img
                            src={each.image}
                            className="tour-box-image"
                        />
                        <div className="tour-box-message">
                            {each.message}
                        </div>
                        <div className="tour-box-footer">
                            Illustrations by
                            <a
                                href="https://undraw.co"
                                target="_blank"
                                rel="noreferrer"
                            >
                                undraw.co
                            </a>
                        </div>
                    </div>
                );
            })}
            <div className="tour-right-button">
                {selected === (boxes.length - 1) ? null : (
                    <span
                        className="standard-interactive"
                        onClick={() => setSelected(selected + 1)}
                    >
                        <i className="fas fa-chevron-right" />
                    </span>
                )}
            </div>
        </div>
    );
};