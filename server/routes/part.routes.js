const PartControllers = require("../controllers/part.controllers");

module.exports= (app) => {
    app.get('/api/parts', PartControllers.getAllParts);
    app.post('/api/parts', PartControllers.createPart) ;
    app.get('/api/parts/cpu', PartControllers.getAllCpu);
    app.get('/api/parts/gpu', PartControllers.getAllGpu);
    app.get('/api/parts/memory', PartControllers.getAllMemory);
    app.get('/api/parts/storage', PartControllers.getAllStorage);
    app.get('/api/parts/os', PartControllers.getAllOs);
    app.get('/api/parts/color', PartControllers.getAllColor);
}