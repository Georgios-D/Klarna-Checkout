import { config } from "dotenv";
config();
import express from "express";
const app = express();

console.log(process.env.PUBLIC_KEY);

process.env;
import { createOrder, retrieveOrder } from "./klarna.js";

const products = [
  { id: "1", name: "Chair", price: 1000 },
  { id: "2", name: "Desk", price: 2000 },
  { id: "3", name: "Table", price: 3000 },
];
app.get("/", (req, res) => {
  res.send(
    products
      .map((product) => `<a href="/p/${product.id}">${product.name}</a>`)
      .join("")
  );
});

app.get("/p/:id", async (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  const data = await createOrder(product);
  res.send(data.html_snippet);
  await createOrder(product);
});

app.get("/confirmation", async (req, res) => {
  const data = await retrieveOrder(req.query.order_id);
  res.send(data.html_snippet);
});

app.listen(3000);
