const database = require('../models');

class MatriculaController {

  static async listarMatriculas(req, res){
    try{
      const matriculas = await database.Matriculas.findAll({
        
      });
      return res.status(200).json(matriculas);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarMatriculaPorId(req, res){
    let id = req.params.id;
    try{
      const matricula = await database.Matriculas.findOne({ where: {id: Number(id)}}, {
        include: [
          {
            model: database.Turmas,
            attributes: ['descricao']
          },
          {
            model: database.Alunos,
            attributes: ['nome']
          }
        ]
      })
      return res.status(200).json(matricula);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirMatricula(req, res){
    let id = req.params.id;
    try{
      const matricula = await database.Matriculas.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `matricula de Id ${id} deletado`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarMatricula(req, res){
    const novaMatricula = req.body;
    try{
      const matricula = await database.Matriculas.create(novaMatricula);
      return res.status(201).json(matricula);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarMatricula(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Matriculas.update(infos, 
        { where: {id: Number(id)}}
      );
      const matriculaAtualizada = await database.Matriculas.findOne({ where: {id: Number(id)}}, {
        include: [
          {
            model: database.Turmas,
            attributes: ['descricao']
          },
          {
            model: database.Alunos,
            attributes: ['nome']
          }
        ]
      })
      return res.status(200).json(matriculaAtualizada);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = MatriculaController;
