import Plugin from 'broccoli-plugin';
import Builder from 'systemjs-builder';
import path from 'path';

export default class extends Plugin {

  constructor(inputNode, inputFile, { annotation, systemConfig = {} } = {}) {
    super([inputNode], {
      annotation,
    });

    this.systemConfig = systemConfig;
    this.inputFile = inputFile;
    this.builder = new Builder();
  }

  build() {
    this.builder.config(this.systemConfig);

    return this.builder.buildStatic(
      path.join(this.inputPaths[0], this.inputFile),
      path.join(this.outputPath, this.inputFile),
    );
  }
}
