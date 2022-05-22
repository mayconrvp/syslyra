const database = require('../models');

class EmprestimoController {

  static async listarEmprestimos(req, res){
    try{
      const emprestimos = await database.Emprestimos.findAll({
        include: [
          {
            model: database.Alunos,
            attributes: ['nome']
          },
          {
            model: database.Instrumentos,
            attributes: ['descricao']
          }
        ]
      });
      return res.status(200).json(emprestimos);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarEmprestimoPorId(req, res){
    let id = req.params.id;
    try{
      const emprestimo = await database.Emprestimos.findOne({ 
        where: {
          id: Number(id)
        }, 
        include: [
          {
            model: database.Alunos,
            attributes: ['nome']
          },
          {
            model: database.Instrumentos,
            attributes: ['descricao']
          }
        ]
      })
      return res.status(200).json(emprestimo);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirEmprestimo(req, res){
    let id = req.params.id;
    try{
      const emprestimo = await database.Emprestimos.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `emprestimo de Id ${id} deletado`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarEmprestimo(req, res){
    const novoEmprestimo = req.body;
    try{
      const emprestimo = await database.Emprestimos.create(novoEmprestimo);
      return res.status(201).json(emprestimo);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarEmprestimo(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Emprestimos.update(infos, 
        { where: {id: Number(id)}}
      );
      const emprestimoAtualizado = await database.Emprestimos.findOne({ where: {id: Number(id)}})
      return res.status(200).json(emprestimoAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = EmprestimoController;
