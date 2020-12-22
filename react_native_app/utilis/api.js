let link = "https://07f32001.ngrok.io/"

const getBasketId = async (userId, latitude, longitude) => {
    // console.log("hello")
    const api_link = link + `get-basket-id/${userId}/${latitude}/${longitude}`
    console.log(api_link)
    try {
        let response = await fetch(api_link, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson
    } catch (error) {
        console.log("loi")
        return error
    }
}
// @app.route('/get-menu/<restaurant_id>', methods=['GET'])
const getMenu = async (restaurant_id) => {
    // console.log("hello")
    const api_link = link + `get-menu/${restaurant_id}`
    console.log(api_link)
    try {
        let response = await fetch(api_link, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson
    } catch (error) {
        console.log("loi")
        return error
    }
}

// @app.route('/get-basket-detail/<basketId>', methods = ['GET'])
// return jsonify({ "result": response, 'sl': sl, 'basketId': basketId }), 201
const getBasketDetail = async (basketId) => {
    // console.log("hello")
    const api_link = link + `get-basket-detail/${basketId}`
    console.log(api_link)
    try {
        let response = await fetch(api_link, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson
    } catch (error) {
        console.log("loi")
        return error
    }
}

// return jsonify({ 'basketId': basketId, 'sl': sl, 'res': res_basket }), 201
const addBasketDetail = async (resId, basketId) => {
    // console.log("hello")
    const api_link = link + `add-basket-detail`
    console.log(api_link)
    try {
        let response = await fetch(api_link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                resId: resId,
                basketId: basketId
            }),
        })
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson
    } catch (error) {
        console.log("loi")
        return error
    }
}


// @app.route('/recommend-route', methods = ['POST'])
// if ((content != None) & ('userLocation' in content) & ('desLocation' in content) & ('basketId' in content)):
//     return jsonify({ "points": points, "waypoint_order": waypoint_order, "result": response })
const recommendRoute = async (userLocation, desLocation, basketId) => {
    // console.log("hello")
    const api_link = link + `recommend-route`
    console.log(api_link)
    try {
        let response = await fetch(api_link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userLocation: userLocation,
                desLocation: desLocation,
                basketId: basketId
            }),
        })
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson
    } catch (error) {
        console.log("loi")
        return error
    }
}

// @app.route('/get-start', methods = ['POST'])
// if ((content != None) & ('userLocation' in content) & ('desLocation' in content) & ('basketId' in content) & ('res' in content))
//     return jsonify({ "points": points, "waypoint_order": waypoint_order })
const getStart = async (userLocation, desLocation, basketId, res) => {
    // console.log("hello")
    const api_link = link + `get-start`
    console.log(api_link)
    try {
        let response = await fetch(api_link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userLocation: userLocation,
                desLocation: desLocation,
                basketId: basketId,
                res: res
            }),
        })
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson
    } catch (error) {
        console.log("loi")
        return error
    }
}

// @app.route('/recommend-near-places', methods = ['POST'])
// if ((content != None) & ('userLocation' in content)):
//     return jsonify({ "top": top, "other": other })
const recommendNearPlaces = async (userLocation, foodType, mainType) => {
    // console.log("hello")
    const api_link = link + `recommend-near-places`
    console.log(api_link)
    try {
        let response = await fetch(api_link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userLocation: userLocation,
                foodType: foodType,
                mainType: mainType,
            }),
        })
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson
    } catch (error) {
        console.log("loi")
        return error
    }
}

// @app.route('/recommend-places-on-route', methods = ['POST'])
// if ((content != None) & ('userLocation' in content) & ('desLocation' in content) & ('foodType' in content)):
// return jsonify({ "top": top_final, "other": other_final })
const recommenPlacesOnRoute = async (userLocation, desLocation, foodType, mainType) => {
    // console.log("hello")
    const api_link = link + `recommend-places-on-route`
    console.log(api_link)
    try {
        let response = await fetch(api_link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userLocation: userLocation,
                desLocation: desLocation,
                foodType: foodType,
                mainType: mainType,
            }),
        })
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson
    } catch (error) {
        console.log("loi")
        return error
    }
}


// Export each function
export {
    getBasketId,
    getMenu,
    getBasketDetail,
    addBasketDetail,
    recommendRoute,
    getStart,
    recommendNearPlaces,
    recommenPlacesOnRoute
};





