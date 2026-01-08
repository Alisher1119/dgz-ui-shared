import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

/**
 * Re-export of dayjs with the customParseFormat plugin extended.
 * This ensures that dayjs is consistently configured across the application.
 */
export { dayjs, Dayjs };
