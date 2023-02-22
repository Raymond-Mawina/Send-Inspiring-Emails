require("dotenv").config();
const { quotes } = require("./quotes");
const { transporter } = require("./config");

const randomNumber = Math.floor(Math.random() * quotes.length);

function sendEmail(recepients) {
  transporter.sendMail(
    {
      from: process.env.SMTP_LOGIN,
      to: recepients,
      subject: "Inspiration quote of the day",
      text: `${quotes[randomNumber].quote} - ${quotes[randomNumber].author}`,
      html:
        "<b>" +
        quotes[randomNumber].quote +
        " - " +
        quotes[randomNumber].author +
        "</b>",
    },
    function (error) {
      if (error) {
        throw new Error("Email was not sent due to error", { cause: error });
      } else {
        console.log("Email Successfully sent");
      }
    }
  );
}

if (process.argv.length > 2) {
  sendEmail(process.argv.slice(2).toString());
}

module.exports = { sendEmail, randomNumber };
