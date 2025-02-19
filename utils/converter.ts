export function camelCaseToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function snakeCaseToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function convertObjectToCamelCase<T extends object>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(item => 
      typeof item === 'object' ? convertObjectToCamelCase(item) : item
    ) as T;
  }

  const newObj: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = snakeCaseToCamelCase(key);
      const value = obj[key];

      newObj[camelKey] = typeof value === 'object' && value !== null
        ? convertObjectToCamelCase(value)
        : value;
    }
  }

  return newObj as T;
}

export function convertObjectToSnakeCase<T extends object>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(item => 
      typeof item === 'object' ? convertObjectToSnakeCase(item) : item
    ) as T;
  }

  const newObj: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = camelCaseToSnakeCase(key);
      const value = obj[key];

      newObj[snakeKey] = typeof value === 'object' && value !== null
        ? convertObjectToSnakeCase(value)
        : value;
    }
  }

  return newObj as T;
}