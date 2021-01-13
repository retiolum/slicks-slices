const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function generateOrderEmail(order, total) {
  return `
  <style>
  ul {
      list-style: none;
  }
  img {
      width: 200px;
      height: auto;
  }
  </style>
  <div>
    <h2>Your recent order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
    ${order
      .map(
        (orderItem) => `<li>
    <img src="${orderItem.thumbnail}" alt="${orderItem.name}" />
    ${orderItem.size} ${orderItem.name} – ${orderItem.price}
    </li>`
      )
      .join('')}
    </ul>
    <p>Your total is ${total} due at pickup</p>
    </div>
  `;
}

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Honeypot filled!`,
      }),
    };
  }

  const requiredFields = ['name', 'email', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `${field} is missing`,
        }),
      };
    }
  }

  if (body.order.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Order is missing`,
      }),
    };
  }

  await wait(2000);

  try {
    await transporter.sendMail({
      from: 'Slicks Slices <slick@example.com>',
      to: `${body.name} <${body.email}>`,
      subject: `Your recent order for ${body.total}`,
      html: generateOrderEmail(body.order, body.total),
    });
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: err,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Success',
    }),
  };
};
