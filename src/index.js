import Plugin from 'broccoli-plugin';
import Builder from 'systemjs-builder';
import path from 'path';
import glob from 'glob';

export default class BroccoliSystemjs extends Plugin {

  constructor(inputNode, { annotation, systemConfig = {} } = {}) {
    super([inputNode], {
      annotation,
    });

    this.systemConfig = systemConfig;
    this.builders = new Map();
  }

  build() {
    const inputPath = this.inputPaths[0];
    const outputPath = this.outputPath;
    const bundles = glob.sync('**/*.bundle.js', {
      cwd: inputPath,
    }).map((inputFile) => {
      let builder = this.builders.get(inputFile);

      if (!builder) {
        builder = new Builder(inputPath);

        builder.config(this.systemConfig);

        this.builders.set(inputFile, builder);
      }

      builder.invalidate('*');

      return builder.buildStatic(
        path.join(inputPath, inputFile),
        path.join(outputPath, inputFile),
      );
    });

    return Promise.all(bundles);
  }

}
