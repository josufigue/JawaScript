export interface rankingTask {
    Id?: string;
    Izena: string;
    Puntuazioa: number;
    erabiltzaileId: string;
    jokatuta: string;
    azkenengoPartida: Array<string>;
    azkenengoDenbora: number;
    azkenengoPuntuazioa: number;
}
export interface gald {
    id?: string;
    Erantzun1: string;
    Erantzun2: string;
    ErantzunZuzena: string;
    Galdera: string;
    Irudia: string;
}
export interface taldea{
    izena?: string;
    sortzailea: string;
}
export interface partaideak{
    Id?: string
    izena: string
}