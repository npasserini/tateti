module.exports = {
  extends: [
    'react-app', // Usa la configuración de ESLint de CRA
    'plugin:prettier/recommended', // Activa eslint-plugin-prettier y muestra errores de Prettier como errores de ESLint
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'import/no-anonymous-default-export': 'off',
  },
}
