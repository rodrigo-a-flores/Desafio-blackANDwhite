const express = require('express');
const router = express.Router();
const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

router.post('/send', async (req, res) => {
    const imageUrl = req.body.imageUrl;
    if (!imageUrl) {
        return res.status(400).send('La URL de la imagen es requerida');
    }
    try {
        Jimp.read(imageUrl)
            .then(image => {
                const imageName = `${uuidv4()}.jpg`;
                const imagePath = path.join('../public', 'assets', 'img', imageName);
                console.log(imagePath);
                image
                    .greyscale()
                    .resize(350, Jimp.AUTO)
                    .writeAsync(path.join(__dirname, imagePath))
                    .then(() => {
                        res.redirect(`/assets/img/${imageName}`);
                    })
                    .catch(err => {
                        console.error('Error al guardar la imagen:', err);
                        res.status(500).send('Error al guardar la imagen.');
                    });
            })
            .catch(err => {
                console.error('Error al cargar la imagen desde la URL:', err);
                res.status(500).send('Error al cargar la imagen desde la URL.');
            });
    } catch (error) {
        console.error('Error procesando la imagen:', error);
        res.status(500).send('Error procesando la imagen.');
    }
});

module.exports = router;