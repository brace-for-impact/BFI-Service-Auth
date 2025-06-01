import shared from "@brace-for-impact/bfi-shared";
let intervalId: NodeJS.Timeout | null = null;

const publishHealth = () => {
  if (!intervalId) {
    console.log("Starting health publishing...");
    intervalId = setInterval(async() => {
      const key = "health_status";
      const value = JSON.stringify({
        healthStatus: "Auth server is healthy",
        apiRequestPerSecond:
          shared.middlewares.requestCounterService.getRequestsPerSecond(),
        docker_info:
          await shared.services.dockerServices.services?.getContainerServices({
            networkName: "bfi-infrastructure_bfi-dev-net",
          }),
      });
      shared.services.kafkaServices.send({
        topic: "monitor-events",
        messages: [{ key, value }],
      });
    }, 1000);
  }
};      
export default publishHealth;
