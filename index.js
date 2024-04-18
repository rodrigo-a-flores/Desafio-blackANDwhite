const express = require('express');
const app = express();
const router = require('./router/router.js');

const PORT = process.env.PORT ?? 4040;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.disable('x-powered-by');
app.use(router);



app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto http://localhost:${PORT}`);
})