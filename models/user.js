const shortid = require('shortid');
const lodash = require('lodash')

const users = [
  { id: shortid.generate(), name: 'John Doe', email: 'john@hyf.com' },
  { id: shortid.generate(), name: 'Jane Doe', email: 'jane@hyf.com' }
]

const createUser = data => {
  let res = lodash.find(users, ['email', data.email])
  if (typeof (res) !== 'undefined') {
    return 403
  }
  else {
    data['id'] = shortid.generate()
    users.push(data);
    return users;
  }
}

const updateUser = (id, data) => {
  const index = users.findIndex(user => user.id === id);
  let res = lodash.find(users, ["email", data.email]);
  if (typeof (res) !== 'undefined') {
    return 403;
  } else {
    users[index].name = data.name;
    users[index].email = data.email;
    return users;
  }
}

const deleteUser = (id) => {
  let res = lodash.findIndex(users, ["id", id]);
  if (res !== -1) {
    users.splice(res, 1);
    return users;
  } else {
    return 404;
  }
}


const userById = (id) => {
  let res = lodash.findIndex(users, ["id", id.id]);
  if (res !== -1) {
    return users[res];
  } else {
    return 404;
  }
}

module.exports = {
  users,
  createUser,
  updateUser,
  deleteUser,
  userById
}