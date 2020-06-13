import {
  booter,
  BaseArtifactBooter,
  BootBindings
} from '@loopback/boot';
import {
  Application,
  inject,
  CoreBindings,
  Constructor,
  MetadataInspector,
  BINDING_METADATA_KEY
} from '@loopback/core';

@booter('scripts')
export class ScriptBooter extends BaseArtifactBooter {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) public app: Application,
    @inject(BootBindings.PROJECT_ROOT) projectRoot: string,
  ) {
    super(
      projectRoot,
      {
        dirs: ['scripts'],
        extensions: ['script.js'],
        nested: true,
      }
    );
  }

  /**
   * Uses super method to get a list of Artifact classes.
   */
  async load() {
    await super.load();
    for (const cls of this.classes) {
      if (!isBindableClass(cls)) continue;
      this.app.service(cls);
    }
  }
}

function isBindableClass(cls: Constructor<unknown>) {
  if (MetadataInspector.getClassMetadata(BINDING_METADATA_KEY, cls)) {
    return true;
  }
  return false;
}
