import { TServerConfig } from './server'
export type TEnv = 'production' | 'test' | 'development'
export type TConfig = {
    env: TEnv
    server: TServerConfig
}
const env = (process.env.NODE_ENV || 'production') as TEnv
const API_PORT = 3000
export const config: TConfig = {
    env,
    server: {
        port: API_PORT,
        corsOptions:
            env === 'development' ? { origin: 'localhost:' + API_PORT } : {},
        limiter: {
            time: 15 * 60 * 1000,
            max: 250,
        },
    },
}
