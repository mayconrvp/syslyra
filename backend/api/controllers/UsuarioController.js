const database = require('../models');

class UsuarioController {

  static async listarUsuarios(req, res){
    try{
      const usuarios = await database.Usuarios.findAll({
        include: {
          model: database.Funcionarios, 
          attributes: ['nome','cargo']
        }
    });
      return res.status(200).json(usuarios);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarUsuarioPorId(req, res){
    let id = req.params.id;
    try{
      const usuario = await database.Usuarios.findOne({
        include: {
          model: database.Funcionarios, 
          attibutes: ['nome', 'cargo']
        }
      },
      { 
        where: {
          id: Number(id)
        }
      })
      return res.status(200).json(usuario);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirUsuario(req, res){
    let id = req.params.id;
    try{
      const usuario = await database.Usuarios.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `Usuario de Id ${id} deletado(a)`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarUsuario(req, res){
    const novoUsuario = req.body;
    try{
      const usuario = await database.Usuarios.create(novoUsuario);
      return res.status(201).json(usuario);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarUsuario(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Usuarios.update(infos, 
        { where: {id: Number(id)}}
      );
      const usuarioAtualizado = await database.Usuarios.findOne({ where: {id: Number(id)}})
      return res.status(200).json(usuarioAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = UsuarioController;
