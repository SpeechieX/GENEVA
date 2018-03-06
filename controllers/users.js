var User = require('../models/user');
var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;

function signup(req, res) {
  var user = new User(req.body);
  user.save()
    .then(user => {
      res.json({token: createJWT(user)});
    })
    // User data invalid (prob duplicate email)
    .catch(err => res.status(400).json(err));
}

function login(req, res) {
  User.findOne({email: req.body.email}).exec().then(user => {
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        var token = createJWT(user);
        res.json({token: createJWT(user)});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  }).catch(err => res.status(401).json(err));
}

// function video(req, res) {
//     var video = new Video(req.body);
// }

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}

function getAll(req, res) { 
  User.find({})
  .then(function(user) {
    console.log(user)
    res.json(user).status(200);
  })
}

module.exports = {
  signup,
  login, 
  getAll
};
