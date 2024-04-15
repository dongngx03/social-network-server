import cluster from 'cluster';
import os from 'os';
import App from './providers/App';


if (cluster.isMaster) {
    const CPUS: any = os.cpus();

    CPUS.forEach(() => cluster.fork());


} else {

    App.loadServer();

}
