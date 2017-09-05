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
    this.builders = new Map();
  }

  build() {
    const inputPath = this.inputPaths[0];
    const outputPath = this.outputPath;
    const bundles = glob.sync('**/*.bundle.js', {
      cwd: inputPath,
      follow: true,
    }).map((inputFile) => {
      let builder = this.builders.get(inputFile);

      if (!builder) {
        builder = new Builder(inputPath);
      }

      builder.reset();

      builder.config(this.systemConfig);

      this.builders.set(inputFile, builder);

      return builder.buildStatic(
        inputFile,
        path.join(outputPath, inputFile),
        this.builderConfig,
      );
    });

    return Promise.all(bundles);
  }

}
