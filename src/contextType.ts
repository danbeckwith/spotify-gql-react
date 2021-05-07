import dataSources from './dataSources';

export interface ContextType {
  dataSources: ReturnType<typeof dataSources>;
}
