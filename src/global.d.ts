declare namespace NodeJS {
  export interface ProcessEnv {
    SERVER_PORT: string
    SERVER_LOGGER: string

    SECRET_TOKEN: string
    TOKEN_EXP: string
  }
}
