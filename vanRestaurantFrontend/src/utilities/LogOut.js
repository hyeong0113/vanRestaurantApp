export const logoutHandler = async(token) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
  
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/identity/logout`, requestOptions);
      let convertedResponse  = await response.json();
      if(!convertedResponse.success) {
          throw new Error(convertedResponse.message);
      }
      const { loggedIn } = convertedResponse;
      console.log("Log out successful!");
      return loggedIn;
    }
    catch(error) {
      console.log("Logout not worked::", error);
    }
}
