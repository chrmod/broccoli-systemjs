import Plugin from 'broccoli-plugin';
import Builder from 'systemjs-builder';
import path from 'path';
import glob from 'glob';

export default class BroccoliSystemjs extends Plugin {

  constructor(inputNode, { annotation, systemConfig = {}, builderConfig = {} } = {}) {
    super([inputNode], {
      annotation,
    });

    this.systemConfig = systemConfig;
    this.builderConfig = builderConfig;
  }

  build() {
    const inputPath = this.inputPaths[0];
    const outputPath = this.outputPath;

    if (!this.builder) {
      this.builder = new Builder(inputPath);
    } else {
      this.builder.reset();
    }

    this.builder.config(this.systemConfig);

    const bundles = glob.sync('**/*.bundle.js', {
      cwd: inputPath,
      follow: true,
    }).map(inputFile => this.builder.buildStatic(
      inputFile,
      path.join(outputPath, inputFile),
      this.builderConfig,
    ));

    return Promise.all(bundles);
  }

}
