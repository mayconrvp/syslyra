const database = require('../models');

class AvaliacaoController {

  static async listarAvaliacoes(req, res){
    try{
      const avaliacoes = await database.Avaliacoes.findAll();
      return res.status(200).json(avaliacoes);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarAvaliacaoPorId(req, res){
    let id = req.params.id;
    try{
      const avaliacao = await database.Avaliacoes.findOne({ where: {id: Number(id)}})
      return res.status(200).json(avaliacao);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirAvaliacao(req, res){
    let id = req.params.id;
    try{
      const avaliacao = await database.Avaliacoes.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `Avaliação de Id ${id} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarAvaliacao(req, res){
    const novaAvaliacao = req.body;
    try{
      const avaliacao = await database.Avaliacoes.create(novaAvaliacao);
      return res.status(201).json(avaliacao);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarAvaliacao(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Avaliacoes.update(infos, 
        { where: {id: Number(id)}}
      );
      const avaliacaoAtualizada = await database.Avaliacoes.findOne({ where: {id: Number(id)}})
      return res.status(200).json(avaliacaoAtualizada);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarAvaliacoesPorTurma(req, res){
    const turmaId = req.params.turmaId;
    try{
      const avaliacoes = await database.Avaliacoes.findAll({ 
        where: 
        {
          idTurma: Number(turmaId),
        }
      })
      return res.status(200).json(avaliacoes);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = AvaliacaoController;
