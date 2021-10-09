const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');

const MemberCtrl = require('../controllers/member');

//Creer un membre
router.post('/create', MemberCtrl.create);

//Afficher tous les membres
router.get('/getAll',MemberCtrl.listAll);

//Afficher un membre
router.get('/getOne/:id',MemberCtrl.getOne);

//afficher tous les projets aux quelles le membre participent

router.get('/allproject/:id',MemberCtrl.getAllMemberProject)

//all projet and member

router.get('/allproject',MemberCtrl.getAllMemberP)

//Mettre à jour un membre
router.put('/:id',MemberCtrl.update);

//Supprimer un membre
router.delete('/:id',MemberCtrl.del);


module.exports = router;