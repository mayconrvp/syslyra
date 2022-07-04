const database = require('../models');

class AulaController {

  static async listarAulas(req, res){
    try{
      const avaliacoes = await database.Aulas.findAll({
        include: {
          model: database.Turmas,
          attributes: ['id','descricao']
        }
      });
      return res.status(200).json(avaliacoes);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  // static async listarAulaPorId(req, res){
  //   let id = req.params.id;
  //   try{
  //     const aula = await database.Aulas.findOne({ 
  //       where: 
  //       {
  //         id: Number(id)
  //       },
  //       include: {
  //         model: database.Turmas,
  //         attributes: ['descricao']
  //       }
  //     })
  //     return res.status(200).json(aula);
  //   }catch(err){
  //     return res.status(500).json(err.message);
  //   }
  // }

  static async listarAulasPorTurma(req, res){
    let { turmaId } = req.params;

    try{
      const aulas = await database.Aulas.findAll({ 
        where: 
        {
          idTurma: Number(turmaId)
        },
        include: {
          model: database.Turmas,
          attributes: ['id','descricao']
        }
      })
      return res.status(200).json(aulas);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarAulaPorTurma(req, res){
    let { aulaId, turmaId } = req.params;

    try{
      const aula = await database.Aulas.findAll({ 
        where: 
        {
          id: Number(aulaId),
          idTurma: Number(turmaId),
        },
        include: {
          model: database.Turmas,
          attributes: ['id','descricao']
        }
      })
      return res.status(200).json(aula);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarAulaTurma(req, res){
    const { turmaId } = req.params;
    const novaAula = { ...req.body, idTurma: Number(turmaId)}

    try{
      const aulaCriada = await database.Aulas.create(novaAula);
      return res.status(201).json(aulaCriada);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirAula(req, res){
    let { aulaId, turmaId } = req.params;
    try{
      await database.Aulas.destroy({ where: 
        {
          id: Number(aulaId),
          idTurma: Number(turmaId)
        }
      })
      return res.status(200).send({message: `Aula de Id ${aulaId} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarAula(req, res){
    const {turmaId, aulaId } = req.params;
    const infos = req.body;

    try{
      await database.Aulas.update(infos, { 
        where: {
          id: Number(aulaId),
          idTurma: Number(turmaId)
        }
      }
      );
      const aulaAtualizada = await database.Aulas.findOne(
        { 
          where: {
            id: Number(aulaId)
          },
        }
      );
      return res.status(200).json(aulaAtualizada);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = AulaController;
