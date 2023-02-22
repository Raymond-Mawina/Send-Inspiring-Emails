const { sendEmail, randomNumber } = require("../src/index");
const { transporter } = require("../src/config");
require("dotenv").config();
const { quotes } = require("../src/quotes");

describe("sendEmail", function () {
  beforeEach(function () {
    spyOn(transporter, "sendMail");
  });
  it("should send a single email to one recepient", function () {
    sendEmail("mawina.projects@gmail.com");
    expect(transporter.sendMail).toHaveBeenCalledOnceWith(
      {
        from: process.env.SMTP_LOGIN,
        to: "mawina.projects@gmail.com",
        subject: "Inspiration quote of the day",
        text: `${quotes[randomNumber].quote} - ${quotes[randomNumber].author}`,
        html:
          "<b>" +
          quotes[randomNumber].quote +
          " - " +
          quotes[randomNumber].author +
          "</b>",
      },
      jasmine.anything()
    );
  });

  it("should send a single email to multiple recepients", function () {
    sendEmail("mawina.projects@gmail.com,rmawina@gmail.com");
    expect(transporter.sendMail).toHaveBeenCalledOnceWith(
      {
        from: process.env.SMTP_LOGIN,
        to: "mawina.projects@gmail.com,rmawina@gmail.com",
        subject: "Inspiration quote of the day",
        text: `${quotes[randomNumber].quote} - ${quotes[randomNumber].author}`,
        html:
          "<b>" +
          quotes[randomNumber].quote +
          " - " +
          quotes[randomNumber].author +
          "</b>",
      },
      jasmine.anything()
    );
  });
});
