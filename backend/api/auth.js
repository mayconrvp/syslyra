// const	passport	=	require('passport');
// const {Strategy, ExtractJWT} = require('passport-jwt');

// const jwt = require('./config/jwt-config');
// const usuario = require('./controllers/UsuarioController');

// const params = {
//   secretOrkey: jwt.secret,
//   jwtFromRequest: ExtractJWT.fromHeader('Authorization')
// };

// passport.use(
//   new Strategy(params, async (payload, done) => {
//     try{
//       const {id} = payload;
//       const attributes = ['id', 'email'];
//       const options = { attributes };
//       const user = await usuario.buscarPorId(id, options)
//       done(null, user)
//     }catch(err){
//       done(err, null)
//     }
//   })
// )



// module.exports = (app) => {
//   const Users = app.models.users;
//   const { jwt } = config;

//   const params = {
//     secretOrkey
//   }
// }