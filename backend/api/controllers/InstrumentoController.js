const database = require('../models');

class InstrumentoController {

  static async listarInstrumentos(req, res){
    try{
      const instrumentos = await database.Instrumentos.findAll();
      return res.status(200).json(instrumentos);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarInstrumentoPorId(req, res){
    let id = req.params.id;
    try{
      const instrumento = await database.Instrumentos.findOne(
      { 
        where: {
          id: Number(id)
        }
      });
      return res.status(200).json(instrumento);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirInstrumento(req, res){
    let id = req.params.id;
    try{
      const instrumento = await database.Instrumentos.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `instrumento de Id ${id} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarInstrumento(req, res){
    const novoInstrumento = req.body;
    try{
      const instrumento = await database.Instrumentos.create(novoInstrumento);
      return res.status(201).json(instrumento);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarInstrumento(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Instrumentos.update(infos, 
        { where: {id: Number(id)}}
      );
      const instrumentoAtualizado = await database.Instrumentos.findOne({ where: {id: Number(id)}}, {
        include: {
          model: database.Estados, 
          attributes: ['nome','uf']
        }
      })
      return res.status(200).json(instrumentoAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = InstrumentoController;
