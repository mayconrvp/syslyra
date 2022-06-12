const database = require('../models');

class AulaController {

  static async listarAulas(req, res){
    try{
      const avaliacoes = await database.Aulas.findAll({
        include: {
          model: database.Turmas,
          attributes: ['descricao']
        }
      });
      return res.status(200).json(avaliacoes);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarAulaPorId(req, res){
    let id = req.params.id;
    try{
      const aula = await database.Aulas.findOne({ 
        where: 
        {
          id: Number(id)
        },
        include: {
          model: database.Turmas,
          attributes: ['descricao']
        }
      })
      return res.status(200).json(aula);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirAula(req, res){
    let id = req.params.id;
    try{
      await database.Aulas.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `Aula de Id ${id} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarAula(req, res){
    const novaAula = req.body;
    try{
      const aula = await database.Aulas.create(novaAula);
      return res.status(201).json(aula);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarAula(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Aulas.update(infos, 
        { where: {id: Number(id)}}
      );
      const aulaAtualizada = await database.Aulas.findOne({ 
        where: 
        {
          id: Number(id)
        },
        include: {
          model: database.Turmas,
          attributes: ['descricao']
        }
      })
      return res.status(200).json(aulaAtualizada);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = AulaController;
