const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapsController = require('../controllers/maps.controller');
const { query } = require('express-validator');

router.get('/address',
    query('address').notEmpty().withMessage('Address is required'),
    authMiddleware.authUser, mapsController.getAddressCoordinate);

router.get('/distance', 
    query('origin').notEmpty().withMessage('Origin is required'),
    query('destination').notEmpty().withMessage('Destination is required'),
    authMiddleware.authUser, mapsController.getDistanceAndTime);

router.get('/suggestions',
    query('input').isString().isLength({min : 3}),
    authMiddleware.authUser, mapsController.getAddressSuggestions);

module.exports = router;