const users = [{
    id: 1,
    name: 'Logan',
    schoolID: 101
}, {
    id: 2,
    name: 'Matt',
    schoolID: 999
}];
const grades = [{
    id: 1,
    schoolID: 101,
    grade: 86
}, {
    id: 2,
    schoolID: 999,
    grade: 100
}, {
    id: 3,
    schoolID: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);

        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}.`);
        }
    });
};

const getGrades = (schoolID) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolID === schoolID));

        // if (grade) {
        //     resolve(grade);
        // } else {
        //     reject(`Unable to find grades with school id ${schoolID}`);
        // }
    });
};

const getStatus = (userID) => {
    let user;
    return getUser(userID).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolID);
    }).then((grades) => {
        let average = 0;
        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }
        return `${user.name} has a ${average}% grade point avergae`;
    })
}

const getStatusAlt = async (userID) => {
    const user = await getUser(userID);
    const grades = await getGrades(user.schoolID);
    let average = 0;
    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}% grade point avergae`;
};

getStatusAlt(2).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e);
});

// getStatus(1).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });

// getGrades(101).then((grade) => {
//     console.log(grade);
// }).catch((e) => {
//     console.log(e);
// })

// getUser(2).then((user) => {
//     console.log(user);
// }).catch((e) => {
//     console.log(e);
// })