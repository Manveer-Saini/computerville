const PartControllers = require("../controllers/part.controllers");

module.exports= (app) => {
    app.get('/api/parts', PartControllers.getAllParts);
    app.post('/api/parts', PartControllers.createPart) ;
    app.post('/api/parts/cpu', PartControllers.getAllCpu);
    app.post('/api/parts/gpu', PartControllers.getAllGpu);
    app.post('/api/parts/memory', PartControllers.getAllMemory);
}