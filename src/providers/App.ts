import Express from "./Express"


class App {

    public loadServer(): void {
        console.log("server is running...");
        Express.init();
    }
   
}

export default new App()