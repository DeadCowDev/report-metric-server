import { facadeService } from "@/services";
import { type Express } from "express";
export default function registerMetricsMiddleware(instance: Express) {
  instance.get("/metrics/prometheus", (_, res) => {
    res.send(facadeService.toPrometheus());
  });
  instance.get("/metrics/json", (_, res) => {
    res.type("json").send(facadeService.toJson());
  });
}
