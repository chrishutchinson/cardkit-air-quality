// Import CardKit
const CardKit = require('cardkit');
const CardKitServer = require('cardkit/server');
const fs = require('fs');

// Import configuration
const configuration = require('./configuration/main');

// Initialise with our configuration
const cardkit = new CardKit(configuration);

// Initialise renderer
const renderer = new CardKitServer(cardkit);

// Render to an image
renderer.renderToImage(2)
        .then((image) => {
          fs.writeFile('./index.html', `<html>
            <head>
              <style>
                img {
                  max-width: 100%;
                  border: 1px solid #333;
                }
              </style>
            </head>
            <body>
              <img src="data:image/png;base64,${image}" />
            </body>
            </html>`, err => {
            if(err) {
              throw err;
            }

            console.log('The file was saved!');
            process.exit();
          });
        })
        .catch((e) => {
          console.log('[ERR]', e);
          process.exit();
        });
