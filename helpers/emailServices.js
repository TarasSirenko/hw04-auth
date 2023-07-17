const sendEmailCopnfig = async (email, verificationToken) => {
    return {
      to: email,
      from: "tarassirenko71@gmail.com",
      subject: "Test email confirmation at login",
      text: `Follow the <a href="http://localhost:3030/api/users/verify/${verificationToken}">link</a> to confirm your registration.`,
      html: `Follow the <a href="http://localhost:3030/api/users/verify/${verificationToken}">link</a> to confirm your registration.`,
    };
};

module.exports = {
  sendEmailCopnfig,
};
