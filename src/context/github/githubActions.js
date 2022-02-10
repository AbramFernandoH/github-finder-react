import axios from 'axios'

const GITHUB_API = process.env.REACT_APP_GITHUB_API
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
    baseURL: GITHUB_API,
    headers: { Authorization: `token ${GITHUB_TOKEN}` }
})

export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text
    })

    // with fetch
    // const response = await fetch(`${GITHUB_API}/search/users?${params}`, {
    //     headers: {
    //         Authorization: `token ${GITHUB_TOKEN}`,
    //     }
    // })
    
    // const { items } = await response.json()

    // return items

    // with axios
    const response = await github.get(`${GITHUB_API}/search/users?${params}`)
    return response.data.items
}

export const getUserAndRepos = async (login) => {
    // make 2 get requests
    const [user, repos] = await Promise.all([
        github.get(`${GITHUB_API}/users/${login}`),
        github.get(`${GITHUB_API}/users/${login}/repos?sort=created&per_page=10`)
    ])

    return { user: user.data, repos: repos.data }
}

// export const getUser = async (login) => {
//     const response = await fetch(`${GITHUB_API}/users/${login}`, {
//         headers: {
//             Authorization: `token ${GITHUB_TOKEN}`,
//         }
//     })

//     const data = await response.json()

//     return data
// }

// export const getUserRepos = async (login) => {
//     const response = await fetch(`${GITHUB_API}/users/${login}/repos?sort=created&per_page=10`, {
//         headers: {
//             Authorization: `token ${GITHUB_TOKEN}`,
//         }
//     })
//     const data = await response.json()

//     return data
// }