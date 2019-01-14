export default function ({store, redirect}) {
  const role = store.$auth.user.role
  const name = store.$auth.user.name
  return redirect('/' + role + 's/' + name)
}
