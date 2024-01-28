
/**
 * Definition of types with symbols for dependency injection
 * @link https://www.npmjs.com/package/inversify
 */
const SERVICE_IDENTIFIER = {
  App: Symbol.for('App'),
  Controller: Symbol.for('IController'),
  Config: Symbol.for('Config'),
  Logger: Symbol.for('AppLogger'),
  Orm: Symbol.for('ORM'),
};

export { SERVICE_IDENTIFIER };

