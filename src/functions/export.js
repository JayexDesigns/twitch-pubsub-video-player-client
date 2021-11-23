const fs = require('fs');
const path = require('path');

const gFuncs = require('./general');

const eFuncs = {
    async createExportFolders() {
        if (!fs.existsSync('./out')) fs.mkdirSync('./out');
        if (!fs.existsSync('./out/css')) fs.mkdirSync('./out/css');
        if (!fs.existsSync('./out/js')) fs.mkdirSync('./out/js');
    },



    async createIndexFile(outFolder) {
        fs.writeFileSync(path.join(outFolder, "./index.html"), `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<link rel="stylesheet" href="css/style.css">\n\t<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">\n\t<title>Fusive Plugin</title>\n</head>\n<body onload="bodyLoaded()">\n\t<script src="js/config.js"></script>\n\t<script src="https://fusive.github.io/client/plugin/plugin.js" crossorigin="anonymous"></script>\n\t<script src="js/assets.js"></script>\n</body>\n</html>`);
    },



    async createStyleFile(outFolder) {
        fs.writeFileSync(path.join(outFolder, "./css/style.css"), `body, body * {\n\tmargin: 0;\n\tpadding: 0;\n\tfont-family: 'Montserrat', arial;\n}\n\nbody {\n\toverflow: hidden;\n}\n\nvideo, img {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\twidth: 100vw;\n\theight: 100vh;\n}\n\nimg {\n\tobject-fit: contain;\n}\n\nh1 {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n}\n\n#auth-invalid {\n\tcolor: #ff0000;\n}`);
    },



    async createAssetsFile(outFolder, assets) {
        let fileText = "";
        for (let i = 0; i < assets.length; ++i) {
            switch (assets[i]['type']) {
                case "Video":
                    fileText += "new socketVideo(\n\t";
                    break;
                case "Image/Gif":
                    fileText += "new socketImage(\n\t";
                    break;
                case "Audio":
                    fileText += "new socketAudio(\n\t";
                    break;
                case "Voice":
                    fileText += "new socketVoice(\n\t";
                    break;
            }

            fileText += `title = "${assets[i]['title']}",\n\t`;

            if (assets[i]['type'] === "Video" || assets[i]['type'] === "Image/Gif" || assets[i]['type'] === "Audio") {
                fileText += `asset = "${assets[i]['id']}.${assets[i]['assetName'].substr(assets[i]['assetName'].length-3,3)}",\n\t`;
            }
            else if (assets[i]['type'] === "Voice") {
                if (assets[i]['text'] !== null) {
                    fileText += `asset = "${assets[i]['text']}",\n\t`;
                }
                else {
                    fileText += `asset = ${assets[i]['text']},\n\t`;
                }
            }

            fileText += `duration = ${assets[i]['duration']},\n\t`;

            if (assets[i]['type'] === "Video" || assets[i]['type'] === "Audio" || assets[i]['type'] === "Voice") {
                fileText += `volume = ${(assets[i]['volume']/100).toFixed(3)},\n\t`;
            }

            if (assets[i]['type'] === "Video" || assets[i]['type'] === "Image/Gif" || assets[i]['type'] === "Audio") {
                fileText += `local = ${assets[i]['local']}\n`;
            }
            else if (assets[i]['type'] === "Voice") {
                fileText += `voice = "${assets[i]['voice']}",\n\t`;
                fileText += `userText = ${assets[i]['userText']}\n`;
            }

            fileText += ");\n\n";
        }

        fs.writeFileSync(path.join(outFolder, "./js/assets.js"), fileText);
    },



    async createConfigFile(outFolder, config) {
        fs.writeFileSync(path.join(outFolder, "./js/config.js"), `var authCode = '${config['accessToken']}';\nvar channelId = '${config['clientId']}';\nvar twitchUsername = '${config['twitchUsername']}';\nvar appVersion = '${config['appVersion']}'`);
    },
}

module.exports = eFuncs;