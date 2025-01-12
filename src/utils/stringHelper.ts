/**
 * @class StringHelper
 */
export class StringHelper {
    /**
     * @function convertKeysToCamelCase
     * @param obj
     */
    public static convertKeysToCamelCase(obj: any) {
        const newObj: { [key: string]: any } = {};
        Object.keys(obj).forEach((key) => {
            const camelCaseKey = key
                .toLowerCase()
                .replace(/(\s+|[^\w]+)/g, ' ') // Replace spaces and special characters
                .split(' ')                    // Split into words
                .map((word, index) =>
                    index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join(''); // Join words back together

            newObj[camelCaseKey] = obj[key];
        });
        return newObj;
    };
}

export default StringHelper;
