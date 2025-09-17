export async function getTrackStatus(trackingNumber) {
    try {
        const myHeaders = new Headers();
        myHeaders.append(
            "Cookie",
            "connect.sid=s%3AINrF21eiWqXFAf9h3AgcnIusqbjEaiP5.wkyHtixinOH5TKmsVZ9voBOa5TcoyQw7dr1Yac7QAnk"
        );

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const url = `https://api.nomex.ibm.kg/track_status?token=${"Ghu87KJB87gkjgbB78"}&tracking_number=${trackingNumber}`;
        const response = await fetch(url, requestOptions);
        const result = await response.json();

        console.log(result);
        return result;
    } catch (error) {
        console.error("Ошибка при получении трек-статуса:", error);
        throw error;
    }
}

// пример вызова

