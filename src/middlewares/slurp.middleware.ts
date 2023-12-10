import { facadeService } from "@/services";
import { type Express } from "express";
export default function registerSlurpMiddleware(instance: Express) {
  instance.post("/slurp/junit", ({ body, query }, res) => {
    const q = query as Record<string, string>;
    facadeService.parseJunit(body, q);
    res.status(202).send();
  });
}
