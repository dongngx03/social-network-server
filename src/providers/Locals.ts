import dotenv from "dotenv"

class Locals {
    public static config(): any {
        dotenv.config();

        const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
        const port = process.env.PORT || 6666;
        const url_client = process.env.URL_CLIENT;
        const isCORSEnabled = process.env.isCORSEnabled
        const google_client_id = process.env.GOOGLE_CLIENT_ID
        const google_client_secret = process.env.GOOGLE_CLIENT_SECRET
        const session_secret = process.env.SESSION_SECRET
        const callback_url = process.env.CALLBACK_URL   
        const redis_url = process.env.REDIS_URL

        return {
            url,
            port,
            url_client,
            isCORSEnabled,
            google_client_id,
            google_client_secret,
            session_secret,
            callback_url,
            redis_url
        }
    }
}

export default Locals