import Vuex from 'vuex'
import Cookies from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null,
        },
        mutations: {
            setPosts(state, posts){
                state.loadedPosts = posts
            },
            addPost(state, payload){
                state.loadedPosts.push(payload)
            },
            editPost(state, editPost){
                const postIndex = state.loadedPosts.findIndex(post => post.id === editPost.id)
                state.loadedPosts[postIndex] = editPost
            },
            setToken(state, token){
                state.token = token
            },
            clearToken(state){
                state.token = null
            }
        },
        actions: {
            nuxtServerInit(context, payload){
                return payload.app.$axios.$get('/posts.json').then(data => {
                    const postsArray = []
                    for (const key in data){
                        postsArray.push({...data[key], id: key})
                    }
                    context.commit('setPosts', postsArray)
                }).catch(err => {
                    console.log(err);
                })
            },
            addPost(context, post){
                const createdPost = {...post, updateDate: new Date()}
                return this.$axios.$post(process.env.baseUrl + '/posts.json?auth=' + context.state.token, createdPost).then(data => {
                    context.commit('addPost', {...createdPost, id: data.name})
                }).catch(err => {
                console.log(err);
                })
            },
            editPost(context, editedPost){
                return this.$axios.$put(process.env.baseUrl + '/posts/' + editedPost.id + '.json?auth=' + context.state.token, editedPost).then(res => 
                context.commit('editPost', editedPost)
                ).catch(e => console.log(e))
            },
            setPosts(context, posts){
                context.commit('setPosts', posts)
            },
            authenticateUser(context, payload){
                let authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbAPIKey
                if(!payload.isLogin){
                    authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbAPIKey
                }
                return this.$axios.$post(authURL, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                }).then (result => {

                    context.commit('setToken', result.idToken)
                    localStorage.setItem('token', result.idToken)
                    localStorage.setItem('tokenExpiration', new Date().getTime() + +result.expiresIn * 1000)
                    Cookies.set('_session', result.idToken)
                    Cookies.set('expirationDate', new Date().getTime() + +result.expiresIn * 1000)
                    return this.$axios.$post('http://localhost:3000/api/track-data', {data: 'authenticated'})
                }).catch(err => {
                    console.log(err);
                })
            },
            initAuth(vuexContext, req){
                let token
                let expirationDate
                if(req){
                    if(!req.headers.cookie){
                        return
                    }
                    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('_session='))
                    if(!jwtCookie){
                        return
                    }
                    token = jwtCookie.split('=')[1]
                    expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split('=')[1]
                }else{
                }
                token = localStorage.getItem('token')
                expirationDate = localStorage.getItem('tokenExpiration')
 
                if(new Date().getTime() > +expirationDate || !token){
                    vuexContext.commit('clearToken')
                    return
                }
                vuexContext.commit('setToken', token)
            },
            logout(context){
                context.commit('clearToken')
                Cookies.remove('_session')
                Cookies.remove('expirationDate')
                if(process.client){
                    localStorage.removeItem('token')
                    localStorage.removeItem('tokenExpiration')
                }
            }
        },
        getters: {
            loadedPosts(state){
                return state.loadedPosts
            },
            isAuthenticated(state){
                return state.token != null
            },
        }
    })
}

export default createStore

// if(!process.client){
//     console.log(payload.req);
// }
// return new Promise((resolve, reject) => {
//     setTimeout(() => {
//         context.commit('setPosts', [
//             {
//                 id: '1',
//                 title: 'First post',
//                 thumbnail: 'https://lh3.googleusercontent.com/proxy/Zzs_g4c7cH_v8yTdOrgR0zSzaC2l5zxMhEcdTSFrYsMshY3F-9tDHBryC9wMxLn9fkYvS1WjaErafOumRzR7HmgNnMmvvz4gmxyOMfqEPnOvXICdPGqwJS9ZpIgcoug',
//                 previewText: 'This is fi rst test!'
//                 },
//                 {
//                 id: '2',
//                 title: 'Second post',
//                 thumbnail: 'https://www.pixel4k.com/wp-content/uploads/2018/10/illustration-digital-art-science-fiction-cyberpunk-4k_1540755040.jpg',
//                 previewText: 'This is second test!'
//                 },
//                 {
//                 id: '3',
//                 title: 'Third post',
//                 thumbnail: 'https://lh5.googleusercontent.com/proxy/HpGopIjaYmkoLW2ueVHkM8CaR7iE32LChvW_XXfr71zaQUqgmcNRGiKKnRos2PStlo8oznkQTiv-o7vKpu2JmWr2WaHx71XWhPH70Q4rVX2IvocjBgtEB_zb2oNs-jR7lBzlYH17mJUNMw=w1200-h630-p-k-no-nu',
//                 previewText: 'This is third test!'
//                 },
//         ])
//         resolve()
//         }, 500)
// })