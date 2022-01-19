const mdlsCritere = require('../models/Critere');
const fs = require('fs');

module.exports = {
    create:async(req,res)=>{
        try {
            let {difficulte,deadline,impact,implication,point_git}=req.body;
            let newCritere=await mdlsCritere.create(difficulte,deadline,impact,implication,point_git);
            res.status(200).send({
                message:"critere is added successfully"
            });
            
        } catch (error) {
            res.status(500).send(error)
            
        }
        
    },
    listAll: async (req, res) => {
        try {
            let listCritere = await mdlsCritere.getListCritere();
            res.send(listCritere);
            
        } catch (error) {
            res.status(500).send(error);
            
        }
        
    },

    getOne: async(req, res) => {
        try {
            let id = parseInt(req.params.id)
            let critere = await mdlsCritere.getOneCritere(id);
            res.send(critere[0]);
            
        } catch (error) {
            res.status(500).send(error);
            
        }
        
    },
    update:async(req,res)=>{
        try {
            let id = parseInt(req.params.id);
            let {difficulte,deadline,impact,implication,point_git}=req.body;
            let updatedCritere=await mdlsCritere.updateCritere(difficulte,deadline,impact,implication,point_git,id);
            res.send({
                message:"updated successfuly"
            })
            
        } catch (error) {
            res.status(500).send(error)
            
        }
        
    },
    del:async(req,res)=>{
        try {
            let id = parseInt(req.params.id)
        let delCritere=await mdlsCritere.deleteCritere(id);
        res.send({
            message : `Critere with id ${id} is removed`
        })
            
        } catch (error) {
            res.status(500).send(error);

            
        }
        
        
    }

}