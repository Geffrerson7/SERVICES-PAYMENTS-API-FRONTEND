const userRole = async (username) => {
    
    const response = await fetch("http://127.0.0.1:8000/user/api/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });
        const users = await response.json();
        const user = users.find(user => user.username === username);

  return user
}

export default userRole