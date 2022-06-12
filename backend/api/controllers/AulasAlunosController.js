const database = require('../models');

class AulasAlunosController {

  static async listarAulaAluno(req, res){
    let { alunoId, aulaId } = req.params;
    try{
      const aulaAluno = await database.Aulas_alunos.findOne({ 
        where: 
        {
          idAula: Number(aulaId),
          idAluno: Number(alunoId),
        }
      })
      return res.status(200).json(aulaAluno);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirAulaAluno(req, res){
    let { alunoId, aulaId } = req.params;

    try{
      await database.Aulas_alunos.destroy({ 
        where: 
        {
          idAula: Number(aulaId),
          idAluno: Number(alunoId),
        }
      })
      return res.status(200).send({message: `Registro de Aula de id ${aulaId} - Aluno Id ${alunoId} deletado`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarAulaAluno(req, res){
    const { alunoId, aulaId } = req.params;
    const novoAulaAluno = { ...req.body,idAula: Number(aulaId), idAluno: Number(alunoId) };

    try{
      const aulaAluno = await database.Aulas_alunos.create(novoAulaAluno);
      return res.status(201).json(aulaAluno);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }


  static async atualizarAulaAluno(req, res){
    const {alunoId, aulaId } = req.params;
    const infos = req.body;

    try{
      await database.Aulas_alunos.update(infos, { 
        where: 
        {
          idAula: Number(aulaId),
          idAluno: Number(alunoId),
        }
      }
      );
      const aulaAlunoAtualizado = await database.Aulas_alunos.findOne({ 
        where: 
        {
          idAula: Number(aulaId),
          idAluno: Number(alunoId),
        }
      });
      return res.status(200).json(aulaAlunoAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

}

module.exports = AulasAlunosController;
