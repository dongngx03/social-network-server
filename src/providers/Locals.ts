import dotenv from "dotenv"

class Locals {
    public static config(): any {
        dotenv.config();

        const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
        const port = process.env.PORT || 6666;
        const url_client = process.env.URL_CLIENT;
        const isCORSEnabled = process.env.isCORSEnabled

        return {
            url,
            port,
            url_client,
            isCORSEnabled
        }
    }
}

export default Locals