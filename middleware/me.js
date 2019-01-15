export default function ({store, redirect}) {
  const role = store.$auth.user.role
  const id = store.$auth.user.id
  return redirect('/' + role + 's/' + id)
}
