import Bootstrapper from './Bootstrapper'

Bootstrapper.getProperties()
.then((properties) => Bootstrapper.validateProperties(properties))
.then((validProperties) => Bootstrapper.startup(validProperties))