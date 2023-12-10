import { type Express } from "express";
export default function registerHealthMiddleware(instance: Express) {
  instance.get("/health", (_, res) => {
    res.status(200).send("ok");
  });
}
