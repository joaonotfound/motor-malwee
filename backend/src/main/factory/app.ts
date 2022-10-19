import * as express from 'express'

export const makeApp = (): express.Application => {
    return express()
}