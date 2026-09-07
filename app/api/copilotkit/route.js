import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";

import { BuiltInAgent } from "@copilotkit/runtime/v2";
import { OpenAIAdapter } from "@copilotkit/runtime";

const builtInAgent = new BuiltInAgent({
  model: "openai:gpt-5.4-mini",
});

const runtime = new CopilotRuntime({
  agents: {
    default: builtInAgent,
  },
});

const serviceAdapter = new OpenAIAdapter({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};