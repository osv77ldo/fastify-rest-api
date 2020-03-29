
const {SENDGRID_API_KEY, EMAIL_TO_RECIPIENT } = require('../config/index.js');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = class Sendgrid {

  static send(params) {
    return new Promise((resolve, reject) => {
      return sgMail.send({
        from: 'Fastify API <todofastifyapi@mail.com>',
        to: EMAIL_TO_RECIPIENT,
        subject: `Notification of ${params.action} from Fastify-API`,
        html: `Action <strong>${params.action}</strong> was made on task ${params.oldTask.title}, the new value is <strong>${params.newTask.title}!</strong>`,
      }).then(resolve).catch(reject);
    });
  }

}