export default function ({route, store, redirect}) {
  if (store.$auth.loggedIn){
    return redirect('/' + store.$auth.user.role + 's/')
  }
  return redirect('/main')
}
