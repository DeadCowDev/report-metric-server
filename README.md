<h1 align="center">Report Metric Server</h1>

## Description

Report Metric Server receives metrics of tests and exports them as metrics.

## Tech Stack

- Node.js
- Express

## Supported Formats

### Inputs

- JUnit XML

### Outputs

- Prometheus
- JSON

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm dev

# build
$ pnpm build

# run the build output
$ pnpm start
```
