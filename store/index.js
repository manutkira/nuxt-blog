import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts){
                state.loadedPosts = posts
            }
        },
        actions: {
            nuxtServerInit(context, payload){
                return axios.get('https://nuxt-blog-1eeb7-default-rtdb.firebaseio.com/posts.json').then(res => {
                    const postsArray = []
                    for (const key in res.data){
                        postsArray.push({...res.data[key], id: key})
                    }
                    context.commit('setPosts', postsArray)
                }).catch(err => {
                    console.log(err);
                })
            },
            setPosts(context, posts){
                context.commit('setPosts', posts)
            }
        },
        getters: {
            loadedPosts(state){
                return state.loadedPosts
            }
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