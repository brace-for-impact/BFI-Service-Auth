import { config } from "./config";
import shared from "@brace-for-impact/bfi-shared";
import publishHealth from "./helpers/healthPublisher";
import app from "./app";
const port=config.port

const startServer = async () => {
    await shared.services.dockerServices.bootDockerServices()
    await shared.services.kafkaServices.initKafka({
        brokers: [`${config.SERVICE_NAME_KAFKA}:${config.KAFKA_CONTAINER_PORT}`],
        clientId: config?.clientId,
        groupId: 'group-service-metrics'
    })
    publishHealth()
    app.listen(port,()=>console.log(`Gateway Service running in ${port}`))
}

startServer()

app.listen(port,()=>console.log(`Auth Service running in ${port}`))