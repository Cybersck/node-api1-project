var express = require('express');
var router = express.Router();

let getId = () => {
  return users[users.length -1].id+1;
}

let users = [
  {
    id: 1, 
    name: "Jane Doe", 
    bio: "The not so one and only",  
  },
  {  
  id: 2, 
  name: "John Smith",
  bio: "The infamous exemplar",
}

]

/* GET users - Return List of Users*/
router.get('/api/users', function(req, res) {
  res.send(users);
});

/*POST users - Create New User*/
router.post('/api/users', (req, res) => {
  if (req.body.name !== undefined && req.body.bio !== undefined) {
    const newUser = req.body;
    newUser.id = getId();
    users.push(newUser);
    console.log('test')
  }
  res.status(201).json(users);
});

router.get('/api/users/:id', (req, res) => {
  
  users.forEach(user => {
    if (`${user.id}` === req.params.id) {
      res.status(200).send(user)
      return;
    }
    else if (`${user.id}` === users.length.toString()) {
      res.status(404).send(`Could not find user with id of ${req.params.id}`);
      return;
    }
  });
  
});

router.delete('/api/users/:id', (req, res) => {

  users.forEach(user => {
    if (`${user.id}` === req.params.id) {
      users = users.filter(user => `${user.id}` !== req.params.id);
      res.status(202).send({Message: 'Removed user from list', NewList: users});
      return;
    }
    if (`${user.id}` === users.length.toString()) {
      res.status(404).send(`Could not find user with id of ${req.params.id}`);
      return;
    }
  });
});

router.patch('/api/users/:id', (req, res) => {
  if (req.params.id > users.length || req.params.id < 1) {res.status(404).send(`Could not find user with id of ${req.params.id}`); return}

   users = users.map(user => {
    if (req.body.name === undefined && req.body.bio === undefined) { 
      res.status(400).send('You must provide some new information to update the user'); 
      return user;
    }
    if (req.body.name === user.name && req.body.bio === user.bio) {
      res.status(201).send('Nothing went wrong, but you did not make any changes');
      return user;
    }
    
    if (`${user.id}` === req.params.id) {
      let updatedUser = user;
      if (req.body.name !== undefined) updatedUser = {...updatedUser, name: req.body.name};
      if (req.body.bio !== undefined) updatedUser = {...updatedUser, bio: req.body.bio};

      return updatedUser;
    } 

    return user;
  });
   res.status(202).send({Message: 'Updated User', NewList: users});
}) 


module.exports = router;
