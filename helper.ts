import Consul from 'consul'

export enum APP_SERVICE {
  author = 'author-service',
  book = 'author-service'
}

const consulClient = new Consul({ host: 'localhost', port: '8500' })

export async function discoverService(name: APP_SERVICE) {
  const serviceObj = await consulClient.agent.services() as Record<string, string | number>

  if (serviceObj[name]) {
    return serviceObj[name]
  } 

  throw new Error('Service not found.')
}

export async function writeToServiceRegistry(): Promise<Error | null> {

  const serviceName = process.env.SERVICE_NAME || APP_SERVICE.book
  const host = process.env.HOST || 'localhost'
  const port = process.env.PORT || 3001

  const options: Consul.Agent.Service.RegisterOptions = {
    name: serviceName,
    port: Number(port),
    address: host,
    check: {
      http: `http://host.docker.internal:${port}/health`, // Add health check endpoint
      interval: '10s',
    },
  }

  try {
    await consulClient.agent.service.register(options)
    return null

  } catch (error) {
    console.log(error)
    throw new Error("Cannot register service")
  }
  
}