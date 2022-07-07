const postData = async (url, data) => { // url который приходит, а data это данные которые будут поститься // 1) функция настривает наш запрос // async говорит что внутри функции будет какойто аснихронный код
    const result = await fetch(url, { // fetch это наш запрос // 2) посылет этот запрос на сервер // await ставим перед теми операциями, которые необходимо дождаться
        method: 'POST', //каким образом
        headers: { // если formData то headers не используем
            "Content-type": "application/json" 
        },
        body: data // 3) получает ответ от сервера(например, что запостили успешно данные)
    });

    return await result.json(); // 4) и трансформирует этот овтет в json
}

const getResurce = async (url) => { 
    const result = await fetch(url); // 1) делаем запрос к БД, await-дожидаемся его окончания
    if (!result.ok) { 
        throw new Error(`Could not fetch ${url}, status ${result.status}`); // выкидываем новую ошибку
    }
    return await result.json(); // 2) трансформирую данные в норм js объект, который можно использовать
}



export {postData};

export {getResurce};