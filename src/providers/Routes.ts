import { Application } from "express";

class Routes {
    public mountWeb(_express : Application) : Application {
        console.log('Routes :: Mounting Web Routes...');

        _express.post('/', (req, res) => {
            return res.status(200).json({
                mess : req.body
            })
        })

        return _express
        
    }
}

export default new Routes