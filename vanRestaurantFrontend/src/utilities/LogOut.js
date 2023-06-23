export const logoutHandler = async(token) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
      };
  
      fetch(`${process.env.REACT_APP_API_URL}/identity/logout`, requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
              const { loggedIn } = result;
              console.log("loggedIn:: ", loggedIn);
              return loggedIn
            },
            (error) => {
                console.log("Logout not worked");
            }
        )
}
