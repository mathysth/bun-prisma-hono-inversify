
/**
 * Definition of types with symbols for dependency injection
 * @link https://www.npmjs.com/package/inversify
 */
const SERVICE_IDENTIFIER = {
  App: Symbol.for('App'),
  Controller: Symbol.for('IController'),
  ControllerRoot: Symbol.for('ControllerRoot'),
  Config: Symbol.for('Config'),
  Logger: Symbol.for('AppLogger'),
};

// TODO: voir si c'est possible d'alléger le ficher car actuellement 1 ligne par classe est un peu lourd
// TODO: voir si c'est possible de faire un factory qui va générer tout les types au chargement de l'application
export { SERVICE_IDENTIFIER };

