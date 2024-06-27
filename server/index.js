import express from "express";
import Stripe from "stripe";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = 6000;

const PUBLISHER_KEY =
  "pk_test_51ORDKNSIlpWRSFlR5pJArLeINJcVRLCT6o5LBS9PWmS3HUYF4sUE1xIHYrFDbRsaGJXZcvnuiTqitgn26cp7hSfe00VT3AMWC1";

const SECRET_KEY =
  "sk_test_51ORDKNSIlpWRSFlRPShCSjzfohDP32IWukAEvuujm6DHmeW2OR7103j7JR7A4DD5Eh09pX5KtnHrV60pwulcpzWY00znxH6v9B";
const stripe = Stripe(SECRET_KEY, { apiVersion: "2023-10-16" });

app.use(
  cors({
    // Configure for your specific frontend, '*' allows all origins
    origin: "*",
  })
);
app.use(morgan("dev"));
app.post("/create-payment-intent", async (req, res) => {
  try {
    console.log("Point Hit");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "usd",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`App is Listening at http://localhost:${port}`);
});
