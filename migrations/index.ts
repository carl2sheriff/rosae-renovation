import * as migration_20260617_154009 from './20260617_154009';
import * as migration_20260617_200000 from './20260617_200000';
import * as migration_20260617_210000 from './20260617_210000';
import * as migration_20260617_230000 from './20260617_230000';
import * as migration_20260618_000001 from './20260618_000001';
import * as migration_20260618_000002 from './20260618_000002';

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
  {
    up: migration_20260617_210000.up,
    down: migration_20260617_210000.down,
    name: '20260617_210000'
  },
  {
    up: migration_20260617_230000.up,
    down: migration_20260617_230000.down,
    name: '20260617_230000'
  },
  {
    up: migration_20260618_000001.up,
    down: migration_20260618_000001.down,
    name: '20260618_000001'
  },
  {
    up: migration_20260618_000002.up,
    down: migration_20260618_000002.down,
    name: '20260618_000002'
  },
];
