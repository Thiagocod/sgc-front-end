import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

export function FormatDate (setDate: Date, setFormat: string){
    //setformat exemplo 'yyyy-MM-dd HH:mm'
    const now = setDate;
    const timeZone = 'America/Sao_Paulo';
    const zonedDate = toZonedTime(now, timeZone);
    const createAt = format(zonedDate, setFormat);
    return createAt
}

export function formatDateToMySQL(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}