import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import * as http from 'http'

export default {
    method: 'get',
    path: '/api/weather',
    validators: [],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                // Specify the API endpoint and the parameters
                const params = {
                    host: 'api.open-meteo.com',
                    port: 80,
                    path: '/v1/forecast?latitude=52.41&longitude=16.93&hourly=temperature_2m',
                    method: 'GET',
                }

                // Make an HTTP request
                return await httpRequest(params).then(function (body: any) {
                    // Map the time and temperature arrays to an object
                    const mapArrays = (arr1 = [], arr2 = []) => {
                        const res = arr1.reduce((acc, elem, index) => {
                            acc[elem] = arr2[index]
                            return acc
                        }, {})
                        return res
                    }
                    return mapArrays(
                        body.hourly.time,
                        body.hourly.temperature_2m,
                    )
                })
            },
        }),
} as TRoute

function httpRequest(params: any, postData = null) {
    return new Promise(function (resolve, reject) {
        const req = http.request(params, function (res) {
            // Store each chunk of data in an array
            let body: any[] = []
            res.on('data', function (chunk) {
                body.push(chunk)
            })
            // Join the chunks together and parse them as JSON
            res.on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString())
                } catch (e) {
                    reject(e)
                }
                resolve(body)
            })
        })
        req.on('error', function (err) {
            reject(err)
        })
        if (postData) {
            req.write(postData)
        }

        req.end()
    })
}
