const express = require('express')
const authRouter = express.Router()
const AuthService = require('./auth-service');
const bcrypt = require('bcryptjs');
const jsonBodyParser = express.json()

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const knexInstance = req.app.get('db');

    const { user_name, password } = req.body;
    const loginUser = { user_name, password };
    
    for(const [key, value] of Object.entries(loginUser))
      if(value == null)
        return res.status(400).json({
          error: `Missing ${key} in request body`
    })
  
    AuthService.getUserWithUserName(
        knexInstance,
        loginUser.user_name
    )
        .then(dbUser => {
          if(!dbUser) 
            return res.status(400).json({
              error: 'Incorrect username'
            })
            return AuthService.comparePasswords(loginUser.password, dbUser.password)
            .then(compareMatch => {
              if(!compareMatch)
                return res.status(400).json({
                  error: 'Incorrect password'
                })
                const sub = dbUser.user_name
                const payload = { user_id: dbUser.id }
                res.send({
                  authToken: AuthService.createJwt(sub, payload),
                })
            })
        })
        .catch(next) 
  })

module.exports = authRouter