const jwt = require('jsonwebtoken');
const download = require('image-downloader');
const sharp = require('sharp');
const jsonPatch = require('fast-json-patch');

// login request
exports.login = (req, res) => {
    try {
        // get the username and password from the request body
        const { username, password } = req.body;
        if (!username) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide username',
                code: 400
            });
        }

        if (!password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide password',
                code: 400
            });
        }

        // log the user in and sign a jwt to the user
        const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        return res.status(200).json({
            status: 'success',
            message: 'Logged in',
            token,
            code: 200
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'an error occured!',
            code: 500
        });
    }
}

// patch json object request
exports.patchJsonObject = (req, res, next) => {
    try {
        const { firstName, lastName, contactNumber, replacePath, replaceValue} = req.body;

        // validation
        if (!firstName || !lastName || !contactNumber || !replacePath || !replaceValue) {
            return res.status(400).json({
                status: 'fail',
                message: 'All fields are required',
                code: 400
            })
        }

        // patched object to be updated
        let jsonObject = {
            firstName: firstName,
            lastName: lastName,
            contactNumber: contactNumber
        };

        let patchObject = [
            {
                op: "replace",
                path: replacePath,
                value: replaceValue
            }
        ]

        // apply patch to update
        jsonObject = jsonPatch.applyPatch(jsonObject, patchObject).newDocument;

        return res.status(200).json({
            status: 'success',
            message: 'Object successfully patched',
            data: {
                jsonObject
            },
            code: 200
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'an error occured',
            code: 500
        })
    }
}

// create thumbnail request
exports.createThumbnail = async (req, res, next) => {
    try {
        const { uri } = req.body;
        if (!uri) {
            return res.status(400).json({
                status: 'fail',
                message: 'uri field is required',
                code: 400
            })
        }
        if (!uri.startsWith('https://')) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid uri.',
                code: 400
            })
        }
        
        const option = {
            url: uri,
            dest: './public/downloaded-images/'
        }
        
        const downloaded_image = await download.image(option);
        const file = downloaded_image.filename;
        const image_ext = file.split(".")[1]
        const resizedPath = './public/resized-images/';
        const resized_image = await sharp(file).resize(50, 50).toFile(`${resizedPath}output-${Date.now()}.${image_ext}`);

        return res.status(200).json({
            status: 'success',
            message: 'Image successfully downloaded and resized.',
            data: {
                resized_image
            },
            code: 200
        })
        

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'an error occured',
            code: 500
        })
    }
}