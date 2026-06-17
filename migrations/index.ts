import * as migration_20260617_154009 from './20260617_154009';
import * as migration_20260617_200000 from './20260617_200000';

export const migrations = [
  {
    up: migration_20260617_154009.up,
    down: migration_20260617_154009.down,
    name: '20260617_154009'
  },
  {
    up: migration_20260617_200000.up,
    down: migration_20260617_200000.down,
    name: '20260617_200000'
  },
];
