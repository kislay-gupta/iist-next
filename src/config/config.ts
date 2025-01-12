/**
 * Configuration interface for the application
 * @interface Config
 */
interface Config {
  appwriteUrl: string;
  appwriteProjectId: string;
  appwriteDatabaseId: string;
  appwriteProjectCategoryCollectionId: string;
  appwriteProjectCollectionId: string;
  appwriteBucketId: string;
  baseUrl: string;
  apiKey: string;
}

/**
 * Helper function to get environment variables with validation
 * @param {string} key - The environment variable key
 * @returns {string} - The environment variable value
 */
const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  
  if (!value) {
    // Provide fallback values for development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Missing environment variable: ${key}, using empty string in development`);
      return '';
    }
    // In production, we want to fail fast if env vars are missing
    throw new Error(`Environment variable ${key} is not defined`);
  }
  
  return String(value).trim();
};

const conf: Config = {
  appwriteUrl: getEnvVariable('NEXT_PUBLIC_APPWRITE_URL'),
  appwriteProjectId: getEnvVariable('NEXT_PUBLIC_APPWRITE_PROJECT_ID'),
  appwriteDatabaseId: getEnvVariable('NEXT_PUBLIC_APPWRITE_DATABASE_ID'),
  appwriteProjectCategoryCollectionId: getEnvVariable('NEXT_PUBLIC_APPWRITE_PROJECT_CATEGORY_COLLECTION_ID'),
  appwriteProjectCollectionId: getEnvVariable('NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID'),
  appwriteBucketId: getEnvVariable('NEXT_PUBLIC_APPWRITE_BUCKET_ID'),
  baseUrl: getEnvVariable('NEXT_PUBLIC_BASE_URL'),
  apiKey: getEnvVariable('NEXT_PUBLIC_API_KEY'),
};

export default conf;
