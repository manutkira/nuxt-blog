export default function(context){
    console.log(context);
    context.store.dispatch('initAuth', context.req)
}