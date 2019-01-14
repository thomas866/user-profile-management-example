export default function ({route, store, redirect}) {
  if ( store.$auth.user.name !== route.params.user ){
    return redirect(route.path + '/about')
  }

  return
}
