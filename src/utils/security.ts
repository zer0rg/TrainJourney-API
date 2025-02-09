import {Request} from 'express'
import { GeoInfo } from '../types'
import { v4 as uuidv4 } from 'uuid'



async function getGeoInfo(ip: string): Promise<GeoInfo>{
    try{
        return await fetch(`http://ip-api.com/json/${ip}`).then(res => res.json())
    } catch (error){
        return {status: 'fail', message: 'Error al obtener la información de la IP', query: ip}
    }
}
 
export async function getRequestData(req: Request){
    const ip = req.ip
    const uag = req.headers['user-agent']
    if(ip === '::1' || ip === '::ffff:' || !ip){
        return {ip, uag, geoInfo: false}
    }
    const info = await getGeoInfo(ip)

    if (info.status === 'fail') return {ip, uag, geoInfo: false}
    return {ip, uag, geoInfo: info}
}

export function generateUuid(aditional: string | null){
    if(!aditional) return uuidv4()
    return `${uuidv4()}_${aditional}`
}