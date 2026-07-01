export const getAdminCredentials = () => {
  return cy.env(['adminEmail', 'adminPassword']).then((env) => {
    return {
      email: env.adminEmail,
      password: env.adminPassword,
    }
  })
}
