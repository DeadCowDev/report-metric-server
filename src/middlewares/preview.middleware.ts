import { type Express } from "express";
export default function registerPreviewMiddleware(instance: Express) {
  instance.post("/preview", ({ body }, res) => {
    return res.send(body || {});
  });
}
