const express = require("express");
const { logInteraction, fetchAllInteractions, detailInteractionsUser } = require("../../controllers/recommend-system/InteractionLog-controller");

const router = express.Router();

router.post('/interact/:userId/:productId', logInteraction);
router.get('/all', fetchAllInteractions);
router.get('/detail/:userId', detailInteractionsUser);

module.exports = router;