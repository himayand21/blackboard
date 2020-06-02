const nodemailer = require('nodemailer');
const router = require('express').Router();

function sendOTP(User) {
    return router.post('/send-otp', (req, res) => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        try {
            const {body} = req;
            const bodyKeys = Object.keys(body);
            if (!bodyKeys.includes('id')) {
                res.status(400).send({
                    error: {
                        status: 400,
                        message: 'Missing user ID in request.',
                        key: 'missing_id_key'
                    }
                });
            } else {
                const {id} = body;
                User.findById(id, 'email verified', (err, user) => {
                    if (!user) {
                        res.status(401).send({
                            error: {
                                status: 401,
                                message: 'Email is not registered.',
                                key: 'email_not_registered'
                            }
                        });
                    } else {
                        User.findByIdAndUpdate(id, {otp, verified: false}, {'new': true}, async (err, updatedUser) => {
                            if (err) {
                                res.status(500).send({
                                    error: {
                                        key: 'server_error',
                                        message: 'Some error occured.',
                                        status: 500
                                    }
                                });
                            } else {
                                const transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: process.env.BLACKBOARD_EMAIL,
                                        pass: process.env.BLACKBOARD_PASS
                                    }
                                });
                                transporter.sendMail({
                                    from: `"Blackboard Solutions" <${process.env.BLACKBOARD_EMAIL}>`,
                                    to: updatedUser.email,
                                    subject: 'Verify your Email Address',
                                    text: 'Verify your Email Address',
                                    html: `<div>
                                    <h3>Well, you can never be too careful.</h3>
                                    <p>Enter this OTP and verify your registered email address.</p>
                                    <h2>${otp}</h2>
                                    <p>Feel free to contact us right <a href="mailto:${process.env.BLACKBOARD_EMAIL}">here</a>, if you face any further issues.</p>
                                    <p>See you around.</p>
                                    <p><b>Team Blackboard</b></p>
                                    </div>`,
                                }, (err) => {
                                    if (err) {
                                        res.status(400).send({
                                            key: 'email_invalid',
                                            message: 'Failed to send OTP to email address.',
                                            status: 400
                                        });
                                    } else {
                                        res.status(200).send({
                                            user: {
                                                email: updatedUser.email,
                                                // eslint-disable-next-line no-underscore-dangle
                                                id: updatedUser._id,
                                                verified: updatedUser.verified
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        } catch (error) {
            res.status(500).send({
                error: {
                    key: 'server_error',
                    message: 'Some error occured.',
                    status: 500
                }
            });
        }
    });
}

module.exports = sendOTP;