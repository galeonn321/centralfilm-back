const { Router } = require('express');
const router = Router();

console.log(router)


router.get('/', (req, res) => {
    res.json({
        ok: true,
    })
})

module.exports = router;