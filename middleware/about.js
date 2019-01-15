export default function ({route, store, redirect}) {
  if ( store.$auth.user.id !== route.params.id ){
    return redirect(route.path + '/about')
  }

  return
}
