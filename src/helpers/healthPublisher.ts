import shared from "@brace-for-impact/bfi-shared";
import { config } from "../config";
let intervalId: NodeJS.Timeout | null = null;

const publishHealth = () => {
  if (!intervalId) {
    console.log("Starting health publishing...");
    intervalId = setInterval(async() => {
      console.log({event: 'sending health to kafka'})
      const value = JSON.stringify({
        healthStatus: "Auth server is healthy",
        clientId: config.clientId,
        apiRequestPerSecond: shared.middlewares.requestCounterService.getRequestsPerSecond(),
        // dockerInfo: await shared.services.dockerServices.services?.getContainerServices({ networkName: "bfi-infrastructure_bfi-dev-net", }),
        dockerInfo: await shared.services.dockerServices.services?.getContainerInfo(),
        nodeInfo: shared.services.nodeServices.getNodeProcessInfo({ requestsPerSecond: 1 }),
        hostInfo: await shared.services.hostServices.getHostInfo(),
      });
      shared.services.kafkaServices.send({
        topic: "service-health",
        messages: [{ key: 'key', value }],
      });
    }, 1000);
  }
};      
export default publishHealth;
