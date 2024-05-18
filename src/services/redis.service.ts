import Redis from "../providers/Redis";

type IIsOkey = (args: any) => any
type IIsError = (args: any) => any

class RedisService {
    public static async setPromise(key: string, value: any) {
        try {
            return new Promise((isOkey: IIsOkey, isError: IIsError) => {
                // set value 
                Redis.redis.set(key, value, (err: any, rs: any) => {
                    return !err ? isOkey(rs) : isError(err)
                })
            })
        } catch (error) {

        }
    }

    public static async getPromise(key: string) {
        try {
            return new Promise((isOkey: IIsOkey, isError: IIsError) => {
                // get value 
                Redis.redis.get(key, (err: any, rs: any) => {
                    return !err ? isOkey(rs) : isError(err)
                })
            })
        } catch (error) {

        }
    }

    public static async deletePromise(key: string) {
        try {
            return new Promise((isOkey: IIsOkey, isError: IIsError) => {
                // get value 
                Redis.redis.del(key, (err: any, rs: any) => {
                    return !err ? isOkey(rs) : isError(err)
                })
            })
        } catch (error) {

        }
    }


}

export default RedisService