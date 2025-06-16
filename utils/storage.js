export function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

export function addUser(user) {
  const users = getUsers();
  localStorage.setItem("users", JSON.stringify([...users, user]));
}

export function setUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}

export function logout() {
  localStorage.removeItem("currentUser");
}


export function updateUser(updatedUser) {
  const users = getUsers().map((u) =>
    u.email === updatedUser.email ? updatedUser : u
  );
  localStorage.setItem("users", JSON.stringify(users));

  const currentUser = getUser();
  if (currentUser?.email === updatedUser.email) {
    setUser(updatedUser); 
  }
}



export function getTransactions() {
  return JSON.parse(localStorage.getItem("transactions") || "[]");
}

export function addTransaction(tx) {
  const txs = getTransactions();
  localStorage.setItem("transactions", JSON.stringify([...txs, tx]));
}
export function setTransactions(txs) {
  localStorage.setItem("transactions", JSON.stringify(txs));
}
export function clearTransactions() {
  localStorage.setItem("transactions", JSON.stringify([]));
}
