import { MOBILITY } from './schema';

export const mobilityOptions = MOBILITY.map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));
