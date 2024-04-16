import { addMinutes, format, setHours, setMinutes } from "date-fns";

//funcao com retorno String
export function generateDayTime(date:Date): String[]{
    const startTime = setMinutes(setHours(date,9),0) //set start time to 09h00
    const endTime = setMinutes(setHours(date,21),0) //set end time to 21h00
    const interval = 45; // interval in minutes
    const timelist: string[] = []

    let currentTime = startTime;

    while(currentTime <= endTime){
        timelist.push(format(currentTime,"HH:mm"))
        //utilizada para adicionar os minutos de intervalo entre os horarios
        currentTime = addMinutes(currentTime, interval)
    }
    return timelist;
}