import Plugin from 'broccoli-plugin';
import Builder from 'systemjs-builder';
import path from 'path';

export default class extends Plugin {

  constructor(inputNodes, options = {}) {
    super(inputNodes, {
      annotation: options.annotation,
    });
    this.options = options;
  }

  build() {
    // TODO
  }
}
