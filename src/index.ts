import Express from "express";
import xmlParser from "express-xml-bodyparser";
import registerHealthMiddleware from "./middlewares/health.middleware";
import registerMetricsMiddleware from "./middlewares/metrics.middleware";
import registerPreviewMiddleware from "./middlewares/preview.middleware";
import registerSlurpMiddleware from "./middlewares/slurp.middleware";
const app = Express();
// Register Plugins
app.use(Express.json());
app.use(xmlParser());

// Add routes
registerHealthMiddleware(app);
registerPreviewMiddleware(app);
registerMetricsMiddleware(app);
registerSlurpMiddleware(app);

// parse port and start server
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen({ port: PORT }, () => {
  console.log(`Server listening on port ${PORT}`);
});
