
/**
 * Definition of types with symbols for dependency injection
 * @link https://www.npmjs.com/package/inversify
 */
const TYPES = {
  App: Symbol.for('App'),
  Controller: Symbol.for('IController'),
  ControllerRoot: Symbol.for('ControllerRoot'),
};


export { TYPES };
