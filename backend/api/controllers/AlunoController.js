const database = require('../models');

class AlunoController {

  static async listarAlunos(req, res){
    try{
      const alunos = await database.Alunos.findAll({
        include: [
          {
            model: database.Enderecos,
            attributes: ['logradouro', 'numero', 'bairro', 'cep', 'complemento'],
            include: [{
              model: database.Cidades,
              attributes: ['nome']
            }]
          },
          {
            model: database.Escolas,
            attributes: ['nome']
          },
          {
            model: database.Responsaveis,
            attributes: ['responsavel']
          }
        ]
      });
      return res.status(200).json(alunos);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarAlunoPorId(req, res){
    let id = req.params.id;
    try{
      const aluno = await database.Alunos.findOne(
        { 
          where: {
            id: Number(id)
          },
          include: [
            {
              model: database.Enderecos,
              attributes: ['logradouro', 'numero', 'bairro', 'cep', 'complemento'],
              include: [{
                model: database.Cidades,
                attributes: ['nome']
              }]
            },
            {
              model: database.Escolas,
              attributes: ['nome']
            },
            {
              model: database.Responsaveis,
              attributes: ['responsavel']
            }
          ]
        }
      );
      return res.status(200).json(aluno);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirAluno(req, res){
    let id = req.params.id;
    try{
      const aluno = await database.Alunos.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `aluno de Id ${id} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarAluno(req, res){
    const novoAluno = req.body;
    try{
      const aluno = await database.Alunos.create(novoAluno);
      return res.status(201).json(aluno);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarAluno(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Alunos.update(infos, 
        { where: {id: Number(id)}}
      );
      const alunoAtualizado = await database.Alunos.findOne(
        { 
          where: {
            id: Number(id)
          },
          include: [
            {
              model: database.Enderecos,
              attributes: ['logradouro', 'numero', 'bairro', 'cep', 'complemento'],
              include: [{
                model: database.Cidades,
                attributes: ['nome']
              }]
            },
            {
              model: database.Escolas,
              attributes: ['nome']
            },
            {
              model: database.Responsaveis,
              attributes: ['responsavel']
            }
          ]
        }
      );
      return res.status(200).json(alunoAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = AlunoController;
