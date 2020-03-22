
function getQuestionByQID(qid) {
    return new Promise((resolve, reject) => {
        if(qid.length === 40) {
            reject("Ungültige QID");
        }

        fetch(`https://api.unsgehtscorona.de/questions/${qid}`)
            .then((response) => {
                return response.json();
            })
            .then((question) => {
                if(!question.success) {
                    reject("Fehlgeschlagende Anfrage!");
                }

                resolve(question.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

function getQuestionList() {
    return new Promise((resolve, reject) => {
        fetch(`https://api.unsgehtscorona.de/questions`)
            .then((response) => {
                return response.json();
            })
            .then((question) => {
                if(!question.success) {
                    reject("Fehlgeschlagende Anfrage!");
                }

                resolve(question.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

async function getRandomQuestion() {
    return new Promise(async (resolve, reject) => {
        let questions = await getQuestionList();

        resolve(questions[Math.floor(Math.random() * questions.length)]);
    });
}

