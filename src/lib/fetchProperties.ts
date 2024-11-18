import { Property } from '../types/property';
import properties from '@data/properties.json';

export async function getProperties(): Promise<Property[]> {
  return properties;
}