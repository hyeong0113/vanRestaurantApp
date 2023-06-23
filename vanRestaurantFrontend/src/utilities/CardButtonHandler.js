
export const createFavoriteRestaurant = async(restaurant) => {
    if(localStorage.getItem("authenticated").length > 0) {
        let tokenValue = null;
        let token = null;
        tokenValue = localStorage.getItem("authenticated");
        token = 'Bearer ' + tokenValue;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                favoriteRestaurant: restaurant
            })
        };

        try {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/favoriterestaurant/create`, requestOptions);
            let convertedResponse  = await response.json();
            if(!convertedResponse.success) {
                throw new Error(convertedResponse.message);
            }
            console.log(convertedResponse.response);
        }
        catch(error) {
            console.log("Not loaded:: ", error.message);
        }
    }
}

export const deleteFavoriteRestaurant = async(placeId) => {
    if(localStorage.getItem("authenticated").length > 0) {
        let tokenValue = null;
        let token = null;
        tokenValue = localStorage.getItem("authenticated");
        token = 'Bearer ' + tokenValue;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                placeId: placeId
            })
        };
        await fetch(`${process.env.REACT_APP_API_URL}/favoriterestaurant/delete`, requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log("Not loaded: ", error);
            }
        )
    }
}