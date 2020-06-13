import {
  Model,
  ModelDefinition,
  ModelMetadataHelper
} from '@loopback/repository'

export class SanitizerService {
  constructor(
  ) { }

  public sanitize(value: any): any {
    const isArray = Array.isArray(value);
    return isArray
      ? (value as any[]).map(item => this.sanitize(item))
      : this.sanitizePlainOrClass(value);
  }

  private sanitizePlainOrClass(plainOrClass: any): any {
    if (this.isModelClass(plainOrClass)) {
      const ctor = (plainOrClass as Object).constructor
      const modelDef = ModelMetadataHelper.getModelMetadata(ctor) as ModelDefinition;
      this.removeSuperfluousKeys(plainOrClass, modelDef);
    }
    return plainOrClass;
  }

  private removeSuperfluousKeys(plainOrClass: any, definition: ModelDefinition) {
    if (definition.properties === undefined) return;
    const keys = Object.keys(definition.properties);

    for (const [key, value] of Object.entries(plainOrClass)) {
      if (!keys.includes(key) || value === null) {
        delete plainOrClass[key];
      }
      else {
        this.sanitize(value);
      }
    }
  }

  private isModelClass(plainOrClass: any) {
    if (typeof plainOrClass !== 'object')
      return false;

    if (!(plainOrClass as Object).constructor.toString().startsWith('class '))
      return false;

    if (typeof ((plainOrClass as Object).constructor as typeof Model).definition !== 'object')
      return false;

    return true;
  }
}
